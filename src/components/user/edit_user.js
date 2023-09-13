import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, Button, Fab,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import crypto from 'crypto-js';
import { editUser } from '../../redux/user/UserReducer';
import postPhoto, { deletePhoto } from '../../modules/profilePictures';
import ImageUpload from '../image_upload';

export default function EditUserPopup(props) {
  const { handleClose } = props;
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(user.name);
  const [code, setCode] = useState('');
  const [file, setFile] = useState('');
  const [pictureLink, setPictureLink] = useState(user.picture_link);
  const [stateUpdated, setStateUpdated] = useState(false);
  const [adminForm, setAdminForm] = useState(false);
  const dispatch = useDispatch();

  const cloudinaryUrl = `${process.env.REACT_APP_API_URL}destroy`;
  const uploadUrl = `${process.env.REACT_APP_API_URL}upload`;

  useEffect(() => {
    if (stateUpdated) {
      dispatch(editUser({
        id: user.id,
        name,
        role: code,
        picture_link: pictureLink,
      }));
    }
  }, [stateUpdated, user.id, code, pictureLink, name, dispatch]);

  const generateSHA256 = (data) => crypto.SHA256(data).toString();

  const getPublicIdFromURL = (url) => {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const handleSubmit = async () => {
    if (file) {
      if (pictureLink !== process.env.REACT_APP_DEFAULT_PHOTO) {
        deletePhoto(
          getPublicIdFromURL,
          user,
          generateSHA256,
          generateSignature,
          file,
          cloudinaryUrl,
        );
      }
      postPhoto(
        file,
        uploadUrl,
        setPictureLink,
        setStateUpdated,
        null,
      );
    } else {
      setStateUpdated(true);
    }
  };

  const changeFile = (value) => {
    setFile(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ImageUpload changeFile={changeFile} />
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      { !adminForm
        && (
          <Fab
            variant="extended"
            onClick={() => setAdminForm(true)}
          >
            Request Admin
          </Fab>
        )}
      { adminForm
        && (
          <TextField
            id="code"
            label="Admin Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}
      <Button
        type="submit"
        variant="outlined"
      >
        Submit
      </Button>
      <Button
        type="button"
        variant="outlined"
        onClick={handleClose}
      >
        Cancel
      </Button>
    </form>
  );
}

EditUserPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
