import axios from 'axios';

const postPhoto = async (
  file,
  uploadUrl,
  setPublicId,
  setSignature,
  setPictureLink,
  setStateUpdated,
  setErrorMessage,
) => {
  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
  const response = await axios.post(uploadUrl, body);

  if (response.status === 200) {
    setPublicId(response.data.public_id);
    setSignature(response.data.signature);
    setPictureLink(response.data.secure_url);
    setStateUpdated(true);
  } else {
    setErrorMessage('Profile picture not uploaded correctly.');
    setPictureLink(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1693955285/cetxtwkworl98bhmc0yg.jpg`);
    setStateUpdated(true);
  }
};

export default postPhoto;
