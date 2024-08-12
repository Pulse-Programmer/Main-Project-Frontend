// src/redux/store.js

import jobseekerReducer from './reducer';
import { createStore } from'redux';


const store = createStore(jobseekerReducer);

export default store;
