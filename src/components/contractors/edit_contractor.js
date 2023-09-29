import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, Button,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { editContractor } from '../../redux/contractors/ContractorReducer';
import '../../styles/editContractorForm.scss';

export default function EditContractorForm(props) {
  const { handleClose2 } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [rate, setRate] = useState(userInfo.contractor.rate);
  const [bio, setBio] = useState(userInfo.contractor.bio);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (bio.length < 200) {
      setMessage(`${200 - bio.length} characters remaining`);
    } else {
      setMessage('');
    }
  }, [bio]);

  const handleSubmit = () => {
    dispatch(editContractor({
      contractor: {
        id: userInfo.contractor.id,
        rate,
        bio,
      },
    }));
  };

  return (
    <article className="edit-contractor">
      <form className="edit-contractor-form" onSubmit={handleSubmit}>
        <h2>Edit Contractor</h2>
        <TextField
          id="rate"
          label="Hourly Rate"
          type="number"
          variant="outlined"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
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
        <div className="edit-contractor-buttons">
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose2}
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

EditContractorForm.propTypes = {
  handleClose2: PropTypes.func.isRequired,
};
