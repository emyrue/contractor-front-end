import { useState } from 'react';
import { useSelector } from 'react-redux';
import EditNamePopup from './edit_name';

export default function UserDetails() {
  const [nameFormDisplay, setNameFormDisplay] = useState(false);
  const userInfo = useSelector((state) => state.user);

  const handleClose = () => {
    setNameFormDisplay(false);
  };

  return (
    <div>
      <ul>
        <li>
          Name:
          {' '}
          {userInfo.user.name}
          <button onClick={() => setNameFormDisplay(true)} type="button">Edit</button>
        </li>
        <li>
          Email:
          {' '}
          {userInfo.user.email}
        </li>
        { !userInfo.user.isContractor
        && (
        <li>
          <a href="/">Register as a Contractor</a>
        </li>
        )}
      </ul>
      { nameFormDisplay
        && <EditNamePopup handleClose={handleClose} />}
    </div>
  );
}
