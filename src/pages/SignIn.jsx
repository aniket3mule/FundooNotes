import React, {Component} from 'react';
import { Container} from 'reactstrap'
import SignInComponent from '../components/SignInComponent'

export default class  SignIn extends Component{
    render(){
        return(
            <Container>
                <SignInComponent
                props ={this.props}
                />
            </Container>
        );
    }
}