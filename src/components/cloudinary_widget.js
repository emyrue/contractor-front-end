import { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';

export default function CloudinaryWidget(props) {
  const { setPictureLink, setPublicId, setSignature } = props;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploaded, setUploaded] = useState(false);
  const [pictureName, setPictureName] = useState('No file chosen');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      multiple: false,
      maxFiles: 1,
    }, (error, result) => {
      if (result.event === 'success') {
        console.log(result);
        if (uploaded) {
          
        }
        setPublicId(result.info.public_id);
        setSignature(result.info.signature);
        setPictureName(result.info.original_filename);
        setPictureLink(result.info.secure_url);
        setUploaded(true);
      } else {
        console.log('don\'t worry about it babe');
      }
    });
  }, [uploaded, setUploaded, setPublicId, setSignature, setPictureLink]);

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
  setPublicId: PropTypes.func.isRequired,
  setSignature: PropTypes.func.isRequired,
};
