import React, {Component} from 'react';
import { Container} from 'reactstrap'
import ResetPasswordComponent from '../components/ResetPasswordComponent'

export default class  ResetPassword extends Component{
    render(){
        return(
            <Container>
                <ResetPasswordComponent/>
            </Container>
        );
    }
}