import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import endpoint from '../redux/endpoint';

export default function ResetPassword() {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setToken(location.pathname.slice(10));
  }, [token, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmation) {
      try {
        await axios.put(`${endpoint}users/password`, {
          user: {
            password,
            confirm_password: confirmation,
            reset_password_token: token,
          },
        });
        setMessage('Password reset successfully.');
      } catch (err) {
        setMessage('Password not reset.');
      }
    } else {
      setMessage('Password and password confirmation do not match.');
    }
  };

  return (
    <section>
      { token
        && (
          <form onSubmit={handleSubmit}>
            <TextField
              id="new-password"
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="confirm-new-password"
              label="Confirm New Password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
            <Button
              type="submit"
            >
              Submit
            </Button>
            { message
              && <p>{message}</p>}
          </form>
        )}
      { !token
        && (
          <p>
            No token present.
            {' '}
            Please click the &quot;Forgot Password&quot;
            {' '}
            option on the login page to request a link with a token.
          </p>
        )}
    </section>
  );
}
