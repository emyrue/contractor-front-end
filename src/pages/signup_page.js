import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ImageUpload from '../components/image_upload';
import { userSignUp } from '../redux/user/UserReducer';
import postPhoto from '../modules/profilePictures';
import '../styles/signup.scss';

export default function SignupPage() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [pictureLink, setPictureLink] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [stateUpdated, setStateUpdated] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [width, setWidth] = useState('60vw');
  const navigate = useNavigate();

  const uploadUrl = `${process.env.REACT_APP_API_URL}upload`;

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width <= 601) {
      setWidth('80vw');
    } else {
      setWidth('60vw');
    }
  }, [dimensions]);

  useEffect(() => {
    if (stateUpdated) {
      const signUp = async () => {
        await userSignUp({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          picture_link: pictureLink,
        });
        navigate('/login');
      };
      signUp();
    }
  }, [stateUpdated, name, email, password, passwordConfirmation, pictureLink, navigate]);

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
    if (!file) {
      setPictureLink(process.env.REACT_APP_DEFAULT_PHOTO);
      setStateUpdated(true);
    } else {
      postPhoto(
        file,
        uploadUrl,
        setPictureLink,
        setStateUpdated,
        setErrorMessage,
      );
    }
    if (password === passwordConfirmation) {
      setErrorMessage('Loading...');
    } else {
      setErrorMessage('Make sure that the password matches the password confirmation.');
    }
  };

  return (
    <section className="signup-page-section">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="profile-picture-upload">
          <h2>Select Profile Picture</h2>
          <ImageUpload changeFile={changeFile} />
        </div>
        <TextField
          id="name"
          label="Username"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{
            width,
          }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{
            width,
          }}
        />
        <FormControl
          variant="outlined"
          sx={{
            width,
          }}
        >
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
        <FormControl
          variant="outlined"
          sx={{
            width,
          }}
        >
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
      <p className="error-message">{errorMessage}</p>
    </section>
  );
}
