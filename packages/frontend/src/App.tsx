import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Theme from './Theme';
import Layout from './Layout';

function App() {
  return (

    <div className="App">
      <Theme>
        <Router>
          <Route exact path = "/" component={Layout} />
        </Router>
      </Theme>
    </div>
  );
}

export default App;
