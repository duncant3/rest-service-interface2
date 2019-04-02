import React from 'react';
import Modal from "../Modal";
import { Link } from 'react-router-dom'
import customers from "../../apis/customers";
import {deleteCustomerAddress, getCustomerAddresses} from '../../apis/customerAddressesAPI';
import history from '../../history';
import _ from "lodash";

class CustomerDelete extends React.Component{
  state = { customer: {},
            customerAddress: {} };
  componentDidMount() {
    this.getCustomer();
  }

  getCustomerAddress = async (customerId) => {
    const addresses = await getCustomerAddresses();
    const address = await _.find(addresses.data, {'customer_id': customerId});
    this.setState({customerAddress: address});
    console.log(this.state);
  };

  deleteCustomer = async (customerId) => {
    await customers.delete(`/customers/${customerId}`);
    console.log(this.state);
    await deleteCustomerAddress(this.state.customerAddress.id, customerId);
    history.push('/');
  };

  getCustomer = async () => {
    const response = await customers.get(`/customers/${this.props.match.params.id}`);
    this.setState({ customer: response.data});
    this.getCustomerAddress(this.state.customer.id);
  };

  renderActions(){
    return (
      <React.Fragment>
        <button
          onClick={() => this.deleteCustomer(this.state.customer.id)}
          className="ui button negative">Delete</button>
        <Link to='/' className="ui button">Cancel</Link>
      </React.Fragment>
    )
  }

  renderContent(){
    if (!this.state.customer){
      return 'Are you sure you want to delete this customer?'
    }

    return `Are you sure you want to delete customer: ${this.state.customer.name}`
  }

  render() {
    return (
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
    )
  }
}

export default CustomerDelete;