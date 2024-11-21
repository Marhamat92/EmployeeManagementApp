import { LitElement, html, css } from 'lit';
import { store, addEmployee, updateEmployee, EmployeeContext } from '../store.js';
import { ContextConsumer } from '@lit-labs/context';
import { connect } from 'pwa-helpers';
import { Router } from '@vaadin/router';

class EmployeeForm extends connect(store)(LitElement) {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    label {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #333;
    }
    input, select {
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 4px;
    }
    button {
      padding: 10px 20px;
      font-size: 14px;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #0056b3;
    }
    button[type="button"] {
      background-color: #6c757d;
    }
    button[type="button"]:hover {
      background-color: #5a6268;
    }
  `;

  static get properties() {
    return {
      employee: { type: Object },
      isEdit: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      emailAddress: '',
      department: 'Analytics',
      position: 'Junior'
    };
    this.isEdit = false;

    // Set up the context consumer
    this.contextConsumer = new ContextConsumer(this, {
      context: EmployeeContext,
      callback: (value) => {
        this.store = value;
        if (this.isEdit) {
          this.employee = this.store.state.employee.currentEmployee || this.employee;
        }
      }
    });
  }

  stateChanged(state) {
    if (this.isEdit) {
      this.employee = state.employee.currentEmployee || this.employee;
    }
  }

  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        <label>
          First Name:
          <input type="text" .value=${this.employee.firstName} @input=${e => this._updateField(e, 'firstName')} required>
        </label>
        <label>
          Last Name:
          <input type="text" .value=${this.employee.lastName} @input=${e => this._updateField(e, 'lastName')} required>
        </label>
        <label>
          Date of Employment:
          <input type="date" .value=${this.employee.dateOfEmployment} @input=${e => this._updateField(e, 'dateOfEmployment')} required>
        </label>
        <label>
          Date of Birth:
          <input type="date" .value=${this.employee.dateOfBirth} @input=${e => this._updateField(e, 'dateOfBirth')} required>
        </label>
        <label>
          Phone Number:
          <input type="tel" .value=${this.employee.phoneNumber} @input=${e => this._updateField(e, 'phoneNumber')} required>
        </label>
        <label>
          Email Address:
          <input type="email" .value=${this.employee.emailAddress} @input=${e => this._updateField(e, 'emailAddress')} required>
        </label>
        <label>
          Department:
          <select .value=${this.employee.department} @change=${e => this._updateField(e, 'department')}>
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>
        </label>
        <label>
          Position:
          <select .value=${this.employee.position} @change=${e => this._updateField(e, 'position')}>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
        <button type="submit">${this.isEdit ? 'Save Changes' : 'Add Employee'}</button>
        <button type="button" @click=${this._cancel}>Cancel</button>
      </form>
    `;
  }

  _updateField(e, field) {
    this.employee = { ...this.employee, [field]: e.target.value };
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (this.isEdit) {
      store.dispatch(updateEmployee(this.employee));
    } else {
      store.dispatch(addEmployee(this.employee));
    }
    Router.go('/');
  }

  _cancel() {
    Router.go('/');
  }
}

customElements.define('employee-form', EmployeeForm);