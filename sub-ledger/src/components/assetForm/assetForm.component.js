import React, { useState, useEffect } from 'react'
import { Form, Button, Alert} from 'react-bootstrap';
import { addAsset } from '../../utils/API';
import {saveAssetIds, getSavedAssetIds} from '../../utils/localStorage'
import Auth from '../../utils/auth'


function AssetForm() {
    const [assetFormData, setAssetFormData] = useState({ name: '', bookValue: '', monthPurchased: '', usefulLife: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [savedAssetIds, setSavedAssetIds] = useState(getSavedAssetIds());
  
    useEffect(() => {
        return () => saveAssetIds(savedAssetIds)
    })

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setAssetFormData({ ...assetFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      await handleSaveAsset(assetFormData);

      setAssetFormData({
        name: '', 
        bookValue: '', 
        monthPurchased: '', 
        usefulLife: ''
      });
    };
    
    const handleSaveAsset = async (asset) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
            
            const response = await addAsset(assetFormData, token);
            const {assets} = await response.json();
            
        
            if (!response.ok) {
              throw new Error('something went wrong!');
            }

            setSavedAssetIds([...savedAssetIds, assets[assets.length - 1]._id])
    
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <h3>Add Asset</h3>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your Asset!
                </Alert>


                <Form.Group>
                    <Form.Label>Asset Name</Form.Label>
                    <Form.Control
                    type="text"
                    name='name'
                    placeholder="Name"
                    value={assetFormData.name}
                    onChange={handleInputChange}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Asset Name is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Book Value</Form.Label>
                    <Form.Control
                    type="number"
                    name='bookValue'
                    placeholder="5000"
                    value={assetFormData.bookValue}
                    onChange={handleInputChange}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Book Value is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date Purchased</Form.Label>
                    <Form.Control
                    type='date'
                    placeholder='1/15/20'
                    name='monthPurchased'
                    onChange={handleInputChange}
                    value={assetFormData.monthPurchased}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Month Purchased is required!</Form.Control.Feedback>
                </Form.Group>
        
                <Form.Group>
                    <Form.Label>Useful Life(in years)</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='5'
                    name='usefulLife'
                    onChange={handleInputChange}
                    value={assetFormData.usefulLife}
                    required
                    />
                    <Form.Control.Feedback type='invalid'>Useful Life is required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(assetFormData.usefulLife && assetFormData.monthPurchased && assetFormData.name && assetFormData.bookValue)}
                    type='submit'
                    variant='success'
                    className='btn-dark btn-lg btn-block'>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AssetForm
