import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import userReducer from './Userslice';

const userPersistConfig = {
  key: 'user',
  storage,
};



export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
  },
  
});


export const PersistStore = persistStore(store);