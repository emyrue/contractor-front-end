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
              <Button
                onClick={() => setEditFormDisplay(true)}
                type="button"
                variant="outlined"
              >
                Edit Contractor Information
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setDeleteDisplay(true)}
                type="button"
                variant="outlined"
              >
                Delete Contractor Information
              </Button>
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
