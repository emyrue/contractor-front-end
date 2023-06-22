import { useSelector } from 'react-redux';

export default function AccountPage() {
  const userInfo = useSelector((state) => state.user);

  return (
    <section>
      { !userInfo.user.name
        && <h1>Please log in to view your account details.</h1>}
      { userInfo.user.name
        && (
        <section>
          <h1>My Account</h1>
          <ul>
            <li>
              Name:
              {' '}
              {userInfo.user.name}
            </li>
            <li>
              Email:
              {' '}
              {userInfo.user.email}
            </li>
            { !userInfo.user.isContractor
              && (
              <li>
                <button type="button">Set up Contractor Profile</button>
              </li>
              )}
          </ul>
        </section>
        )}
    </section>
  );
}
