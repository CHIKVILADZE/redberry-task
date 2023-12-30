import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';
import '../index.css';

function SuccessModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-primary" onClick={handleShow}>
        გამოქვეყნება
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center ">
          <img src="/assets/success.png" alt="success" />
          <h4 className="font modalTitle mt-3">ჩანაწერი წარმატებით დაემატა</h4>
        </Modal.Body>
        <Modal.Footer className="pb-5 border-0 ">
          <Button variant="primary" className="w-100">
            მთავარ გვერდზე დაბრუნება
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuccessModal;
