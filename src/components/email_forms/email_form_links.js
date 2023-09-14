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
          onClick={() => {
            setShowForgot(true);
            setShowResend(false);
          }}
        >
          Forgot Password
        </Button>
      </li>
      <li>
        <Button
          onClick={() => {
            setShowResend(true);
            setShowForgot(false);
          }}
        >
          Resend Confirmation Instructions
        </Button>
      </li>
      { showForgot
        && <ForgotPassword handleClose={handleForgotHide} /> }
      { showResend
        && <ResendConfirmation handleClose={handleResendHide} /> }
    </ul>
  );
}
