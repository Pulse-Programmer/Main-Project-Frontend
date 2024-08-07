// src/redux/store.js
import { createStore } from 'redux';
import jobseekerReducer from './reducer';

const store = createStore(jobseekerReducer);

export default store;
