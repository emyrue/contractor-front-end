import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import endpoint from '../../redux/endpoint';

export default function ResendConfirmation(props) {
  const { handleClose } = props;
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${endpoint}users/confirmation`, {
      user: { email },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="resend-email"
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
        Cancel
      </Button>
    </form>
  );
}

ResendConfirmation.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
