import React, { useState} from "react";
import {Form, Button, Alert} from 'react-bootstrap';

import {createUser} from '../../utils/API';
import Auth from '../../utils/auth'

const SignUp = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ email: '', password: '', firstName: '', lastName: '' });
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const response = await createUser(userFormData);
        
        console.log(response);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const { token, user } = await response.json();
        console.log(user);
        Auth.login(token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
  
      setUserFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      });
    };
  
    return (
      <>
        {/* This is needed for the validation functionality above */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <h3>Register</h3>
          {/* show alert if server response is bad */}
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your signup!
          </Alert>

          <Form.Group>
          <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name='firstName'
              placeholder="First name"
              value={userFormData.firstName}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type='invalid'>First Name is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
          <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name='lastName'
              placeholder="Last name"
              value={userFormData.lastName}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type='invalid'>Last Name is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.email && userFormData.password && userFormData.firstName && userFormData.lastName)}
            type='submit'
            variant='success'
            className='btn-dark btn-lg btn-block'>
            Submit
          </Button>
          <p className="forgot-password text-right">
           Already registered <a href="../sign-in">log in?</a>
          </p>
        </Form>
      </>
    );
}

export default SignUp;