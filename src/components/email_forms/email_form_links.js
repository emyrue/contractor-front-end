import { useState } from 'react';
import { Button } from '@mui/material';
import ResendConfirmation from './resend_confirmation';
import ForgotPassword from './forgot_password';

export default function EmailFormLinks() {
  const [showResend, setShowResend] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleResendHide = () => {
    setShowResend(false);
  };

  const handleForgotHide = () => {
    setShowForgot(false);
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
      <li>
        <Button
          onClick={() => setShowForgot(true)}
        >
          Forgot Password
        </Button>
      </li>
      { showResend
        && <ResendConfirmation handleClose={handleResendHide} /> }
      { showForgot
        && <ForgotPassword handleClose={handleForgotHide} /> }
    </ul>
  );
}
