import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import {
  TextField, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userLogin } from '../redux/user/UserReducer';

export default function LoginPage() {
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user.user);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => {
    setShow(!show);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogin({
      user: {
        email,
        password,
      },
    }));
    navigate('/');
  };

  return (
    <section>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
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
            required
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
          />
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
        >
          Submit
        </Button>
      </form>
      {/* { (location.state && !user.name) && <p>{location.state.message}</p> } */}
    </section>
  );
}
