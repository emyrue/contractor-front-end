import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField, Button,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { editUser } from '../redux/user/UserReducer';

export default function EditNamePopup(props) {
  const { handleClose } = props;
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({
      name,
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
      <Button
        type="submit"
        variant="outlined"
      >
        Submit
      </Button>
      <Button
        type="button"
        variant="outlined"
        onClick={handleClose}
      >
        Cancel
      </Button>
    </form>
  );
}

EditNamePopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
