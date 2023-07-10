import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createReservation } from '../redux/reservations/ReservationsReducer';

export default function ReservationsPopup() {
  const userId = useSelector((state) => state.user.user.id);
  const contractor = useSelector((state) => state.contractors.contractorDetails);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation({
      reservation: {
        user_id: userId,
        contractor_id: contractor.id,
        job_description: jobDescription,
        start_date: startDate,
        end_date: endDate,
      },
    }));
  };

  return (
    <article>
      <h2>Make a Reservation</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            id="job_description"
            placeholder="Job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(startDate)}
              onChange={(newValue) => setStartDate(newValue)}
              label="Start Date"
              disablePast
            />
            <DatePicker
              value={dayjs(endDate)}
              onChange={(newValue) => setEndDate(newValue)}
              minDate={startDate}
              label="End Date"
              disablePast
            />
          </LocalizationProvider>
          <Button
            type="submit"
            variant="outlined"
          >
            Make Reservation
          </Button>
        </form>
        <p>{errorMessage}</p>
      </div>
    </article>
  );
}
