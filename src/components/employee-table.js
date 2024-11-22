import { LitElement, html, css } from 'lit';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { loadSVG } from '../utils/svg-loader.js';
import { t } from '../utils/localization.js';
import './confirmation-modal.js';

class EmployeeTable extends LitElement {
  static styles = css`
  .table-container {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #fafafa;
  }
  .table-buttons {
    display: flex;
    gap: 4px;
    justify-content: center;
  }

  .table-buttons button {
    padding: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    height: 32px;
    width: 32px;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    thead tr {
      display: none;
    }
    tr {
      margin-bottom: 20px;
      border: 1px solid #ddd;
    }
    td {
      border: none;
      padding: 8px;
      position: relative;
    }
    td[data-label]:before {
      content: attr(data-label);
      position: absolute;
      left: 0;
      width: 50%;
      padding-left: 16px;
      font-weight: bold;
    }
    td {
      padding-left: 50%;
    }
    .table-buttons {
      justify-content: flex-start;
    }
    
    .table-buttons button {
      padding: 4px;
      background: transparent;
      border: none;
      cursor: pointer;
      height: 22px;
      width: 22px;
    }
  }
`;

  static get properties() {
    return {
      employees: { type: Array },
      currentPage: { type: Number },
      totalPages: { type: Number },
      removeSVG: { type: String },
      editSVG: { type: String },
      showDeleteModal: { type: Boolean },
      employeeToDelete: { type: Object },
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.removeSVG = '';
    this.editSVG = '';
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.editSVG = await loadSVG('../src/icons/editpen.svg');
    this.removeSVG = await loadSVG('../src/icons/remove.svg');
    this._initializePage();
    this._updatePagination();
    document.addEventListener('language-changed', this._handleLanguageChange.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('language-changed', this._handleLanguageChange.bind(this));
    super.disconnectedCallback();
  }

  _initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page'), 10);
    if (page && page > 0) {
      this.currentPage = page;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('employees')) {
      this._updatePagination();
    }
  }

  _updatePagination() {
    this.totalPages = Math.ceil(this.employees.length / 10);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this._updateURL();
  }

  _updateURL() {
    const url = new URL(window.location);
    url.searchParams.set('page', this.currentPage);
    window.history.pushState({}, '', url);
  }

  _handleLanguageChange() {
    this.requestUpdate();
  }

  render() {
    const start = (this.currentPage - 1) * 10;
    const end = this.currentPage * 10;
    const paginatedEmployees = this.employees.slice(start, end);

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>${t('first_name')}</th>
              <th>${t('last_name')}</th>
              <th>${t('date_of_employment')}</th>
              <th>${t('date_of_birth')}</th>
              <th>${t('phone_number')}</th>
              <th>${t('email_address')}</th>
              <th>${t('department')}</th>
              <th>${t('position')}</th>
              <th>${t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedEmployees.map(employee => html`
              <tr>
                <td data-label="${t('first_name')}">${employee.firstName}</td>
                <td data-label="${t('last_name')}">${employee.lastName}</td>
                <td data-label="${t('date_of_employment')}">${employee.dateOfEmployment}</td>
                <td data-label="${t('date_of_birth')}">${employee.dateOfBirth}</td>
                <td data-label="${t('phone_number')}">${employee.phoneNumber}</td>
                <td data-label="${t('email_address')}">${employee.emailAddress}</td>
                <td data-label="${t('department')}">${employee.department}</td>
                <td data-label="${t('position')}">${employee.position}</td>
                <td data-label="${t('actions')}" class="table-buttons">
                  <button class="edit" @click=${() => this._editEmployee(employee)}>
                    ${unsafeSVG(this.editSVG)}
                  </button>
                  <button class="remove" @click=${() => this._deleteEmployee(employee)}>
                    ${unsafeSVG(this.removeSVG)}
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
        <div class="pagination">
          <button @click=${this._prevPage} ?disabled=${this.currentPage === 1}>&lt;</button>
          ${Array.from({ length: this.totalPages }, (_, i) => html`
            <button @click=${() => this._changePage(i + 1)} ?disabled=${this.currentPage === i + 1}>${i + 1}</button>
          `)}
          <button @click=${this._nextPage} ?disabled=${this.currentPage === this.totalPages}>&gt;</button>
        </div>
      </div>
    <div>
       <confirmation-modal
      .open=${this.showDeleteModal}
      .message=${t('are_you_sure_delete')}
      @confirm=${this._handleDeleteConfirm}
      @cancel=${this._handleDeleteCancel}
    ></confirmation-modal>
    </div>
    `;
  }

  _editEmployee(employee) {
    this.dispatchEvent(new CustomEvent('edit-employee', {
      detail: { id: employee.id },
      bubbles: true,
      composed: true
    }));
  }

  _deleteEmployee(employee) {
    this.employeeToDelete = employee;
    this.showDeleteModal = true;
  }

  _handleDeleteConfirm() {
    this.dispatchEvent(new CustomEvent('delete-employee', {
      detail: { id: this.employeeToDelete.id },
      bubbles: true,
      composed: true,
    }));
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  _handleDeleteCancel() {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  _changePage(pageNumber) {
    this.currentPage = pageNumber;
    this._updateURL();
    this.requestUpdate();
  }

  _prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this._updateURL();
      this.requestUpdate();
    }
  }

  _nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this._updateURL();
      this.requestUpdate();
    }
  }
}

customElements.define('employee-table', EmployeeTable);