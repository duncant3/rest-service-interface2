import React from 'react';

import { createCustomerAddress } from "../../apis/customerAddressesAPI";
import { createCustomer } from "../../apis/customersAPI";
import history from '../../history';
import CustomerForm from './CustomerForm';


class CustomerCreate extends React.Component {
  onSubmit = async (formValues) => {
    const response = await createCustomer(formValues);
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