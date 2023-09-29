import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PropTypes } from 'prop-types';
import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';
import { editReservation } from '../../redux/reservations/ReservationsReducer';
import disableDates from '../../modules/disableDates';
import '../../styles/editReservationForm.scss';

export default function EditReservation(props) {
  const {
    id, startingDate, endingDate, jobDescription, handleClose, myClassName,
  } = props;
  const [startDate, setStartDate] = useState(startingDate);
  const [endDate, setEndDate] = useState(endingDate);
  const [editJobDescription, setEditJobDescription] = useState(jobDescription);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const contractor = useSelector((state) => state.contractors);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
  }, []);

  const handleSubmit = () => {
    if (
      startingDate !== startDate
      || endingDate !== endDate
      || jobDescription !== editJobDescription
    ) {
      dispatch(editReservation({
        id,
        start_date: startDate,
        end_date: endDate,
        job_description: editJobDescription,
        approved: false,
      }));
    }
  };

  return (
    <article className={myClassName}>
      <h2>Edit reservation</h2>
      <form onSubmit={handleSubmit}>
        { dimensions.width >= 500
          && (
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
          )}
        { dimensions.width < 500
          && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              value={dayjs(startDate)}
              onChange={(newValue) => setStartDate(newValue)}
              label="Start Date"
              shouldDisableDate={(date) => disableDates(date, contractor, id)}
              disablePast
            />
            <MobileDatePicker
              value={dayjs(endDate)}
              onChange={(newValue) => setEndDate(newValue)}
              minDate={startDate}
              label="End Date"
              shouldDisableDate={(date) => disableDates(date, contractor, id)}
              disablePast
            />
          </LocalizationProvider>
          )}
        <TextareaAutosize
          value={editJobDescription}
          onChange={(e) => setEditJobDescription(e.target.value)}
        />
        <Button
          type="submit"
        >
          Submit changes
        </Button>
        <Button
          onClick={handleClose}
        >
          Close
        </Button>
      </form>
    </article>
  );
}

EditReservation.propTypes = {
  id: PropTypes.number.isRequired,
  startingDate: PropTypes.string.isRequired,
  endingDate: PropTypes.string.isRequired,
  jobDescription: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  myClassName: PropTypes.string.isRequired,
};
