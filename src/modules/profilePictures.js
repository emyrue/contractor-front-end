import axios from 'axios';

const postPhoto = async (
  file,
  uploadUrl,
  setPictureLink,
  setStateUpdated,
  setErrorMessage,
) => {
  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
  const response = await axios.post(uploadUrl, body);

  if (response.status === 200) {
    setPictureLink(response.data.secure_url);
    setStateUpdated(true);
  } else {
    if (setErrorMessage) {
      setErrorMessage('Profile picture not uploaded correctly.');
    }
    setPictureLink(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1693955285/cetxtwkworl98bhmc0yg.jpg`);
    setStateUpdated(true);
  }
};

export const deletePhoto = async (
  getPublicIdFromURL,
  user,
  generateSHA256,
  generateSignature,
  file,
  cloudinaryUrl,
) => {
  const publicId = getPublicIdFromURL(user.picture_link);
  const date = new Date();
  const timestamp = date.getTime();
  const signature = generateSHA256(generateSignature(publicId, process.env.REACT_APP_API_SECRET));
  if (file) {
    if (publicId) {
      const response = await axios.post(cloudinaryUrl, {
        public_id: publicId,
        api_key: process.env.REACT_APP_API_KEY,
        timestamp,
        signature,
      });
      console.log(response);
    }
  }
};

export default postPhoto;
