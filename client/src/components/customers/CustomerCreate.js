import React from 'react';

import customers from '../../apis/customers';
import { createCustomerAddress } from "../../apis/customerAddressesAPI";
import history from '../../history';
import CustomerForm from './CustomerForm';


class CustomerCreate extends React.Component {
  onSubmit = async (formValues) => {
    const response = await customers.post('/customers', {name: formValues.name});
    await createCustomerAddress(formValues, response.data.id);
    history.push('/');

  };

  render() {
    return (
      <div>
        <h3>Create a Customer</h3>
        <CustomerForm
          initialValues={{}}
          onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default CustomerCreate