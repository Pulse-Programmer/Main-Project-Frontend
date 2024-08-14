// src/redux/reducer.js
import { NEXT_CARD, PREV_CARD } from './actions';

const initialState = {
  startIndex: 0,
  itemsPerPage: 3,
  totalItems: 6, // Adjust based on your actual data length or make it dynamic
};

const jobseekerReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_CARD:
      return {
        ...state,
        startIndex: Math.min(state.startIndex + state.itemsPerPage, state.totalItems - state.itemsPerPage),
      };
    case PREV_CARD:
      return {
        ...state,
        startIndex: Math.max(state.startIndex - state.itemsPerPage, 0),
      };
    default:
      return state;
  }
};

export default jobseekerReducer;