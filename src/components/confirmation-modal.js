import { LitElement, html, css } from 'lit';
import { t } from '../utils/localization.js';

class ConfirmationModal extends LitElement {
  static styles = css`
    .modal {
      display: flex;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background-color: #fefefe;
      border: 1px solid #888;
      border-radius: 8px;
      padding: 20px;
      width: 90%;
      max-width: 400px;
      text-align: center;
    }
    .modal-buttons {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    button {
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
    }
    .confirm-button {
      background-color: #007bff;
      color: white;
    }
    .confirm-button:hover {
      background-color: #0056b3;
    }
    .cancel-button {
      background-color: #6c757d;
      color: white;
    }
    .cancel-button:hover {
      background-color: #5a6268;
    }
  `;

  static properties = {
    open: { type: Boolean },
    message: { type: String },
  };

  constructor() {
    super();
    this.open = false;
    this.message = '';
  }

  render() {
    if (!this.open) {
      return html``;
    }
    return html`
      <div class="modal">
        <div class="modal-content">
          <p>${this.message}</p>
          <div class="modal-buttons">
            <button class="confirm-button" @click=${this._confirm}>${t('ok')}</button>
            <button class="cancel-button" @click=${this._cancel}>${t('cancel')}</button>
          </div>
        </div>
      </div>
    `;
  }

  _confirm() {
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    this.open = false;
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
    this.open = false;
  }
}

customElements.define('confirmation-modal', ConfirmationModal);