import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProfileImgChangeModal from '../../Components/Modals/ProfileImgChangeModal';

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const imageStyles = {
    display: 'block',
    width: 'auto',
    height: 'auto',
    maxWidth: '500px',
  };

  const handleChangeImage = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container>
      {show && <ProfileImgChangeModal show={show} onHide={handleClose} />}
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="my-4">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="rounded m-4"
              style={imageStyles}
            />
          ) : (
            <span className="fs-3">Upload a profile picture</span>
          )}
        </div>
        <div>
          <Button onClick={handleChangeImage} className="px-4">
            {user.image ? 'Change' : 'Add'} Profile Picture
          </Button>
        </div>
        <div className="fs-4 p-4">
          <span> Email </span> : <span>{user.email}</span>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
