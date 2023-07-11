import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/user/UserReducer';

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
      <a href="/">Home</a>
      { !userInfo.user.name
        && <a href="/signup">Sign up</a>}
      { !userInfo.user.name
        && <a href="/login">Log in</a>}
      { userInfo.user.name
        && <a href="/my_account">Account</a>}
      { userInfo.user.name
        && <button onClick={handleClick} type="button">Log out</button>}
    </nav>
  );
}
