import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { PropTypes } from 'prop-types';

export default function ResendConfirmation(props) {
  const { className, handleClose } = props;
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
    >
      <TextField
        id="resend-email"
        label="Email"
        value={email}
        onChange={setEmail}
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
  className: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
