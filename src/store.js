import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createContext } from '@lit-labs/context';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// Define the initial state
const initialState = {
  employees: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '3',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '4',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '5',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '6',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '7',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '8',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '9',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '10',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '11',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    },
    {
      id: '12',
      firstName: 'John',
      lastName: 'Doe',
      dateOfEmployment: '2021-01-01',
      dateOfBirth: '1990-01-01',
      phoneNumber: '123-456-7890',
      emailAddress: 'aaaa@test.com',
      department: 'Analytics',
      position: 'Junior'
    }
  ],
  currentEmployee: null
};

// Create a slice of the store
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = { ...action.payload, id: uuidv4() }; // Generate unique ID
      state.employees.push(newEmployee);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    }
  }
});

// Export actions
export const { addEmployee, updateEmployee, deleteEmployee, setCurrentEmployee } = employeeSlice.actions;

// Create the Redux store
export const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer
  }
});

// Create a context for the store
export const EmployeeContext = createContext('employee-context', store); 