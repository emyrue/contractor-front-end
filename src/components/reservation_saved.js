import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import '../styles/reservationSaved.css';

export default function ReservationSaved() {
  const [classname, setClassname] = useState('hide');
  const reservationMessages = useSelector((state) => state.reservations.createReservationMessages);

  useEffect(() => {
    if (reservationMessages[0] === 'Reservation created successfully.') {
      setClassname('show');
    } else {
      setClassname('hide');
    }
  }, [reservationMessages]);

  const handleClick = () => {
    setClassname('hide');
  };

  return (
    <article className={classname}>
      <h1>Reservation created successfully</h1>
      <p>
        Your reservation is awaiting contractor approval.
        {' '}
        See the status of your request on your account page.
      </p>
      <Button
        variant="outlined"
        onClick={handleClick}
      >
        Ok
      </Button>
    </article>
  );
}
