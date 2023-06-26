import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { editUser } from '../redux/user/UserReducer';
import { deleteContractor } from '../redux/contractors/ContractorReducer';
import ContractorForm from './contractor_form';
import EditContractorForm from './edit_contractor';

export default function ContractorDetails() {
  const [contractorFormDisplay, setContractorFormDisplay] = useState(false);
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleClose = () => {
    setContractorFormDisplay(false);
    setEditFormDisplay(false);
  };

  const handleDelete = async () => {
    dispatch(editUser({
      is_contractor: false,
    }));
    dispatch(deleteContractor(userInfo.contractor.id));
  };

  return (
    <div>
      <ul>
        { userInfo.user.is_contractor
          && (
          <div>
            <li>
              Display name:
              {' '}
              {userInfo.contractor.name}
            </li>
            <li>
              Bio:
              {' '}
              {userInfo.contractor.bio}
            </li>
            <li>
              Rate: $
              {userInfo.contractor.rate}
              /hr
            </li>
            <li>
              <button onClick={() => setDeleteDisplay(true)} type="button">Delete Contractor Information</button>
            </li>
            <li>
              <button onClick={() => setEditFormDisplay(true)} type="button">Edit Contractor Information</button>
            </li>
            { deleteDisplay
              && (
              <div>
                <span>
                  Are you sure? This will delete all information
                  {' '}
                  regarding your status as a contractor,
                  {' '}
                  including reviews and reservations from clients.
                  {' '}
                  Reservations and reviews that you have made for other contractors
                  {' '}
                  will remain intact.
                </span>
                <div>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleDelete}
                  >
                    Yes, delete my information
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => setDeleteDisplay(false)}
                  >
                    No, do not delete my information
                  </Button>
                </div>
              </div>
              )}
          </div>
          )}
        { !userInfo.user.is_contractor
          && (
          <li>
            <button onClick={() => setContractorFormDisplay(true)} type="button">Register as a Contractor</button>
          </li>
          )}
        { contractorFormDisplay
          && (
          <ContractorForm handleClose={handleClose} />
          )}
        { editFormDisplay
          && (
          <EditContractorForm handleClose={handleClose} />
          )}
      </ul>
    </div>
  );
}
