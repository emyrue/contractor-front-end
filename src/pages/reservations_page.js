import { useSelector } from 'react-redux';
import UserReservations from '../components/user/user_reservations';
import ContractorReservations from '../components/contractors/contractor_reservations';

export default function ReservationsPage() {
  const user = useSelector((state) => state.user);

  return (
    <section>
      <h1>Your Reservations</h1>
      <UserReservations />
      { user.contractor.name
        && <ContractorReservations /> }
    </section>
  );
}
