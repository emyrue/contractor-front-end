import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

export default function UserReservations() {
  const reservations = useSelector((state) => state.user.reservations);
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    dispatch(id);
  };

  return (
    <article>
      <h2>Reservations</h2>
      <ul>
        { reservations.map((oneReservation) => {
          const { reservation, contractor } = oneReservation;
          const { id, contractor_cancelled: cancelled, user_cancelled: hidden, approved } = reservation;
          let itemClassname = 'show';
          let cancelClassname = 'show';
          let clearClassname = 'hide';
          if (hidden) {
            itemClassname = 'hide';
          }
          if (cancelled) {
            cancelClassname = 'hide';
            clearClassname = 'show';
          }
          return (
            <li className={itemClassname} key={`reservation-${id}`}>
              <h6>{contractor.name}</h6>
              <div>
                {reservation.start_date.toString()}
                {' '}
                -
                {' '}
                {reservation.end_date.toString()}
              </div>
              <Button
                className={cancelClassname}
                onClick={handleCancel}
              >
                Cancel this reservation
              </Button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
