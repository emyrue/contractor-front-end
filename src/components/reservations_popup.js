import {
  TextField, Button,
} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import { PropTypes } from "@mui/material";

export default function ReservationsPopup(props) {
  const { contractorId } = props;

  return (
    <article>
      <form>

      </form>
    </article>
  );
}

ReservationsPopup.propTypes = {
  contractorId: PropTypes.number.isRequired,
};
