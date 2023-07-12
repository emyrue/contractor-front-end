import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PropTypes } from 'prop-types';

export default function EditReservation(props) {
  const { id } = props;

  return (
    <article>
      <h2>Edit reservation dates</h2>
      <form>
        <LocalizationProvider dateAdapter={AdapterDayjs} />
      </form>
    </article>
  );
}

EditReservation.propTypes = {
  id: PropTypes.number.isRequired,
};
