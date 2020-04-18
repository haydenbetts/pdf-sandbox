import { CREATE_PDF } from '../constants/ActionTypes';
export default (state = {}, action) => {
  switch(action.type) {
    case CREATE_PDF:
      return action.payload;
    default:
      return state;
  }
};