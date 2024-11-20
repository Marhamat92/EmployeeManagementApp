import { LitElement, html, css } from 'lit';
import '../components/header-bar.js';
import '../components/employee-table.js';
import { EmployeeContext, store, setCurrentEmployee, deleteEmployee } from '../store.js';
import { ContextConsumer } from '@lit-labs/context';
import { connect } from 'pwa-helpers';
import { Router } from '@vaadin/router';

class EmployeeListPage extends connect(store)(LitElement) {
  static styles = css`
    /* Add your styles here */
  `;

  static properties = {
    employees: { type: Array }
  };

  constructor() {
    super();
    this.employees = [];
    this.store = store;

    // Set up the context consumer
    this.contextConsumer = new ContextConsumer(this, {
      context: EmployeeContext,
      callback: (value) => {
        this.store = value;
      }
    });
  }

  stateChanged(state) {
    this.employees = state.employee.employees;
  }

  render() {
    return html`
      <header-bar></header-bar>
      <div class="content">
        <h2>Employee List</h2>
        <div class="view-buttons">
          <button @click=${this._setTableView}>Table View</button>
          <button @click=${this._setListView}>List View</button>
        </div>
        <employee-table .employees=${this.employees} @edit-employee=${this._editEmployee} @delete-employee=${this._deleteEmployee}></employee-table>
      </div>
    `;
  }

  _setTableView() {
    // Logic to set table view
  }

  _setListView() {
    // Logic to set list view
  }

  _editEmployee(e) {
    const employeeId = e.detail.id;
    const employee = this.employees.find(emp => emp.id === employeeId);
    store.dispatch(setCurrentEmployee(employee));
    Router.go(`/edit-employee/${employeeId}`);
  }

  _deleteEmployee(e) {
    const employeeId = e.detail.id;
    store.dispatch(deleteEmployee(employeeId));
  }
}

customElements.define('employee-list-page', EmployeeListPage);