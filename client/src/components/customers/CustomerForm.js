import React from 'react';
import { Field, Form } from 'react-final-form';

import {Link} from "react-router-dom";


const nameRequired = value => (value ? undefined : "Name is required!");

class CustomerForm extends React.Component {
  renderError({ error, touched }){
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">
            {error}
          </div>
        </div>
      );
    }
  }

  renderInput = ({ input, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    )
  };

  renderBack = () => {
    return (
      <Link to={"/"} className="ui button error">
        Back
      </Link>
    )
  };

  onSubmit = async (formValues) => {
    this.props.onSubmit(formValues, this.props.initialValues.id)
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        className="ui form error"
        initialValues={this.props.initialValues}
        render={({handleSubmit, type, form, submitting, validating, pristine}) => (
          <form className="ui form error" onSubmit={handleSubmit}>
            <div>
              <label><h4>Enter Name</h4></label>
              <Field
                name="name"
                component={this.renderInput}
                validate={nameRequired}
              />
            </div>
            <div>
              <label><h4>Enter Street Address</h4></label>
              <Field
                name="street_address"
                component={this.renderInput}
              />
            </div>
            <div>
              <label><h4>Enter Postal Code</h4></label>
              <Field
                name="postal_code"
                component={this.renderInput}
              />
            </div>
            <div>
              <label><h4>Enter Country</h4></label>
              <Field
                name="country"
                component={this.renderInput}
              />
            </div>
            <div>
              {this.renderBack()}
              <button className="ui primary button" type="submit" disabled={submitting || pristine}>
                Submit
              </button>
            </div>
          </form>
        )}
      />
    )
  }
}

export default CustomerForm