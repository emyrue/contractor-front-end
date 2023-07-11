import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export default function ReservationNotSaved() {
  const [classname, setClassname] = useState('hide');
  const reservationMessages = useSelector((state) => state.reservations.createReservationMessages);

  useEffect(() => {
    if (reservationMessages[0] === 'overlaps with existing reservation for the same contractor') {
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
      <h1>Reservation not saved</h1>
      <p>
        Your reservation overlaps with an existing reservation.
        {' '}
        Consider selecting different dates.
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
