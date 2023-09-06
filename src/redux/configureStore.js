import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserReducer';
import contractorsReducer from './contractors/ContractorReducer';
import reservationsReducer from './reservations/ReservationsReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    contractors: contractorsReducer,
    reservations: reservationsReducer,
  },
  // devTools: false,
});
