import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

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
      background:transparent;
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

  render() {
    return html`
      <header>
    <img src="https://www.ing.com.tr/F/Documents/Images/kurumsal_logo_genel_mudurluk/ING_Logo_BeyazBG_Big.png" alt="Bank Logo" /> 
        <div>
          <span>Employees</span>
          <button @click=${this._addEmployee}>+ Add New</button>
          <img src="data:image/jpeg;base64,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" alt="Turkish" @click=${() => this._changeLanguage('tr')} />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnauZ17qjxCfOpu3xNB-P_qm-brhpSO4gi-A&s" alt="English" @click=${() => this._changeLanguage('en')} />
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