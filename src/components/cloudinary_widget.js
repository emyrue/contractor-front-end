import { useEffect, useRef } from 'react';

export default function CloudinaryWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
    }, (error, result) => {
      console.log(result);
    });
  }, []);

  return (
    <section>
      <button type="button" onClick={() => widgetRef.current.open()}>
        Upload
      </button>
      <img alt="" src="https://res.cloudinary.com/dvxsnjluz/image/upload/v1693340619/oglnkxmtoplspvzz7yml.png" />
    </section>
  );
}
