import dayjs from 'dayjs';

export default function disableDates(date, contractor, reservationId = null) {
  const reservations = contractor.contractorReservations.filter(
    (reservation) => (
      reservation.approved
          && !reservation.user_cancelled
          && !reservation.contractor_cancelled
          && reservation.id !== reservationId
    ),
  );

  let disabled = false;

  reservations.map((reservation) => {
    if (((dayjs(reservation.start_date).isBefore(dayjs(date)))
      && dayjs(date).isBefore(reservation.end_date))
      || dayjs(date).isSame(reservation.start_date)
      || dayjs(date).isSame(reservation.end_date)) {
      disabled = true;
    }
    return disabled;
  });

  return disabled;
}
