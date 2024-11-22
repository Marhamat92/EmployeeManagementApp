import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/employee-table.js';

describe('EmployeeTable Component', () => {
  let element;
  const mockEmployees = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      department: 'Tech',
      position: 'Senior',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      department: 'Analytics',
      position: 'Junior',
    },
  ];

  beforeEach(async () => {
    element = await fixture(html`<employee-table .employees=${mockEmployees}></employee-table>`);
  });

  it('renders the table with employees', () => {
    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(mockEmployees.length);
  });

  it('displays employee details correctly', () => {
    const firstRowCells = element.shadowRoot.querySelectorAll('tbody tr:first-child td');
    expect(firstRowCells[0].textContent.trim()).to.equal('John');
    expect(firstRowCells[1].textContent.trim()).to.equal('Doe');
  });

  it('dispatches "edit-employee" event when edit button is clicked', async () => {
    const editButton = element.shadowRoot.querySelector('.table-buttons button');
    let eventFired = false;
    element.addEventListener('edit-employee', () => {
      eventFired = true;
    });
    editButton.click();
    expect(eventFired).to.be.true;
  });

  it('shows delete confirmation modal when delete button is clicked', () => {
    const deleteButton = element.shadowRoot.querySelector('.table-buttons button:nth-child(2)');
    deleteButton.click();
    expect(element.showDeleteModal).to.be.true;
  });
});