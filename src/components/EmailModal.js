import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';
import '../index.css';

function EmailModal() {
  const [show, setShow] = useState(false);
  const { token } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setShow(false);
    setErrorMessage('');
  };

  const handleShow = () => setShow(true);

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
      console.log('Responseeee:', response);
      //   handleClose();
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
      <Button className="btn btn-primary" onClick={handleShow}>
        შესვლა
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
          <h6 className="font modalTitle">შესვლა</h6>
          <form className="w-100vw rounded-3">
            <label className="font text-dark font-size-14 font-weight-medium font-style-normal">
              ელ-ფოსტა
            </label>
            <input
              type="email"
              className="form-control  mt-2 w-100%"
              id="email"
              placeholder="Example@redberry.ge"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: errorMessage
                  ? '1px solid #EA1919'
                  : '1px solid #CED4DA',
                background: errorMessage ? '#FAF2F3' : '#FFFFFF',
              }}
            />
            {errorMessage && (
              <div className="text-danger mt-2">
                <img src="/assets/errorIcon.png" alt="error icon" />{' '}
                {errorMessage}
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer className="pb-5">
          <Button variant="primary" className="w-100" onClick={handleSubmit}>
            შესვლა
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmailModal;
