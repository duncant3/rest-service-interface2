import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import customers from '../../apis/customers';
import { getCustomerAddresses } from '../../apis/customerAddressesAPI';

class CustomerList extends React.Component{
  state = {
    customers: [],
    customerAddresses: []
  };
  componentDidMount(){
    this.getCustomers();
    this.getCustomerAddresses();
  };

  getCustomers = async () => {
    const response = await customers.get('/customers');
    this.setState({customers: response.data});
  };

  renderAddress = (customerId) => {
    const address = _.find(this.state.customerAddresses, {'customer_id': customerId});
    if (address !== undefined){
      return address;
    }
    else return {};
  };

  getCustomerAddresses = async () => {
    const response = await getCustomerAddresses();
    this.setState({customerAddresses: response.data});
  };

  renderCreate = () => {
    return (
      <div >
        <Link to="/customers/new" className="ui button primary right floated">
          Create Customer
        </Link>
      </div>
    )
  };

  renderEditAndDelete = (customerId) => {
    return (
      <div>
        <Link to={`/customers/edit/${customerId}`} className="ui button primary">
          Edit
        </Link>
        <Link to={`/customers/delete/${customerId}`} className="ui button negative">
          Delete
        </Link>
      </div>
    )
  };

  renderCustomers = () => {
    return this.state.customers.map(customer => {
      return (
        <tr key={customer.id}>
          <td data-label="ID">{customer.id}</td>
          <td data-label="Name">{customer.name}</td>
          <td data-label="Street Address">{this.renderAddress(customer.id).street_address}</td>
          <td data-label="Postal Code">{this.renderAddress(customer.id).postal_code}</td>
          <td data-label="Country">{this.renderAddress(customer.id).country}</td>
          <td className="right aligned">{this.renderEditAndDelete(customer.id)}</td>
        </tr>
      )
    })
  };

  render(){
    return (
      <div>
        <h2>Customers</h2>
        <table className="ui single line table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Street Address</th>
              <th>Postal Code</th>
              <th>Country</th>
              <th className="right aligned"></th>
            </tr>
          </thead>
          <tbody>
          {this.renderCustomers()}
          </tbody>
        </table>
        {this.renderCreate()}
      </div>
    )

  }
}

export default CustomerList;