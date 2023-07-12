import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PropTypes } from 'prop-types';
import disableDates from '../../modules/disableDates';

export default function EditReservation(props) {
  const { id } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const userId = useSelector((state) => state.user.user.id);
  const contractor = useSelector((state) => state.contractors);

  return (
    <article>
      <h2>Edit reservation dates</h2>
      <form>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(startDate)}
            onChange={(newValue) => setStartDate(newValue)}
            label="Start Date"
            shouldDisableDate={(date) => disableDates(date, contractor)}
            disablePast
          />
          <DatePicker
            value={dayjs(endDate)}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
            label="End Date"
            shouldDisableDate={(date) => disableDates(date, contractor)}
            disablePast
          />
        </LocalizationProvider>
      </form>
    </article>
  );
}

EditReservation.propTypes = {
  id: PropTypes.number.isRequired,
};
