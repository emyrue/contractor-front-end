import { useSelector } from 'react-redux';
import UserReservations from '../components/user/user_reservations';
import ContractorReservations from '../components/contractors/contractor_reservations';
import '../styles/reservationsPage.scss';

export default function ReservationsPage() {
  const user = useSelector((state) => state.user);

  return (
    <section className="reservations-page-section">
      <h1>Your Reservations</h1>
      <UserReservations />
      { user.contractor.id
        && <ContractorReservations /> }
    </section>
  );
}
