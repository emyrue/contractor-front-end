import { useRef, useState, useEffect } from 'react';

export default function TestCloudinary() {
  const [file, setFile] = useState('');
  const fileButtonRef = useRef();

  useEffect(() => {
    if (file === '') {
      fileButtonRef.current.value = '';
    } else {
      fileButtonRef.current.files = file;
    }
  }, [file]);

  const handleClick = () => {
    fileButtonRef.current.click();
  };

  const handleChange = (e) => {
    setFile(e.target.file);
  };

  return (
    <form>
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
      { fileButtonRef.current
        && <span>{fileButtonRef.current.files[0].name}</span> }
      { !fileButtonRef.current
        && <span>No file chosen</span>}
      <button type="submit">
        Submit
      </button>
    </form>
  );
}
