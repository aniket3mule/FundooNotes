import React, {Component} from 'react';
import SignUpComponent from '../components/SignUpComponent'
import {Container} from 'reactstrap'

export default class  SignUp extends Component{
    render(){
        return(
            <Container>
                <SignUpComponent/>
            </Container>
        );
    }
}