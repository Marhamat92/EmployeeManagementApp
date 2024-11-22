import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { loadLanguage, t, getCurrentLanguage } from '../utils/localization.js';

class HeaderBar extends LitElement {
  static styles = css`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background-color: white;
    border-bottom: 1px solid #ddd;
  }
  header img {
    height: 24px;
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
    font-size: 16px;
    color: #FD8939;
    font-weight: bold;
  }
  /* Responsive styles */
  @media (max-width: 600px) {
    header {
    display:flex;
       align-items: center;
      justify-content: space-between;
    }
    header div {
      display: flex;
    align-items: center;
      width: 100%;
    }
 
    header span {
      display: none;
    }
  }
`;

  static get properties() {
    return {
      currentLanguage: { type: String },
      _languageLoaded: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.currentLanguage = getCurrentLanguage();
    this._languageLoaded = false;
  }


  async connectedCallback() {
    super.connectedCallback();
    // Wait for the language to load if not already loaded
    if (!this._languageLoaded) {
      await loadLanguage(this.currentLanguage);
    }
    this._languageLoaded = true;
    this.requestUpdate();
  }

  render() {
    return html`
      <header>
      <div>
        <img src="https://www.ing.com.tr/F/Documents/Images/kurumsal_logo_genel_mudurluk/ING_Logo_BeyazBG_Big.png" alt="Bank Logo" /> 
        </div>
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