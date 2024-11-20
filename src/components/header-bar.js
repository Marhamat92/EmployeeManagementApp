import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

class HeaderBar extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: #f8f8f8;
      border-bottom: 1px solid #ddd;
    }
    header img {
      height: 40px;
    }
    header div {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    header button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    header button:hover {
      background-color: #0056b3;
    }
  `;

  render() {
    return html`
      <header>
        <img src="path/to/bank-logo.png" alt="Bank Logo" />
        <div>
          <span>Employees</span>
          <button @click=${this._addEmployee}>Add New</button>
          <img src="path/to/turkish-flag.png" alt="Turkish" @click=${() => this._changeLanguage('tr')} />
          <img src="path/to/english-flag.png" alt="English" @click=${() => this._changeLanguage('en')} />
        </div>
      </header>
    `;
  }

  _addEmployee() {
    Router.go('/add-employee');
  }

  _changeLanguage(lang) {
    // Logic to change language
  }
}

customElements.define('header-bar', HeaderBar);