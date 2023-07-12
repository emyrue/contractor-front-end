import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PropTypes } from 'prop-types';
import { TextareaAutosize } from '@mui/base';
import disableDates from '../../modules/disableDates';

export default function EditReservation(props) {
  const { id, startingDate, endingDate, jobDescription } = props;
  const [startDate, setStartDate] = useState(startingDate);
  const [endDate, setEndDate] = useState(endingDate);
  const [editJobDescription, setEditJobDescription] = useState(jobDescription);
  const userId = useSelector((state) => state.user.user.id);
  const contractor = useSelector((state) => state.contractors);
  const dispatch = useDispatch();

  return (
    <article>
      <h2>Edit reservation dates</h2>
      <form>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(startDate)}
            onChange={(newValue) => setStartDate(newValue)}
            label="Start Date"
            shouldDisableDate={(date) => disableDates(date, contractor, id)}
            disablePast
          />
          <DatePicker
            value={dayjs(endDate)}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
            label="End Date"
            shouldDisableDate={(date) => disableDates(date, contractor, id)}
            disablePast
          />
        </LocalizationProvider>
        <TextareaAutosize
          value={editJobDescription}
          onChange={setEditJobDescription}
        />
      </form>
    </article>
  );
}

EditReservation.propTypes = {
  id: PropTypes.number.isRequired,
  startingDate: PropTypes.string.isRequired,
  endingDate: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
};
