import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export default function ReservationNotSaved() {
  const [show, setShow] = useState(false);
  const reservationMessages = useSelector((state) => state.reservations.createReservationMessages);

  useEffect(() => {
    if (reservationMessages[0] === 'overlaps with existing reservation for the same contractor') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [reservationMessages]);

  const handleClick = () => {
    setShow(false);
  };

  return (
    <article className="reservation-notification">
      { show
        && (
          <section>
            <div>
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
            </div>
          </section>
        )}
    </article>
  );
}
