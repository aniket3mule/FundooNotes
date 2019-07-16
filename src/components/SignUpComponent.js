import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Label, Input, Card, CardImg, CardText, CardBody, CardTitle, FormGroup } from 'reactstrap';
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
            selectedOption: 'Advance'
        }

        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    changeHandler = (e => {
        this.setState({ [e.target.name]: e.target.value })
    });

    handleOptionChange = (e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.selectedOption);

    })


    signInButton = (e => {
        e.preventDefault();
        this.props.history.push("/signin")
    });


    submitHandler = (e => {
        e.preventDefault();
        if (!this.state.firstName) {
            toast.error("first name can not be empty", {
                position: toast.POSITION.TOP_CENTER,
                className: 'rotateY animated'
            });
        }
        else if (!this.state.lastName) {
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
        else if (!this.state.confirmPassword) {
            toast.error("password can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (this.state.password !== this.state.confirmPassword) {
            toast.error("Password and Confirm not matching", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            var data = {
                'firstName': this.state.firstName,
                'lastName': this.state.lastName,
                'service': this.state.selectedOption,
                'email': this.state.email,
                'password': this.state.password

            }
            userRegister(data);
        }
    })

    render() {
        const { firstName, lastName, email, password, confirmPassword } = this.state;
        return (
            <Card className="card-signin-signup">
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

                        <FormGroup tag="fieldset">
                            <Label><i className="fa fa-user-o fa-fw fa-lg" /><strong>Service</strong> </Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio"
                                        name="selectedOption"
                                        value="Advance"
                                        checked={this.state.selectedOption === "Advance"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Advance
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio"
                                        name="selectedOption"
                                        value="Basic"
                                        checked={this.state.selectedOption === "Basic"}
                                        onChange={this.handleOptionChange}
                                    />
                                    Basic
                                </Label>
                            </FormGroup>
                        </FormGroup>

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
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={this.changeHandler} />

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