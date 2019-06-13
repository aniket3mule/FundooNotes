import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component = {Home}/>
          <Route path="/signin" component = {SignIn}/>
          <Route path="/signup" component = {SignUp}/>
        </Router>
      </div>
    )
  }
}

export default App;
