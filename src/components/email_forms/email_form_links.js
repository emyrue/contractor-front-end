import { useState } from 'react';
import { Button } from '@mui/material';
import ResendConfirmation from './resend_confirmation';

export default function EmailFormLinks() {
  const [showResend, setShowResend] = useState(false);

  const handleResendHide = () => {
    setShowResend(false);
  };

  return (
    <ul>
      <li>
        <Button
          onClick={() => setShowResend(true)}
        >
          Resend Confirmation Instructions
        </Button>
      </li>
      { showResend
        && <ResendConfirmation handleClose={handleResendHide} /> }
    </ul>
  );
}
