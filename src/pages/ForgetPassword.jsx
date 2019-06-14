import React, {Component} from 'react';
import { Container} from 'reactstrap'
import ForgetPasswordComponent from '../components/ForgetPasswordComponent'

export default class  ForgetPassword extends Component{
    render(){
        return(
            <Container>
                <ForgetPasswordComponent/>
            </Container>
        );
    }
}