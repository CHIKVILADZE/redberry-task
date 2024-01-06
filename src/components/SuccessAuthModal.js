import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';
import '../index.css';

function SuccessAuthModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center z-10 ">
          <img src="/assets/success.png" alt="success" />
          <h4 className="font modalTitle mt-3">წარმატებული ავტორიზაცია</h4>
        </Modal.Body>
        <Modal.Footer className="pb-5 border-0 ">
          <Button variant="primary" className="w-100">
            კარგი
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuccessAuthModal;
