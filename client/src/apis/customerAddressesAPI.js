import axios from 'axios';

const customersAddresses = axios.create({
  baseURL: 'http://localhost:3001'
});

export const getCustomerAddresses = () => {
  return customersAddresses.get('/customer_addresses');
};

export const createCustomerAddress = (formValues, customerId) => {
  return customersAddresses.post(`/customer_addresses/`, {
    customer_id: customerId,
    street_address: formValues.street_address,
    postal_code: formValues.postal_code,
    country: formValues.country
  })
};

export const editCustomerAddress = (formValues, addressId, customerId) => {
  return customersAddresses.put(`customer_addresses/${addressId}`, {
    customer_id: customerId,
    street_address: formValues.street_address,
    postal_code: formValues.postal_code,
    country: formValues.country
  })
};

export const deleteCustomerAddress = (addressId, customerId) => {
  return customersAddresses.delete(`customer_addresses/${addressId}`);
};