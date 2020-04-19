import { SET_HTML, SET_CSS, SET_CREATING_PDF, FETCH_PDF_SUCCESS, SET_FETCHING_PDF } from '../constants/ActionTypes';

export default (state = {html: '', css: ''}, action) => {

  console.log('action', action.type);
  switch(action.type) {
    case SET_HTML:
      console.log('action', action)
      return {...state, html: action.payload}
    case SET_CSS:
      return {...state, css: action.payload}
    case SET_CREATING_PDF:
      return {...state, saving: true};
    case FETCH_PDF_SUCCESS: 
      return {...state, fetching: false, saving: false, html: action.payload.data().html, css: action.payload.data().css, pdf: action.payload};
    case SET_FETCHING_PDF: 
      return {...state, fetching: true};
    default:
      return state;
  }
};