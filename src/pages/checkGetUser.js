import { Button } from '@mui/material';
import axios from 'axios';
import endpoint from '../redux/endpoint';

export default function CheckGetUser() {
  const handleClick = async () => {
    const response = await axios.post(`${endpoint}users/sign_in`,
      {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      });
    console.log(response);
  };

  return (
    <section>
      <Button
        type="button"
        variant="outlined"
        onClick={handleClick}
      >
        Get User
      </Button>
    </section>
  );
}
