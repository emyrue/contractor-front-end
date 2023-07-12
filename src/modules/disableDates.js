import dayjs from 'dayjs';

export default function disableDates(date, contractor, reservationId = null) {
  const reservations = contractor.contractorReservations.filter(
    (reservation) => (
      reservation.reservation.approved
          && !reservation.reservation.user_cancelled
          && !reservation.reservation.contractor_cancelled
          && reservation.reservation.id !== reservationId
    ),
  );

  let disabled = false;

  reservations.map((reservation) => {
    if (((dayjs(reservation.reservation.start_date).isBefore(dayjs(date)))
      && dayjs(date).isBefore(reservation.reservation.end_date))
      || dayjs(date).isSame(reservation.reservation.start_date)
      || dayjs(date).isSame(reservation.reservation.end_date)) {
      disabled = true;
    }
    return disabled;
  });

  return disabled;
}
