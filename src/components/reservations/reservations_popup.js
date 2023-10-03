import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createReservation } from '../../redux/reservations/ReservationsReducer';
import disableDates from '../../modules/disableDates';

export default function ReservationsPopup(props) {
  const { setNewReservation } = props;
  const userId = useSelector((state) => state.user.user.id);
  const contractor = useSelector((state) => state.contractors);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [jobDescription, setJobDescription] = useState('');
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

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
    setNewReservation(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
  }, []);

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
        { dimensions.width >= 602
          && (
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
          )}
        { dimensions.width < 602
          && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              value={dayjs(startDate)}
              onChange={(newValue) => setStartDate(newValue)}
              label="Start Date"
              shouldDisableDate={(date) => disableDates(date, contractor)}
              disablePast
            />
            <MobileDatePicker
              value={dayjs(endDate)}
              onChange={(newValue) => setEndDate(newValue)}
              minDate={startDate}
              label="End Date"
              shouldDisableDate={(date) => disableDates(date, contractor)}
              disablePast
            />
          </LocalizationProvider>
          )}
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
  setNewReservation: PropTypes.func.isRequired,
};
