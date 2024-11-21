import { LitElement, html, css } from 'lit';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { loadSVG } from '../utils/svg-loader.js';

class EmployeeTable extends LitElement {
  static styles = css`
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
    this._updatePagination();
  }

  _updatePagination() {
    this.totalPages = Math.ceil(this.employees.length / 10);
  }

  render() {
    const start = (this.currentPage - 1) * 10;
    const end = this.currentPage * 10;
    const paginatedEmployees = this.employees.slice(start, end);

    return html`
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${paginatedEmployees.map(employee => html`
            <tr>
              <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td>${employee.dateOfEmployment}</td>
              <td>${employee.dateOfBirth}</td>
              <td>${employee.phoneNumber}</td>
              <td>${employee.emailAddress}</td>
              <td>${employee.department}</td>
              <td>${employee.position}</td>
              <td class="table-buttons">
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
    this.requestUpdate();
  }

  _prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.requestUpdate();
    }
  }

  _nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.requestUpdate();
    }
  }
}

customElements.define('employee-table', EmployeeTable);