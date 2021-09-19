import React, { useState} from "react";
import {Form, Button, Alert} from 'react-bootstrap';

import {createUser} from '../../utils/API';
import Auth from '../../utils/auth'

const SignUp = () => {
    // set initial form state
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
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
      });
    };
  
    return (
      <>
        {/* This is needed for the validation functionality above */}
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {/* show alert if server response is bad */}
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your signup!
          </Alert>

          <h3>Register</h3>
  
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
            disabled={!(userFormData.username && userFormData.email && userFormData.password)}
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

    // return (
    //   <form>
    //     <h3>Register</h3>

    //     <div className="form-group">
    //       <label>First name</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         placeholder="First name"
    //       />
    //     </div>

    //     <div className="form-group">
    //       <label>Last name</label>
    //       <input type="text" 
              // className="form-control" 
              // placeholder="Last name" />
    //     </div>

    //     <div className="form-group">
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         placeholder="Enter email"
    //       />
    //     </div>

    //     <div className="form-group">
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         placeholder="Enter password"
    //       />
    //     </div>

    //     <button type="submit" className="btn btn-dark btn-lg btn-block">
    //       Register
    //     </button>
    //     <p className="forgot-password text-right">
    //       Already registered <a href="../sign-in">log in?</a>
    //     </p>
    //   </form>
    // );
}

export default SignUp;