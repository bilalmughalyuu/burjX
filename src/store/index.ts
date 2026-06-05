import { configureStore } from '@reduxjs/toolkit';
import kycSlice from './slices/kycSlice';

const store = configureStore({
  reducer: {
    kyc: kycSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

