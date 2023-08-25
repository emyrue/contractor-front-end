import { useRef } from 'react';
import Input from '@mui/material/Input';

export default function TestCloudinary() {
  const fileButtonRef = useRef(null);

  const handleClick = () => {
    fileButtonRef.current.click();
  };

  return (
    <form>
      <input
        type="file"
        className="hide"
        onChange
      />
    </form>
  );
}
