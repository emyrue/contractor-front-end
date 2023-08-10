import { useState } from 'react';
import { Button } from '@mui/material';
import ResendConfirmation from './resend_confirmation';

export default function EmailFormLinks() {
  const [resendClass, setResendClass] = useState('hide');

  const handleResendHide = () => {
    setResendClass('hide');
  };

  return (
    <ul>
      <li>
        <Button
          onClick={() => setResendClass('')}
        >
          Resend Confirmation Instructions
        </Button>
      </li>
      <ResendConfirmation className={resendClass} handleClose={handleResendHide} />
    </ul>
  );
}
