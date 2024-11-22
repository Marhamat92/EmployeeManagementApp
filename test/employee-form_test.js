import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/components/employee-form.js';

describe('EmployeeForm Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-form></employee-form>`);
  });

  it('renders the form', () => {
    const form = element.shadowRoot.querySelector('form');
    expect(form).to.exist;
  });

  it('updates employee data on input change', async () => {
    const firstNameInput = element.shadowRoot.querySelector('input[type="text"]');
    firstNameInput.value = 'Alice';
    firstNameInput.dispatchEvent(new Event('input'));
    await element.updateComplete;
    expect(element.employee.firstName).to.equal('Alice');
  });

  it('shows confirmation modal on form submit', () => {
    const form = element.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    expect(element.showEditModal).to.be.true;
  });

  it('dispatches addEmployee action when confirmed', () => {
    const storeDispatchStub = sinon.stub(element.store, 'dispatch');
    element.isEdit = false;
    element.showEditModal = true;
    element._handleEditConfirm();
    expect(storeDispatchStub.calledOnce).to.be.true;
    storeDispatchStub.restore();
  });
});