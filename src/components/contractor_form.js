import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TextField, Button,
} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { PropTypes } from 'prop-types';
import { editUser } from '../redux/user/UserReducer';
import { createContractor } from '../redux/contractors/ContractorReducer';

export default function ContractorForm(props) {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [rate, setRate] = useState(0);
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({
      is_contractor: true,
    }));
    dispatch(createContractor({
      user_id: userInfo.user.id,
      name,
      rate,
      bio,
    }));
    handleClose();
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
    </form>
  );
}

ContractorForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
