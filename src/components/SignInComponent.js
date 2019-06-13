import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Label, Input, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    changeHandler = (e => {
        this.setState({ [e.target.name]: e.target.value })
    })

    submitHandler=(e =>{
        e.preventDefault()
        
        if (!this.state.email) {
            toast.error("email can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (!this.state.password) {
            toast.error("password can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }


        var data = {
            'email': this.state.email,
            'password': this.state.password
        }
    })

    signUpButton = (e => {
        e.preventDefault();
        this.props.history.push("/signup")
    })

    render() {
        const { email, password } = this.state;
        return (
            <Card color="light">
                <CardBody>
                    <CardTitle><h4>Sign in</h4></CardTitle>
                </CardBody>
                <CardImg width="120" height="125" src={require('../assets/img/signin.svg')} alt="sign in logo" />
                <CardBody>
                    {/* <center><CardTitle><h4>Sign in</h4></CardTitle></center> */}
                    <CardText>
                    <Label><i className="fa fa-envelope-o fa-fw" />
                        <strong>Email</strong> </Label>
                        <Input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={this.changeHandler} />
                        <Label><i className="fa fa-key fa-fw" /><strong>Password</strong> </Label>
                        <Input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={this.changeHandler} />
                        <Label></Label>
                        <center>
                            <Button outline color="info" className="text-uppercase" onClick={this.submitHandler}>Sign in</Button>
                            <Label />
                            <CardTitle>Don't have an Account?
                                <Button color="link" onClick={this.signUpButton}>
                                SIgn Up
                                </Button>
                            </CardTitle>
                        </center>
                    </CardText>
                </CardBody>
                <ToastContainer/>
            </Card>
        );
    }
}

export default withRouter(SignInComponent);