import { LitElement, html, css } from 'lit';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { loadSVG } from '../utils/svg-loader.js';
import { t } from '../utils/localization.js';

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
    }

    th {
      background-color: #f2f2f2;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    
    tr:hover {
      background-color: #f1f1f1;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
    }
    
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      height: 32px;
      width: 32px;
    }

    .table-buttons {
      display: flex;
      gap: 4px;
      justify-content: center;
    }

    @media screen and (max-width: 768px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }

      thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }

      tr {
        margin-bottom: 20px;
        border: 1px solid #ddd;
      }

      td {
        border: none;
        position: relative;
        padding-left: 50%;
      }

      td:before {
        position: absolute;
        left: 6px;
        content: attr(data-label);
        font-weight: bold;
      }

      .pagination {
        flex-direction: column;
        gap: 4px;
      }

      button {
        height: 24px;
        width: 24px;
      }
    }

    @media screen and (max-width: 480px) {
      .pagination {
        flex-direction: column;
        gap: 2px;
      }

      button {
        height: 20px;
        width: 20px;
      }
    }
  `;

  static get properties() {
    return {
      employees: { type: Array },
      currentPage: { type: Number },
      totalPages: { type: Number },
      removeSVG: { type: String },
      editSVG: { type: String }
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.removeSVG = '';
    this.editSVG = '';
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
    this.dispatchEvent(new CustomEvent('delete-employee', {
      detail: { id: employee.id },
      bubbles: true,
      composed: true
    }));
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