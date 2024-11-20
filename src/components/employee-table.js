import { LitElement, html, css } from 'lit';

class EmployeeTable extends LitElement {
  static styles = css`
    /* Add your styles here */
  `;

  static get properties() {
    return {
      employees: { type: Array },
      currentPage: { type: Number },
      totalPages: { type: Number }
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.totalPages = 1;
  }

  render() {
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
          ${this.employees.map(employee => html`
            <tr>
              <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td>${employee.dateOfEmployment}</td>
              <td>${employee.dateOfBirth}</td>
              <td>${employee.phoneNumber}</td>
              <td>${employee.emailAddress}</td>
              <td>${employee.department}</td>
              <td>${employee.position}</td>
              <td>
                <button @click=${() => this._editEmployee(employee)}>Edit</button>
                <button @click=${() => this._deleteEmployee(employee)}>Delete</button>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
      <div class="pagination">
        ${Array.from({ length: this.totalPages }, (_, i) => html`
          <button @click=${() => this._changePage(i + 1)}>${i + 1}</button>
        `)}
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
    // Logic to fetch new page data
  }
}

customElements.define('employee-table', EmployeeTable);