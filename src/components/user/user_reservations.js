import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function UserReservations() {
  const reservations = useSelector((state) => state.user.reservations);
  const dispatch = useDispatch();

  return (
    <article>
      <h2>Reservations</h2>
      <ul>
        { reservations.map(() => (
          <li>
            <h6></h6>
          </li>
        ))}
      </ul>
    </article>
  );
}
