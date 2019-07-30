import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import UserDashboard from './pages/UserDashboard'
import EditorQnAComponent from './pages/QnAEditor';
import Reminder from './pages/Reminder';
import Archive from './pages/Archive';
import Trash from './pages/Trash';
import GetNotesListByLabel from './pages/GetNotesListByLabel';
import NewNoteDemo from './pages/NewNoteDemo';

//import AppBar from './components/DashboardComponent'


class App extends React.Component {
  render() {
    return (
        <Router>
          {/* <Route path="/" component = {Home}/> */}
          <Route path="/signin" component = {SignIn}/>
          <Route path="/signup" component = {SignUp}/>
          <Route path="/forgetpassword" component = {ForgetPassword}/>
          <Route path="/resetpassword" component = {ResetPassword}/>
          <Route path="/dashboard" component = {UserDashboard}/>
          <Route path="/questionanswer" component = {EditorQnAComponent}/>
          <Route path="/reminder" component = {Reminder}/>
          <Route path="/archive" component = {Archive}/>
          <Route path="/trash" component = {Trash}/>
          <Route path="/usernote" component = {GetNotesListByLabel}/>
          <Route path="/notes" component = {NewNoteDemo}/>
        </Router>
    )
  }
}

export default App;
