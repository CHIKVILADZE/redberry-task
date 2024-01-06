import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';
import EmailModal from './EmailModal';
import SuccessAuthModal from './SuccessAuthModal';
import '../index.css';

function AuthModal() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { token } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://api.blog.redberryinternship.ge/api/login',
        JSON.stringify({ email }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 204) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage('ელ-ფოსტა არ მოიძებნა');
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
    }
  };

  return (
    <>
      <EmailModal
        email={email}
        setEmail={setEmail}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default AuthModal;
