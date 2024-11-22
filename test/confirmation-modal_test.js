import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/confirmation-modal.js';

describe('ConfirmationModal Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<confirmation-modal open message="Are you sure?"></confirmation-modal>`);
  });

  it('renders with the correct message', () => {
    const message = element.shadowRoot.querySelector('p');
    expect(message.textContent.trim()).to.equal('Are you sure?');
  });

  it('dispatches "confirm" event when confirm button is clicked', () => {
    const confirmButton = element.shadowRoot.querySelector('.confirm-button');
    let eventFired = false;
    element.addEventListener('confirm', () => {
      eventFired = true;
    });
    confirmButton.click();
    expect(eventFired).to.be.true;
    expect(element.open).to.be.false;
  });

  it('dispatches "cancel" event when cancel button is clicked', () => {
    const cancelButton = element.shadowRoot.querySelector('.cancel-button');
    let eventFired = false;
    element.addEventListener('cancel', () => {
      eventFired = true;
    });
    cancelButton.click();
    expect(eventFired).to.be.true;
    expect(element.open).to.be.false;
  });
});