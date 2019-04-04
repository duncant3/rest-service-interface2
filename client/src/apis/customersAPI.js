import axios from 'axios';

const customers = axios.create({
  baseURL: 'http://localhost:3001'
});

export const getCustomers = () => {
  return customers.get('/customers');
};

export const getCustomer = (customerId) => {
  return customers.get(`/customers/${customerId}`);
};

export const createCustomer = (formValues) => {
  return customers.post('/customers', {name: formValues.name});
};

export const editCustomer = (formValues, customerId) => {
  return customers.patch(`/customers/${customerId}`, {name: formValues.name});
};

export const deleteCustomer = (customerId) => {
  return customers.delete(`/customers/${customerId}`);
};

export { customers }