import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserReducer';
import contractorsReducer from './contractors/ContractorReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    contractors: contractorsReducer,
  },
});
