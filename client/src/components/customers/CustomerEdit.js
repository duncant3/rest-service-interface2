import React from 'react';
import CustomerForm from "./CustomerForm";
import _ from 'lodash';

import history from '../../history';
import customers from '../../apis/customers';
import { getCustomerAddresses,
        editCustomerAddress } from "../../apis/customerAddressesAPI";

class CustomerEdit extends React.Component {
  state = { customer: {},
            customerAddress: {},
            initialValues: {} };
  componentDidMount() {
    this.getCustomer();
  }

  getCustomer = async () => {
    const response = await customers.get(`/customers/${this.props.match.params.id}`);
    this.setState({ customer: response.data});
    this.getCustomerAddress(this.state.customer.id);
  };

  getInitialValues = () => {
    this.setState({initialValues: _.pick(this.state.customer, 'id', 'name')});
    const initialValues = _.pick(this.state.customerAddress, 'street_address', 'postal_code', 'country');
    this.setState(prevState => ({
      initialValues: {
        ...prevState.initialValues,
        street_address: initialValues.street_address,
        postal_code: initialValues.postal_code,
        country: initialValues.country
      }
    }));
  };

  getCustomerAddress = async (customerId) => {
    const addresses = await getCustomerAddresses();
    const address = await _.find(addresses.data, {'customer_id': customerId});
    this.setState({customerAddress: address});
    this.getInitialValues();
  };

  onSubmit = async (formValues, customerId) => {
    await customers.patch(`/customers/${customerId}`, {name: formValues.name});
    const addressId = this.state.customerAddress.id;
    await editCustomerAddress(formValues, addressId, this.state.customerAddress.customer_id);
    history.push('/');

  };

  render(){
    return (
      <div>
        <CustomerForm
          initialValues={this.state.initialValues}
          onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

export default CustomerEdit;