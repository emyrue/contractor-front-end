import { useState } from 'react';
import {
  TextField, Button,
} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { PropTypes } from 'prop-types';

export default function ContractorForm(props) {
  const { handleClose } = props;
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = () => {
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
      <TextareaAutosize
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
