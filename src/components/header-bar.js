import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { loadLanguage, t, getCurrentLanguage } from '../utils/localization.js';

class HeaderBar extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      background-color: white;
      border: 1px solid #ddd;
    }
    header img {
      height: 20px;
    }
    header div {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    header button {
      padding: 8px 16px;
      background: transparent;
      color: #FD8939;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    header span {
      font-size: 14px;
      color: #FD8939;
      font-weight: bold;
    }
  `;

  static get properties() {
    return {
      currentLanguage: { type: String }
    };
  }

  constructor() {
    super();
    this.currentLanguage = getCurrentLanguage();
  }

  render() {
    return html`
      <header>
        <img src="https://www.ing.com.tr/F/Documents/Images/kurumsal_logo_genel_mudurluk/ING_Logo_BeyazBG_Big.png" alt="Bank Logo" /> 
        <div>
          <span>${t('employees')}</span>
          <button @click=${this._addEmployee}>${t('add_new')}</button>
          <button @click=${this._toggleLanguage}>
            ${this.currentLanguage === 'en' ? 'English' : 'Türkçe'}
          </button>
        </div>
      </header>
    `;
  }

  _addEmployee() {
    Router.go('/add-employee');
  }

  async _toggleLanguage() {
    const newLanguage = this.currentLanguage === 'en' ? 'tr' : 'en';
    await loadLanguage(newLanguage);
    this.currentLanguage = newLanguage;
    this.requestUpdate();
  }
}

customElements.define('header-bar', HeaderBar);