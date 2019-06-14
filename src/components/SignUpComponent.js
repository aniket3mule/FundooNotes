import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Label, Input, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Services from '../services/UserServices';
const userRegister = new Services().userRegister;

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPasswor: ''
        }
    }

    changeHandler = (e => {
        this.setState({ [e.target.name]: e.target.value })
    });

    signInButton = (e => {
        e.preventDefault();
        this.props.history.push("/signin")
    });

    submitHandler = (e => {
        e.preventDefault();
        if (!this.state.fname) {
            toast.error("first name can not be empty", {
                position: toast.POSITION.TOP_CENTER,
                className: 'rotateY animated'
            });
        }
        else if (!this.state.lname) {
            toast.error("last name can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (!this.state.email) {
            toast.error("Email can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (!this.state.password) {
            toast.error("password can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (!this.state.cpsw) {
            toast.error("password can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (this.state.password !== this.state.cpsw) {
            toast.error("Password and Confirm not matching", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            var data = {
                'fName': this.state.firstName,
                'lname': this.state.lastName,
                'email': this.state.email,
                'password': this.state.password,
                'cpsw': this.state.confirmPasswor
            }

            userRegister(data);
        }
    })

    render() {
        const { firstName, lastName, email, password, confirmPasswor } = this.state;
        return (
            <Card>
                <CardBody>
                    <CardTitle><h4>Registration Form</h4></CardTitle>
                </CardBody>
                <CardImg width="120" height="125" src={require('../assets/img/signin.svg')} alt="sign up logo" />
                <CardBody>
                    <CardText>
                        <Label>
                            <i className="fa fa-user-o fa-fw fa-lg" />
                            <strong>First Name</strong>
                        </Label>
                        <Input
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            value={firstName}
                            onChange={this.changeHandler} />
                        <Label>
                            <i className="fa fa-user-o fa-fw fa-lg" />
                            <strong>Last Name</strong>
                        </Label>
                        <Input
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={this.changeHandler} />
                        <Label>
                            <i className="fa fa-envelope-o fa-fw fa-lg" />
                            <strong>Email</strong>
                        </Label>
                        <Input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={this.changeHandler} />
                        <Label><i className="fa fa-key fa-fw fa-lg" /><strong>Password</strong> </Label>
                        <Input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={this.changeHandler} />
                        <Label></Label>
                        <Label><i className="fa fa-key fa-fw fa-lg" /><strong>Confirm Password</strong> </Label>
                        <Input
                            type='password'
                            name='confirmPasswor'
                            placeholder='Confirm Password'
                            value={confirmPasswor}
                            onChange={this.changeHandler} />
                        <Label></Label>
                        <center>
                            <Button 
                            outline 
                            color="info" 
                            className="text-uppercase" 
                            onClick={this.submitHandler}>
                            Sign up
                            </Button>
                            <Label />
                            <CardTitle>Already have an Account?
                                <Button color="link" onClick={this.signInButton}>
                                    Sign in
                                </Button>
                            </CardTitle>
                        </center>
                    </CardText>
                </CardBody>
                <ToastContainer />
            </Card>
        );
    }
}
export default withRouter(SignUp)