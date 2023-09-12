import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, Button, Fab,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import crypto from 'crypto-js';
import { editUser } from '../../redux/user/UserReducer';
import ImageUpload from '../image_upload';

export default function EditNamePopup(props) {
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

  const generateSHA256 = (data) => {
    return crypto.SHA256(data).toString();
  };

  const getPublicIdFromURL = (url) => {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    deletePhoto(
      getPublicIdFromURL,
      user,
      generateSHA256,
      generateSignature,
      file,
      cloudinaryUrl,
    );
    postPhoto(
      file,
      uploadUrl,
      setPictureLink,
      setStateUpdated,
      null,
    );
    // const publicId = getPublicIdFromURL(user.picture_link);
    // console.log(publicId);
    // console.log(user.public_id);
    // const date = new Date();
    // const timestamp = date.getTime();
    // const signature = generateSHA256(generateSignature(publicId, process.env.REACT_APP_API_SECRET));
    // if (file) {
    //   if (publicId) {
    //     const response = await axios.post(cloudinaryUrl, {
    //       public_id: publicId,
    //       api_key: process.env.REACT_APP_API_KEY,
    //       timestamp,
    //       signature,
    //     });
    //     console.log(response);
    //   }
    // }

    dispatch(editUser({
      id: user.id,
      name,
      role: code,
      picture_link: pictureLink,
    }));
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

EditNamePopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
