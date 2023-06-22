import { useSelector } from 'react-redux';
import UserDetails from '../components/user_details';
import ContractorDetails from '../components/contractor_details';

export default function AccountPage() {
  const userInfo = useSelector((state) => state.user);

  return (
    <section>
      { !userInfo.user.name
        && <h1>Please log in to view your account details.</h1>}
      { userInfo.user.name
        && <UserDetails />}
      { userInfo.user.isContractor
        && <ContractorDetails />}
    </section>
  );
}
