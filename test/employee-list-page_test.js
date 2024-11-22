import { html, fixture, expect } from '@open-wc/testing';
import '../src/pages/employee-list-page.js';

describe('EmployeeListPage Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list-page></employee-list-page>`);
  });

  it('renders the header bar', () => {
    const headerBar = element.shadowRoot.querySelector('header-bar');
    expect(headerBar).to.exist;
  });

  it('renders the employee table', () => {
    const employeeTable = element.shadowRoot.querySelector('employee-table');
    expect(employeeTable).to.exist;
  });

  it('passes employees data to employee-table', async () => {
    element.employees = [
      { id: '1', firstName: 'John', lastName: 'Doe' },
      { id: '2', firstName: 'Jane', lastName: 'Smith' },
    ];
    await element.updateComplete;
    const employeeTable = element.shadowRoot.querySelector('employee-table');
    expect(employeeTable.employees.length).to.equal(2);
  });
});