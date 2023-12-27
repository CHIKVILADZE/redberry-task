import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
function EmailModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button className="btn btn-primary" onClick={handleShow}>
        შესვლა{' '}
      </Button>

      <Modal show={show} onClick={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h6 className="font-weight-bold fs-3">შესვლა</h6>
          <form className="w-100vw rounded-3  ">
            <label>ელ-ფოსტა</label>
            <input
              type="email"
              className="form-control bg-light mt-2 w-100% "
              id="email"
              placeholder="Example@redberry.ge"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">შესვლა</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EmailModal;
