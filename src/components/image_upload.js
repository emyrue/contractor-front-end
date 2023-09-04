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
    }
  }, [file]);

  const handleClick = () => {
    fileButtonRef.current.click();
  };

  const handleChange = (e) => {
    changeFile(e.target.file);
    setFile(e.target.file);
  };

  return (
    <div>
      <input
        type="file"
        className="hide"
        onChange={handleChange}
        ref={fileButtonRef}
        accept="image/png, image/jpeg"
      />
      <button
        type="button"
        onClick={handleClick}
      >
        Click
      </button>
      <span>{fileName}</span>
    </div>
  );
}

ImageUpload.propTypes = {
  changeFile: PropTypes.func.isRequired,
};
