import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import endpoint from '../../redux/endpoint';

export default function ForgotPassword(props) {
  const { handleClose } = props;
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${endpoint}users/password`, {
      user: { email },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="forgot-email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="submit"
      >
        Submit
      </Button>
      <Button
        onClick={handleClose}
      >
        Close
      </Button>
    </form>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
