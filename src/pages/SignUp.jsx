import React, {Component} from 'react';
import RegistrationComponent from '../components/RegistrationComponent';

export default class  SignUp extends Component{
    render(){
        return(
            // <Container>
            //     <SignUpComponent
            //      props ={this.props}
            //     />
            // </Container>
            <div>
                <RegistrationComponent
                props ={this.props}
                />
            </div>
        );
    }
}