const customerAddressesAPI = require('../customerAddressesAPI');
const MockAdapter = require('axios-mock-adapter');

describe('get customer addresses test', () => {
  it('returns array of customer addresses', done => {
    const mock = new MockAdapter(customerAddressesAPI.customerAddresses);
    const data = [
      {
        "id": 1,
        "customer_id": 2,
        "street_address": "123 Big Walk Way",
        "postal_code": "70523",
        "country": "US"
      },
      {
        "id": 2,
        "customer_id": 3,
        "street_address": "509 Charter Road",
        "postal_code": "90021",
        "country": "US"
      },
      {
        "id": 3,
        "customer_id": 1,
        "street_address": "999 Night Stalker Road",
        "postal_code": "12345",
        "country": "US"
      }
    ];

    mock.onGet('http://localhost:3001/customer_addresses').reply(200, data);
    customerAddressesAPI.getCustomerAddresses().then(function (response) {
      expect(response.data).toEqual(data);
      done()
    });
  })

});

describe('get single customer address', () => {
  it('should return a single customer address object', done => {
    const mock = new MockAdapter(customerAddressesAPI.customerAddresses);
    const data = {
      "id": 1,
      "customer_id": 2,
      "street_address": "123 Big Walk Way",
      "postal_code": "70523",
      "country": "US"
    };
    const addressId = 1;
    mock.onGet(`http://localhost:3001/customer_addresses/${data.id}`).reply(200,data);
    customerAddressesAPI.getCustomerAddress(addressId).then(function (response) {
      expect(response.data).toEqual(data);
      done()
    })

  })
});

describe('edit a single customer address', () => {
  it('should return the newly edited customer address object', done => {
    const mock = new MockAdapter(customerAddressesAPI.customerAddresses);
    const data = {
      "id": 1,
      "customer_id": 2,
      "street_address": "123 Keeper of the Light Way",
      "postal_code": "54321",
      "country": "CA"
    };
    const formValues = {
      "street_address": "123 Keeper of the Light Way",
      "postal_code": "54321",
      "country": "CA"
    };
    const customerId = 2;
    const addressId = 1;
    mock.onPut(`http://localhost:3001/customer_addresses/${data.id}`).reply(200,data);
    customerAddressesAPI.editCustomerAddress(formValues, addressId, customerId).then(function(response) {
      expect(response.data).toEqual(data);
      done();
    })
  })
});

describe('create a single customer address', () => {
  it('should return the newly created customer object', done => {
    const mock = new MockAdapter(customerAddressesAPI.customerAddresses);
    const data = {
      "customer_id": 5,
      "street_address": "123 Keeper of the Light Way",
      "postal_code": "54321",
      "country": "CA"
    };
    const formValues = {
      "street_address": "123 Keeper of the Light Way",
      "postal_code": "54321",
      "country": "CA"
    };
    const customerId = 5;
    mock.onPost('http://localhost:3001/customer_addresses').reply(200,data);
    customerAddressesAPI.createCustomerAddress(formValues, customerId).then(function(response) {
      expect(response.data).toEqual(data);
      done();
    })
  })
});

describe('delete a single customer', () => {
  it('should delete the customer object', done => {
    const mock = new MockAdapter(customerAddressesAPI.customerAddresses);
    const data = {
      "id": 2,
      "customer_id": 3,
      "street_address": "509 Charter Road",
      "postal_code": "90021",
      "country": "US"
    };
    mock.onDelete(`http://localhost:3001/customer_addresses/${data.id}`).reply(200);
    customerAddressesAPI.deleteCustomerAddress(data.id).then(function(response){
      expect(response.status).toEqual(200);
      done();
    })
  })
});

