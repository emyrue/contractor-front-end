import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { userLogout } from '../redux/user/UserReducer';

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <nav>
      <Link
        href="/"
        underline="hover"
      >
        Contractors
      </Link>
      { !userInfo.user.name
        && (
        <Link
          href="/signup"
          underline="hover"
        >
          Sign up
        </Link>
        )}
      { !userInfo.user.name
        && (
        <Link
          href="/login"
          underline="hover"
        >
          Log in
        </Link>
        )}
      { userInfo.user.role === 'admin'
        && (
          <Link
            href="/users"
            underline="hover"
          >
            View Users
          </Link>
        )}
      { userInfo.user.name
        && (
        <Link
          href="/my_account"
          underline="hover"
        >
          My Account
        </Link>
        )}
      { userInfo.user.name
        && (
        <Link
          href="/my_reservations"
          underline="hover"
        >
          My Reservations
        </Link>
        )}
      { userInfo.user.name
        && <button onClick={handleClick} type="button">Log out</button>}
    </nav>
  );
}
