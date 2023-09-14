import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import '../../styles/emailForms.scss';

export default function ResendConfirmation(props) {
  const { handleClose } = props;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}users/confirmation`, {
      user: { email },
    });
    setSubmitted(true);
  };

  return (
    <section className="email-form-section">
      <form className="email-form" onSubmit={handleSubmit}>
        <h2>Resend Confirmation Email</h2>
        <TextField
          id="resend-email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        { !submitted
        && (
        <div className="email-buttons">
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
        </div>
        )}
        { submitted
        && (
        <div className="email-sent">
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
    </section>
  );
}

ResendConfirmation.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
