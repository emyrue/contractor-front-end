import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField, Button,
} from '@mui/material';
import { editUser } from '../redux/user/UserReducer';

export default function EditUserPopup() {
  const name = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(editUser({
      name,
    }));
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          variant="outlined"
        >
          Submit
        </Button>
      </form>
    </section>
  );
}