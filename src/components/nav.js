import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { userLogout } from '../redux/user/UserReducer';
import '../styles/nav.scss';

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileHide, setMobileHide] = useState('mobile-hide');
  const userInfo = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(userLogout());
    navigate('/');
  };

  const handleMenuButton = () => {
    if (mobileHide === 'mobile-hide') {
      setMobileHide('mobile-show');
    } else {
      setMobileHide('mobile-hide');
    }
  };

  return (
    <nav>
      <button className="menu-button desktop-hide" type="button" onClick={handleMenuButton}>
        <img alt="menu-icon" src="" />
      </button>
      <div className={mobileHide}>
        <Link
          href="/"
          underline="hover"
        >
          Contractors
        </Link>
        <Link
          href="/cloudinary"
          underline="hover"
        >
          Cloudinary
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
        <button className="close desktop-hide" type="button" onClick={handleMenuButton}>
          <img alt="close" src="" />
        </button>
      </div>
    </nav>
  );
}
