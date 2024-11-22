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
    background-color: rgba(0,0,0,0.4);
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    width: 90%;
    max-width: 400px;
    text-align: center;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
  }
  button {
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
  }
  .confirm-button {
    background-color: #FD8939;
    color: white;
  }
  .cancel-button {
    background-color: #6c757d;
    color: white;
  }
  /* Responsive styles */
  @media (max-width: 600px) {
    .modal-content {
      padding: 16px;
    }
    .modal-buttons {
      flex-direction: column;
      gap: 12px;
    }
    button {
      width: 100%;
    }
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