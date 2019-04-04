const customersAPI = require('../customersAPI');
const MockAdapter = require('axios-mock-adapter');

describe('get customers test', () => {
  it('returns array of customers', done => {
    const mock = new MockAdapter(customersAPI.customers);
    const data = [{
      "id": 1,
      "name": "Ryan"
    },
      {
        "id": 2,
        "name": "Jonathan"
      },
      {
        "id": 3,
        "name": "Colin"
      },
      {
        "id": 4,
        "name": "Syed"
      }];

    mock.onGet('http://localhost:3001/customers').reply(200, data);
    customersAPI.getCustomers().then(function (response) {
      expect(response.data).toEqual(data);
      done()
    });
  })

});

describe('get single customer', () => {
  it('should return a single customer object', done => {
    const mock = new MockAdapter(customersAPI.customers);
    const data = {
      "id": 1,
      "name": "Ryan"
    };
    const customerId = 1;
    mock.onGet(`http://localhost:3001/customers/${data.id}`).reply(200,data);
    customersAPI.getCustomer(customerId).then(function (response) {
      expect(response.data).toEqual(data);
      done()
    })

  })
});

describe('edit a single customer', () => {
  it('should return the newly edited customer object', done => {
    const mock = new MockAdapter(customersAPI.customers);
    const data = {
      "id": 4,
      "name": "Jim"
    };
    const formValues = {
      "name": "Jim"
    };
    const customerId = 4;
    mock.onPatch(`http://localhost:3001/customers/${data.id}`).reply(200,data);
    customersAPI.editCustomer(formValues, customerId).then(function(response) {
      expect(response.data).toEqual(data);
      done();
    })
  })
});

describe('create a single customer', () => {
  it('should return the newly created customer object', done => {
    const mock = new MockAdapter(customersAPI.customers);
    const data = {
      "id": 5,
      "name": "Duncan"
    };
    const formValues = {
      "name": "Duncan"
    };
    mock.onPost('http://localhost:3001/customers').reply(200,data);
    customersAPI.createCustomer(formValues).then(function(response) {
      expect(response.data).toEqual(data);
      done();
    })
  })
});

describe('delete a single customer', () => {
  it('should delete the customer object', done => {
    const mock = new MockAdapter(customersAPI.customers);
    const data = {
      "id": 4,
      "name": "Syed"
    };
    const customerId = 4;
    mock.onDelete(`http://localhost:3001/customers/${data.id}`).reply(200);
    customersAPI.deleteCustomer(customerId).then(function(response){
      expect(response.status).toEqual(200);
      done();
    })
  })
});


