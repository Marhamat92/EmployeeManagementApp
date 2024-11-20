import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createContext } from '@lit-labs/context';

// Define the initial state
const initialState = {
  employees: [],
  currentEmployee: null
};

// Create a slice of the store
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
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