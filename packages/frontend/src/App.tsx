import React from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import Theme from './Theme';
import Layout from './Layout';
import { store } from './index';
import { history } from './history';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Theme>
          <ConnectedRouter history={history}>
            <Route exact path = "/" component={Layout} />
            <Route path = "/:id" component={Layout} />
          </ConnectedRouter>
        </Theme>
      </Provider>
    </div>
  );
}

export default App;
