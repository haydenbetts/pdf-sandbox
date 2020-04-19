import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import { persistLocalState } from './redux/middleware';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';

import { history } from './history';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composedEnhancers = compose(
    applyMiddleware(reduxThunk, persistLocalState, routerMiddleware(history))
)

export const store = createStore(reducers, {}, composedEnhancers);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
