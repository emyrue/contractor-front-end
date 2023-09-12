import { useState } from 'react';
import { useSelector } from 'react-redux';
import EditUserPopup from './edit_user';
import ContractorForm from '../contractors/contractor_form';

export default function UserDetails() {
  const [nameFormDisplay, setNameFormDisplay] = useState(false);
  const [contractorFormDisplay, setContractorFormDisplay] = useState(false);
  const userInfo = useSelector((state) => state.user);

  const handleClose = () => {
    setNameFormDisplay(false);
    setContractorFormDisplay(false);
  };

  return (
    <div>
      <ul>
        <li>
          <img src={userInfo.user.picture_link} alt="profile" />
        </li>
        <li>
          Username:
          {' '}
          {userInfo.user.name}
          {' '}
          <button onClick={() => setNameFormDisplay(true)} type="button">Edit</button>
        </li>
        <li>
          Email:
          {' '}
          {userInfo.user.email}
        </li>
      </ul>
      { nameFormDisplay
        && <EditUserPopup handleClose={handleClose} />}
      { contractorFormDisplay
        && <ContractorForm handleClose={handleClose} />}
    </div>
  );
}
