import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, Button, Fab,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { editUser } from '../../redux/user/UserReducer';

export default function EditNamePopup(props) {
  const { handleClose } = props;
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(user.name);
  const [code, setCode] = useState('');
  const [adminForm, setAdminForm] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // localStorage.setItem('name', `${name}`);
    // e.preventDefault();
    // console.log(name);
    dispatch(editUser({
      id: user.id,
      name,
      role: code,
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
      { !adminForm
        && (
          <Fab
            variant="extended"
            onClick={() => setAdminForm(true)}
          >
            Request Admin
          </Fab>
        )}
      { adminForm
        && (
          <TextField
            id="code"
            label="Admin Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}
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
