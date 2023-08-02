import React, { useState } from 'react';
import validator from 'validator';
import { setUserForm } from '../store/actions';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  };

const FormComponent = ({ users, setUserForm }) => {
const [formValues, setFormValues] = useState(initialState);
const [formErrors, setFormErrors] = useState({});

const validateForm = () => {
    let errors = {};

    if (!formValues.firstName.trim()) {
      errors.firstName = 'First Name required';
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = 'Last Name required';
    }

    if (!validator.isEmail(formValues.email)) {
      errors.email = 'Invalid Email';
    }

    if (formValues.message.length < 10) {
      errors.message = 'Should be at least 10 characters';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {      
      setUserForm(formValues);
      setFormValues(initialState);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
        <h1>User Form</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label>
                    First Name
            </label>
            <input
            id="firstName"
            type="text"
            value={formValues.firstName}
            onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
            />
            {formErrors.firstName && <p>{formErrors.firstName}</p>}
        </div>
        <div>
            <label>Last Name</label>
            <input
            id="lastName"
            type="text"
            value={formValues.lastName}
            onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
            />
            {formErrors.lastName && <p>{formErrors.lastName}</p>}
        </div>
        <div>
            <label>Email</label>
            <input
            id="email"
            type="text"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
            {formErrors.email && <p>{formErrors.email}</p>}
        </div>
        <div>
            <label>Message</label>
            <textarea
            id="message"
            value={formValues.message}
            onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
            />
            {formErrors.message && <p>{formErrors.message}</p>}
        </div>
        <button type="submit" disabled={Object.keys(formErrors).length > 0}>
            Submit
        </button>
        </form>
    </div>    
  );
};

export default FormComponent