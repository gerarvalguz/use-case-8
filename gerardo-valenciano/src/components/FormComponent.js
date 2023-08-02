import React, { useState } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { setUserForm } from '../store/actions';
import uuid from 'react-uuid'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

const FormComponent = ({ users, setUserForm }) => {
const [formValues, setFormValues] = useState(initialState);
const [formErrors, setFormErrors] = useState({});
const [isFormValid, setIsFormValid] = useState(false);

const validateForm = () => {
    let errors = {};

    if (!formValues.firstName.trim()) {
      errors.firstName = '*First Name required';
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = '*Last Name required';
    }

    if (!validator.isEmail(formValues.email)) {
      errors.email = '*Invalid Email';
    }

    if (formValues.message.length < 10) {
      errors.message = '*Should be at least 10 characters';
    }

    return errors;
  };

  const handleValidation = () => {
    const errors = validateForm();
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
    handleValidation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidation();
    if (isFormValid) {
      setUserForm(formValues);
      setFormValues(initialState);
      setFormErrors({});
    }
  };


  return (
    <div>
        <h1>User Form</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label 
                htmlFor="firstName" 
                className='label'>
                    First Name
            </label>
            <input
            id="firstName"
            name="firstName"
            type="text"
            value={formValues.firstName}
            className='inputText'
            onChange={handleChange}
            />
            {formErrors.firstName && <p>{formErrors.firstName}</p>}
        </div>
        <div>
            <label htmlFor="lastName" className='label'>Last Name</label>
            <input
            id="lastName"
            name="lastName"
            type="text"
            value={formValues.lastName}
            className='inputText'
            onChange={handleChange}
            />
            {formErrors.lastName && <p>{formErrors.lastName}</p>}
        </div>
        <div>
            <label htmlFor="email" className='label'>Email</label>
            <input
            id="email"
            name="email"
            type="text"
            value={formValues.email}
            className='inputText'
            onChange={handleChange}
            />
            {formErrors.email && <p>{formErrors.email}</p>}
        </div>
        <div>
            <label htmlFor="message" className='label'>Message</label>
            <textarea
            id="message"
            name="message"
            value={formValues.message}
            className='inputText'
            onChange={handleChange}
            rows={5}
            />
            {formErrors.message && <p>{formErrors.message}</p>}
        </div>
        <div>
            <button 
                type="submit" 
                className='button'
                disabled={!isFormValid}
                {...(!isFormValid && { disabled: false })}
            >
                Submit
            </button>
        </div>
        </form>
        
        <table>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Message</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={uuid()}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.message}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>    
  );
};

const mapStateToProps = (state) => ({
    users: state.users || []
});

const mapDispatchToProps = (dispatch) => ({
    setUserForm: (userData) => dispatch(setUserForm(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
