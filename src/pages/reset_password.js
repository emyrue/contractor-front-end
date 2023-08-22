import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import endpoint from '../redux/endpoint';

export default function ResetPassword() {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [show, setShow] = useState(false);
  const [confirmationShow, setConfirmationShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setToken(location.pathname.slice(10));
  }, [token, location.pathname]);

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const handleClickShowConfirmation = () => {
    setConfirmationShow(!confirmationShow);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

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
            <FormControl variant="outlined">
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                id="new-password"
                label="New Password"
                variant="outlined"
                value={password}
                type={show ? 'text' : 'password'}
                required
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>Confirm Password</InputLabel>
              <OutlinedInput
                id="confirm-new-password"
                label="Confirm Password"
                variant="outlined"
                value={confirmation}
                type={confirmationShow ? 'text' : 'password'}
                required
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmation}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {confirmationShow ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </FormControl>
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
