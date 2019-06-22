import React, {Component} from 'react';
import HomePage from '../components/HomeComponent';
import SignInComponent from '../components/SignInComponent';
import {Container} from 'reactstrap'

export default class Home extends Component{
    render(){
        return(
            <div>
                <HomePage/>
                <Container>
                <SignInComponent/>
                </Container>
            </div>
        )
    }
}