import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/header-bar.js';

describe('HeaderBar Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<header-bar></header-bar>`);
  });

  it('renders the logo', () => {
    const img = element.shadowRoot.querySelector('img');
    expect(img).to.exist;
    expect(img.getAttribute('alt')).to.equal('Bank Logo');
  });

  it('renders the employees span', () => {
    const span = element.shadowRoot.querySelector('span');
    expect(span).to.exist;
    expect(span.textContent.trim()).to.equal('Employees');
  });

  it('renders the "Add New" button', () => {
    const buttons = element.shadowRoot.querySelectorAll('button');
    const addButton = buttons[0];
    expect(addButton).to.exist;
    expect(addButton.textContent.trim()).to.equal('Add New');
  });

  it('toggles language when language button is clicked', async () => {
    const buttons = element.shadowRoot.querySelectorAll('button');
    const languageButton = buttons[1];
    expect(languageButton).to.exist;
    const initialLanguage = element.currentLanguage;
    languageButton.click();
    await element.updateComplete;
    expect(element.currentLanguage).to.not.equal(initialLanguage);
  });
});