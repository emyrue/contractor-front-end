import { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';

export default function CloudinaryWidget(props) {
  const { setPictureLink } = props;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [pictureName, setPictureName] = useState('No file chosen');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
    }, (error, result) => {
      if (result.event === 'success') {
        console.log('success');
        setPictureName(result.info.original_filename);
        setPictureLink(result.info.secure_url);
      } else {
        console.log(result);
      }
    });
  }, []);

  return (
    <section>
      <button type="button" onClick={() => widgetRef.current.open()}>
        Upload
      </button>
      <span>{pictureName}</span>
    </section>
  );
}

CloudinaryWidget.propTypes = {
  setPictureLink: PropTypes.func.isRequired,
};
