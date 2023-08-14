import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import endpoint from '../../redux/endpoint';

export default function ResendConfirmation(props) {
  const { handleClose } = props;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${endpoint}users/confirmation`, {
      user: { email },
    });
    setSubmitted(true);
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
      { submitted
        && (
        <div>
          <p>
            If there is an account associated with the submitted email address,
            {' '}
            you will receive an email with confirmation instructions within the next few minutes.
          </p>
          <Button
            onClick={handleClose}
          >
            Ok
          </Button>
        </div>
        )}
    </form>
  );
}

ResendConfirmation.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
