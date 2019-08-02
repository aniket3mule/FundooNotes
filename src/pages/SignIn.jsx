import React, {Component} from 'react';
import LoginComponent from '../components/LoginComponent';
// import { Container} from 'reactstrap'
// import SignInComponent from '../components/SignInComponent'

export default class  SignIn extends Component{
    render(){
        return(
            // <Container>
            //     <SignInComponent
            //     props ={this.props}
            //     />
            // </Container>
            <div>
                <LoginComponent
                props ={this.props}
                />
            </div>
        );
    }
}