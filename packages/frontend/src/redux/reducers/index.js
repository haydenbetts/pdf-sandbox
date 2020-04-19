import { combineReducers } from 'redux';
import pdfs from './pdfs';
import { connectRouter } from 'connected-react-router';
import { history } from '../../history';

export default combineReducers({
  pdfs,
  router: connectRouter(history)
});