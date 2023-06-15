import { useState } from 'react';
import { TextField, Button } from '@mui/material';
// import axios from 'axios';

export default function LoginPage() {
  // const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section>
      <h1>Log In</h1>
      <form>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={password}
          // type={show ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
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
