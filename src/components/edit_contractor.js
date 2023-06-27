import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, Button,
} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { PropTypes } from 'prop-types';
import { editContractor } from '../redux/contractors/ContractorReducer';

export default function EditContractorForm(props) {
  const { handleClose2 } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [name, setName] = useState(userInfo.contractor.name);
  const [rate, setRate] = useState(userInfo.contractor.rate);
  const [bio, setBio] = useState(userInfo.contractor.bio);

  const handleSubmit = () => {
    dispatch(editContractor({
      contractor: {
        id: userInfo.contractor.id,
        name,
        rate,
        bio,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        id="rate"
        label="Hourly Rate"
        type="number"
        variant="outlined"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        required
      />
      <TextareaAutosize
        id="bio"
        placeholder="Bio"
        aria-label="minimum height"
        minRows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="outlined"
      >
        Submit
      </Button>
      <Button
        type="button"
        variant="outlined"
        onClick={handleClose2}
      >
        Cancel
      </Button>
    </form>
  );
}

EditContractorForm.propTypes = {
  handleClose2: PropTypes.func.isRequired,
};
