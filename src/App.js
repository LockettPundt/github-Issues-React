/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import IssueList from './components/IssueList';
import '../node_modules/bulma/css/bulma.css';
import IssueDetail from './components/IssueDetail';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={IssueList} />
        <Route path="/issues/:issue_number?" exact component={IssueDetail} />
      </Router>
    </div>
  );
}

export default App;
