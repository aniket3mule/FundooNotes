import React, {Component} from 'react';
import DashboardComponent from '../components/DashboardComponent'
import CreateNote from '../components/CreateNote';
import AllNotes from '../components/GetAllNotes'
import {withRouter} from 'react-router-dom'

 class  UserDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    render(){
        if(localStorage.getItem('token1') !== "true"){
            return(
                // this.props.history.push('signin')
              window.location.href = 'signin'
            )
          }
          else{
        return(
            <>
                <DashboardComponent/>
                <CreateNote/>
                <AllNotes/>
            </>
           
        );
          }
    }
}

export default withRouter(UserDashboard);