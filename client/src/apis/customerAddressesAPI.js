import axios from 'axios';

const customerAddresses = axios.create({
  baseURL: 'http://localhost:3001'
});

export const getCustomerAddresses = () => {
  return customerAddresses.get('/customer_addresses');
};

// not necessary to get address via addressId
export const getCustomerAddress = (addressId) => {
  return customerAddresses.get(`/customer_addresses/${addressId}`);
};

export const createCustomerAddress = (formValues, customerId) => {
  return customerAddresses.post(`/customer_addresses`, {
    customer_id: customerId,
    street_address: formValues.street_address,
    postal_code: formValues.postal_code,
    country: formValues.country
  })
};

export const editCustomerAddress = (formValues, addressId, customerId) => {
  return customerAddresses.put(`customer_addresses/${addressId}`, {
    customer_id: customerId,
    street_address: formValues.street_address,
    postal_code: formValues.postal_code,
    country: formValues.country
  })
};

export const deleteCustomerAddress = (addressId) => {
  return customerAddresses.delete(`customer_addresses/${addressId}`);
};

export { customerAddresses }