import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserReducer';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
