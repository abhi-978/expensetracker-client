import React, { useState } from 'react';
import { Form, FormGroup, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { startSaveProfileImage } from '../../Actions/tempDataAction';
import { useDispatch } from 'react-redux';

const ProfileImgChangeModal = (props) => {
  const { show, onHide } = props;
  const [file, setFile] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('token'),
      },
    };
    dispatch(startSaveProfileImage(formData, config, onHide));
  };
  const handlChangeFile = (val) => {
    setFile(val);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Change profile picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel className="fs-5">Upload an image</FormLabel> <br />
            <input
              type="file"
              name="image"
              onChange={(e) => {
                handlChangeFile(e.target.files[0]);
              }}
            />{' '}
            <br />
            <Button type="submit" className="my-3">
              Upload
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ProfileImgChangeModal;
