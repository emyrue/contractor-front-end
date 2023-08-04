import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import UserDetails from '../components/user/user_details';
import ContractorDetails from '../components/contractors/contractor_details';

export default function AccountPage() {
  const userInfo = useSelector((state) => state.user);

  return (
    <section>
      { userInfo.isLoading
        && <h1>Loading...</h1>}
      { (!userInfo.user.name && !userInfo.isLoading)
        && <h1>Please log in to view your account details.</h1>}
      { userInfo.user.name
        && <UserDetails />}
      { userInfo.user.name
        && <ContractorDetails />}
      { userInfo.user.role === 'admin'
        && (
          <Link
            href="/users"
            underline="hover"
          >
            View Users
          </Link>
        )}
    </section>
  );
}
