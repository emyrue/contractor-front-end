import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button } from '@mui/material';
import { deleteContractor } from '../../redux/contractors/ContractorReducer';
import '../../styles/deleteAccount.scss';

export default function AdminDeleteContractor(props) {
  const { contractorId, handleClose } = props;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(deleteContractor(contractorId));
  };

  return (
    <article className="delete-account-article">
      <section>
        <h2>Are You Sure?</h2>
        <p>
          This will delete all of this contractor&apos;s
          {' '}
          information, including reservations and reviews.
          {' '}
          Are you sure you wish to delete this contractor?
        </p>
        <form onSubmit={handleSubmit}>
          <Button
            variant="outlined"
            type="submit"
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
          >
            Don&apos;t Delete
          </Button>
        </form>
      </section>
    </article>
  );
}

AdminDeleteContractor.propTypes = {
  contractorId: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
