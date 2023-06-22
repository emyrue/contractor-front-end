import { useSelector } from 'react-redux';

export default function Nav() {
  const userInfo = useSelector((state) => state.user);
  return (
    <nav>
      <a href="/">Home</a>
      { !userInfo.user.name
        && <a href="/signup">Sign up</a>}
      { !userInfo.user.name
        && <a href="/login">Log in</a>}
    </nav>
  );
}
