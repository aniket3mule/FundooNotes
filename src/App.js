import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Sidebar from './pages/Sidebar'

class App extends React.Component {
  render() {
    return (
        <Router>
          <Route path="/" component = {Home}/>
          <Route path="/signin" component = {SignIn}/>
          <Route path="/signup" component = {SignUp}/>
          <Route path="/forgetpassword" component = {ForgetPassword}/>
          <Route path="/resetpassword" component = {ResetPassword}/>
          <Route path="/Sidebar" component = {Sidebar}/>
        </Router>
    )
  }
}

export default App;
