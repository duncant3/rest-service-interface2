import React from 'react';
import CustomerForm from "./CustomerForm";
import _ from 'lodash';

import history from '../../history';
import { getCustomer,
        editCustomer } from "../../apis/customersAPI";
import { getCustomerAddresses,
        editCustomerAddress,} from "../../apis/customerAddressesAPI";

class CustomerEdit extends React.Component {
  state = { customer: {},
            customerAddress: {},
            initialValues: {} };

  componentDidMount() {
    // this.props.match.params.id is the string of the id
    // this.state.customer.id is the int of the id
    const customerId = this.props.match.params.id;
    this.initializeCustomer(customerId).then(() =>
      this.initializeCustomerAddress(this.state.customer.id).then(this.getInitialValues));
  }

  initializeCustomer = async (customerId) => {
    const response = await getCustomer(customerId);
    this.setState({ customer: response.data});
  };

  initializeCustomerAddress = async (customerId) => {
    const addresses = await getCustomerAddresses();
    const address = await _.find(addresses.data, {'customer_id': customerId});
    this.setState({customerAddress: address});
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

  onSubmit = async (formValues, customerId) => {
    editCustomer(formValues, customerId);
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