import { useSelector } from 'react-redux';

export default function UserDetails() {
  const userInfo = useSelector((state) => state.user);

  return (
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
      <li>
        <button type="button">Edit User Details</button>
      </li>
      { !userInfo.user.isContractor
        && (
        <li>
          <button type="button">Register as a Contractor Here</button>
        </li>
        )}
    </ul>
  );
}
