import { FC, FormEvent, useState } from 'react';
import './MatchModal.scss';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { Dog } from '../../models/DogsModel';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface MatchModalProps {
  dog: Dog;
  showModal: boolean;
  handleHide: () => void;
}

const MatchModal: FC<MatchModalProps> = ({ dog, showModal, handleHide }) => {
  const [submitting, setSubmitting] = useState(false);

  function fakeSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      handleHide();
      setSubmitting(false);
    }, 1500);
  }

  return (
    <Modal.Dialog>
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={handleHide}>
          <Modal.Title>Congrats! You matched with {dog.name}.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={dog.img} fluid className="rounded"></Image>
          <p className="h6 text-center mt-3 mb-0">
            A {dog.age === 0 ? '< 1 ' : dog.age === 1 ? '1 ' : `${dog.age} `}{' '}
            year old {dog.breed}.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Form
            onSubmit={fakeSubmit}
            className="d-flex flex-column align-items-center justify-content-center w-100"
          >
            <p>Want to request more info?</p>
            <div className="d-flex">
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
              />
              <Button
                variant="primary"
                type="submit"
                className="ms-2 d-flex align-items-center"
              >
                Submit
                {submitting && (
                  <span className="ms-1">
                    <LoadingSpinner size="sm"></LoadingSpinner>
                  </span>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Footer>
      </Modal>
    </Modal.Dialog>
  );
};

export default MatchModal;
