import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField, Button,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { createContractor } from '../../redux/contractors/ContractorReducer';
import '../../styles/contractorForm.scss';

export default function ContractorForm(props) {
  const { handleClose1 } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [jobTitle, setJobTitle] = useState('');
  const [rate, setRate] = useState(0);
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (bio.length < 200) {
      setMessage(`${200 - bio.length} characters remaining`);
    } else {
      setMessage('');
    }
  }, [bio]);

  const handleSubmit = (e) => {
    if (bio.length <= 200) {
      e.preventDefault();
    } else {
      dispatch(createContractor({
        user_id: userInfo.user.id,
        rate,
        job_title: jobTitle,
        bio,
      }));
    }
  };

  return (
    <article className="contractor-form-section">
      <form onSubmit={handleSubmit}>
        <h2>New Contractor</h2>
        <TextField
          id="rate"
          label="Hourly Rate"
          type="number"
          variant="outlined"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
        <TextField
          id="job-title"
          label="Profession"
          variant="outlined"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <textarea
          id="bio"
          placeholder="Bio"
          aria-label="minimum height"
          rows={6}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        { message
          && <p>{message}</p>}
        <div className="new-contractor-buttons">
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose1}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </article>
  );
}

ContractorForm.propTypes = {
  handleClose1: PropTypes.func.isRequired,
};
