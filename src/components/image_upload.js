import { useRef, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

export default function ImageUpload(props) {
  const { changeFile } = props;
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('No file chosen');
  const fileButtonRef = useRef();

  useEffect(() => {
    if (file === '') {
      fileButtonRef.current.value = '';
    } else {
      fileButtonRef.current.files = file;
      setFileName(fileButtonRef.current.files[0].name);
      changeFile(fileButtonRef.current.files[0]);
    }
  }, [file]);

  const handleClick = () => {
    fileButtonRef.current.click();
  };

  const handleChange = (e) => {
    setFile(e.target.files);
  };

  return (
    <div>
      <input
        type="file"
        className="hide"
        onChange={handleChange}
        ref={fileButtonRef}
        accept="image/*"
      />
      <button
        type="button"
        onClick={handleClick}
      >
        Select
      </button>
      <span>{fileName}</span>
    </div>
  );
}

ImageUpload.propTypes = {
  changeFile: PropTypes.func.isRequired,
};
