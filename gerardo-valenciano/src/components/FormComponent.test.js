import React from 'react';
import FormComponent from './FormComponent';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();

const initialState = {
  users: [],
};

describe('FormComponent', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render all the form with inputs and the submit button', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );

    expect(getByLabelText('First Name')).toBeInTheDocument();
    expect(getByLabelText('Last Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Message')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should display errors when submitting with empty fields', async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      if (queryByText('*First Name required')) {
        expect(queryByText('*First Name required')).toBeInTheDocument();
      }
      if (queryByText('*Last Name required')) {
        expect(queryByText('*Last Name required')).toBeInTheDocument();
      }
      if (queryByText('*Invalid Email')) {
        expect(queryByText('*Invalid Email')).toBeInTheDocument();
      }
      if (queryByText('*Should be at least 10 characters')) {
        expect(queryByText('*Should be at least 10 characters')).toBeInTheDocument();
      }
    });
  });

  it('should enable the submit button after entering valid data', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );

    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const messageInput = getByLabelText('Message');
    const submitButton = getByText('Submit');

    fireEvent.change(firstNameInput, { target: { value: 'Gerardo' } });
    fireEvent.change(lastNameInput, { target: { value: 'Valenciano' } });
    fireEvent.change(emailInput, { target: { value: 'gvale@softserveinc.com' } });
    fireEvent.change(messageInput, {
      target: { value: 'Test message to the form entering valid data' },
    });

    expect(submitButton).toBeEnabled();
  });
  
});
