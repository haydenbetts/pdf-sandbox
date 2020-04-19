import { SET_HTML, SET_CSS, SET_CREATING_PDF, FETCH_PDF_SUCCESS, SET_FETCHING_PDF, SET_NAME, SET_JSON } from '../constants/ActionTypes';

export default (state = {html: '', css: '', json: '{}', filenames: {pdf: 'untitled.pdf'}, name: 'Untitled Project'}, action) => {
  switch(action.type) {
    case SET_HTML:
      return {...state, html: action.payload}
    case SET_CSS:
      return {...state, css: action.payload}
    case SET_CREATING_PDF:
      return {...state, saving: true};
    case FETCH_PDF_SUCCESS: 
      return {...state, 
        fetching: false, 
        saving: false, 
        html: action.payload.data().html, 
        css: action.payload.data().css, 
        pdf: action.payload, 
        json: action.payload.data().json ? action.payload.data().json : '{}',
        name: action.payload.data().name};
    case SET_FETCHING_PDF: 
      return {...state, fetching: true};
    case SET_NAME:
      return {...state, name: action.payload}
    case SET_JSON:
      return {...state, json: action.payload}
    default:
      return state;
  }
};