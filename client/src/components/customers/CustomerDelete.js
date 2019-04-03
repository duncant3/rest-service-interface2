import React from 'react';
import Modal from "../Modal";
import { Link } from 'react-router-dom'
import { deleteCustomer, getCustomer } from "../../apis/customersAPI";
import { deleteCustomerAddress, getCustomerAddresses } from '../../apis/customerAddressesAPI';
import history from '../../history';
import _ from "lodash";

class CustomerDelete extends React.Component{
  state = { customer: {},
            customerAddress: {} };
  componentDidMount() {
    this.initializeCustomer().then(() => this.initializeCustomerAddress(this.state.customer.id));
  }

  initializeCustomer = async () => {
    const response = await getCustomer(this.props.match.params.id);
    await this.setState({ customer: response.data});
  };

  initializeCustomerAddress = async (customerId) => {
    const addresses = await getCustomerAddresses();
    const address = await _.find(addresses.data, {'customer_id': customerId});
    await this.setState({customerAddress: address});
  };

  deleteCustomerAndAddress = async (customerId) => {
    await deleteCustomerAddress(this.state.customerAddress.id);
    await deleteCustomer(customerId);
    history.push('/');
  };

  renderActions(){
    return (
      <React.Fragment>
        <button
          onClick={() => this.deleteCustomerAndAddress(this.state.customer.id)}
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