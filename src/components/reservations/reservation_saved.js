import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

export default function ReservationSaved() {
  const [show, setShow] = useState(false);
  const reservationMessages = useSelector((state) => state.reservations.createReservationMessages);

  useEffect(() => {
    if (reservationMessages[0] === 'Reservation created successfully.') {
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
          </div>
        </section>
        )}
    </article>
  );
}
