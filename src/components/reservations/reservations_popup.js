import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createReservation } from '../../redux/reservations/ReservationsReducer';

export default function ReservationsPopup(props) {
  const { setClassname } = props;
  const userId = useSelector((state) => state.user.user.id);
  const contractor = useSelector((state) => state.contractors);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation({
      reservation: {
        user_id: userId,
        contractor_id: contractor.contractorDetails.id,
        job_description: jobDescription,
        start_date: startDate,
        end_date: endDate,
      },
    }));
    setClassname('hide');
  };

  const isDisabled = (date) => {
    const reservations = contractor.contractorReservations.filter(
      (reservation) => reservation.reservation.approved,
    );

    let disabled = false;

    reservations.map((reservation) => {
      if (((dayjs(reservation.reservation.start_date).isBefore(dayjs(date)))
      && dayjs(date).isBefore(reservation.reservation.end_date))
      || dayjs(date).isSame(reservation.reservation.start_date)
      || dayjs(date).isSame(reservation.reservation.end_date)) {
        disabled = true;
      }
      return disabled;
    });

    return disabled;
  };

  return (
    <article>
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <TextareaAutosize
          id="job_description"
          placeholder="Job description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(startDate)}
            onChange={(newValue) => setStartDate(newValue)}
            label="Start Date"
            shouldDisableDate={isDisabled}
            disablePast
          />
          <DatePicker
            value={dayjs(endDate)}
            onChange={(newValue) => setEndDate(newValue)}
            minDate={startDate}
            label="End Date"
            shouldDisableDate={isDisabled}
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
    </article>
  );
}

ReservationsPopup.propTypes = {
  setClassname: PropTypes.func.isRequired,
};
