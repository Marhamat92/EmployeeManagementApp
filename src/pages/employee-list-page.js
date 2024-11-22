import { LitElement, html, css } from 'lit';
import '../components/header-bar.js';
import '../components/employee-table.js';
import { EmployeeContext, store, setCurrentEmployee, deleteEmployee } from '../store.js';
import { ContextConsumer } from '@lit-labs/context';
import { connect } from 'pwa-helpers';
import { Router } from '@vaadin/router';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { loadSVG } from '../utils/svg-loader.js';
import { t, loadLanguage, getCurrentLanguage } from '../utils/localization.js';

class EmployeeListPage extends connect(store)(LitElement) {
  static styles = css`
    .content-head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2{
       font-size: 18px;
       color:#FD8939;
    }
    .content {
      padding: 16px;
    }
    .view-buttons {
      display: flex;
      gap: 8px;
    }
   .listView{
   height: 36px;
   width: 36px;
   }

   .tableView{
    height: 36px;
    width: 36px;
    }

   button{
   background-color:transparent;
   border:none;
   cursor:pointer;  
  }
    
  `;

  static properties = {
    employees: { type: Array },
    listViewSVG: { type: String },
    tableViewSVG: { type: String },
    currentLanguage: { type: String },
    _languageLoaded: { type: Boolean },
  };

  constructor() {
    super();
    this.employees = [];
    this.store = store;
    this.listViewSVG = '';
    this.tableViewSVG = '';
    // Set up the context consumer
    this.contextConsumer = new ContextConsumer(this, {
      context: EmployeeContext,
      callback: (value) => {
        this.store = value;
      }
    });
    this.currentLanguage = getCurrentLanguage();
    this._languageLoaded = false;
    this._onLanguageChanged = this._onLanguageChanged.bind(this);

  }

  async connectedCallback() {
    super.connectedCallback();
    this.listViewSVG = await loadSVG('../src/icons/listView.svg');
    this.tableViewSVG = await loadSVG('../src/icons/tableView.svg');;
  }

  async connectedCallback() {
    super.connectedCallback();
    document.addEventListener('language-changed', this._onLanguageChanged);


    // Wait for the language to load if not already loaded
    if (!this._languageLoaded) {
      await loadLanguage(getCurrentLanguage());
    }
    this._languageLoaded = true;
  }

  disconnectedCallback() {
    document.removeEventListener('language-changed', this._onLanguageChanged);
    super.disconnectedCallback();
  }


  _onLanguageChanged(event) {
    this.currentLanguage = event.detail.lang;
    this.requestUpdate();
  }


  stateChanged(state) {
    this.employees = state.employee.employees;
  }

  render() {
    if (!this._languageLoaded) {
      // Optionally, show a loading indicator
      return html`<p>Loading...</p>`;
    }
    return html`
      <header-bar></header-bar>
      <div class="content">
      <div class="content-head">
        <h2>
          ${t('employeelist')}
        </h2>
        <div class="view-buttons">
          <button class="tableView" @click=${this._setTableView}>
            ${unsafeSVG(this.tableViewSVG)}
          </button>
          <button class="listView" @click=${this._setListView}>
            ${unsafeSVG(this.listViewSVG)}
          </button>
        </div>
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