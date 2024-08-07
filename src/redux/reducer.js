// src/redux/reducer.js
import { NEXT_CARD, PREV_CARD } from './actions';

const initialState = {
  startIndex: 0
};

const jobseekerReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_CARD:
      return {
        ...state,
        startIndex: (state.startIndex + 1) % 5  // Assume there are 5 jobseekers
      };
    case PREV_CARD:
      return {
        ...state,
        startIndex: (state.startIndex - 1 + 5) % 5
      };
    default:
      return state;
  }
};

export default jobseekerReducer;
