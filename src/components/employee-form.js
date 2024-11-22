import { LitElement, html, css } from 'lit';
import { store, addEmployee, updateEmployee, EmployeeContext } from '../store.js';
import { ContextConsumer } from '@lit-labs/context';
import { connect } from 'pwa-helpers';
import { Router } from '@vaadin/router';
import { t } from '../utils/localization.js';
import './confirmation-modal.js';

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
      isEdit: { type: Boolean },
      showEditModal: { type: Boolean },
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
    this.showEditModal = false;
  }


  stateChanged(state) {
    if (this.isEdit) {
      this.employee = state.employee.currentEmployee || this.employee;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    console.log('window.location.pathname', window.location.pathname);

    if (window.location.pathname.includes('edit-employee')) {
      this.isEdit = true;
      store.dispatch({ type: 'SET_CURRENT_EMPLOYEE', employee: this.employee });
    }
  }

  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        <label>
          ${t('first_name')}:
          <input type="text" .value=${this.employee.firstName} @input=${e => this._updateField(e, 'firstName')} required>
        </label>
        <label>
          ${t('last_name')}:
          <input type="text" .value=${this.employee.lastName} @input=${e => this._updateField(e, 'lastName')} required>
        </label>
        <label>
          ${t('date_of_employment')}:
          <input type="date" .value=${this.employee.dateOfEmployment} @input=${e => this._updateField(e, 'dateOfEmployment')} required>
        </label>
        <label>
          ${t('date_of_birth')}:
          <input type="date" .value=${this.employee.dateOfBirth} @input=${e => this._updateField(e, 'dateOfBirth')} required>
        </label>
        <label>
          ${t('phone_number')}:
          <input type="tel" .value=${this.employee.phoneNumber} @input=${e => this._updateField(e, 'phoneNumber')} required>
        </label>
        <label>
          ${t('email_address')}:
          <input type="email" .value=${this.employee.emailAddress} @input=${e => this._updateField(e, 'emailAddress')} required>
        </label>
        <label>
          ${t('department')}:
          <select .value=${this.employee.department} @change=${e => this._updateField(e, 'department')}>
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>
        </label>
        <label>
          ${t('position')}:
          <select .value=${this.employee.position} @change=${e => this._updateField(e, 'position')}>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
        <button type="submit">${this.isEdit ? t('save_changes') : t('add_employee')}</button>
        <button type="button" @click=${this._cancel}>${t('cancel')}</button>
      </form>
       <confirmation-modal
      .open=${this.showEditModal}
      .message=${t('are_you_sure_edit')}
      @confirm=${this._handleEditConfirm}
      @cancel=${this._handleEditCancel}
    ></confirmation-modal>
    `;
  }

  _updateField(e, field) {
    this.employee = { ...this.employee, [field]: e.target.value };
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.showEditModal = true;
  }

  _handleEditConfirm() {
    if (this.isEdit) {
      store.dispatch(updateEmployee(this.employee));
    } else {
      store.dispatch(addEmployee(this.employee));
    }
    this.showEditModal = false;
    Router.go('/');
  }

  _handleEditCancel() {
    this.showEditModal = false;
  }



  _cancel() {
    Router.go('/');
  }
}

customElements.define('employee-form', EmployeeForm);