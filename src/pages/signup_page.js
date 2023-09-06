import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import ImageUpload from '../components/image_upload';
import { userSignUp } from '../redux/user/UserReducer';

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [signature, setSignature] = useState('');
  const [publicId, setPublicId] = useState('');
  const [pictureLink, setPictureLink] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stateUpdated, setStateUpdated] = useState(false);
  const navigate = useNavigate();

  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

  useEffect(() => {
    const signUp = async () => {
      await userSignUp({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        picture_link: pictureLink,
        public_id: publicId,
        signature,
      });

      navigate('/login');
    };
    signUp();
  }, [stateUpdated]);

  const changeFile = (value) => {
    setFile(value);
  };

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file === null) {
      setErrorMessage('Please select an image for your profile picture.');
    } else if (password === passwordConfirmation) {
      setErrorMessage('Loading...');
      const body = new FormData();
      body.append('file', file);
      body.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      const response = await axios.post(uploadUrl, body);

      if (response.status === 200) {
        setPublicId(response.data.public_id);
        setSignature(response.data.signature);
        setPictureLink(response.data.secure_url);
        setStateUpdated(true);
      } else {
        setErrorMessage('Profile picture not uploaded correctly.');
        setPictureLink(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/v1693955285/cetxtwkworl98bhmc0yg.jpg`);
        setStateUpdated(true);
      }
    } else {
      setErrorMessage('Make sure that the password matches the password confirmation.');
    }
  };

  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <h2>Select Profile Picture</h2>
        <ImageUpload changeFile={changeFile} />
        <TextField
          id="name"
          label="Username"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormControl variant="outlined">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            type={show ? 'text' : 'password'}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          )}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            id="password-confirmation"
            label="Confirm Password"
            variant="outlined"
            value={passwordConfirmation}
            type={show ? 'text' : 'password'}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          )}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
        >
          Submit
        </Button>
      </form>
      <p>{errorMessage}</p>
    </section>
  );
}
