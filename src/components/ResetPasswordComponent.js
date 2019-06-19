import React, { Component } from 'react';
import { Button, Label, Input, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Services from '../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {withRouter} from 'react-router-dom';
const resetPasswordService = new Services().resetPasswordService;

class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: ''
        }
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    };
    signInButton = ( e => {
        this.props.history.push('/signin')

    })
    submitHandler = e => {
        e.preventDefault();
        if (!this.state.password) {
            toast.error("password can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (!this.state.confirmPassword) {
            toast.error("confirm password can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else if (this.state.password !== this.state.confirmPassword) {
            toast.error("Password mismatch", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            var data = {
                'password': this.state.password,
                'confirmPassword': this.state.confirmPassword
            }
            const url = window.location.pathname;
            const token = url.substring(15);
            console.log("token :", token);

            resetPasswordService(data, token);
        }
    }
    render() {
        const { password, confirmPassword } = this.state;
        return (
            <Card className="card-signin-signup" color="light">
                <CardBody>
                    <CardTitle><h4>Forget Password</h4></CardTitle>
                </CardBody>
                <CardImg width="120" height="125" src={require('../assets/img/signin.svg')} alt="sign up logo" />
                <CardBody>
                    {/* <center><CardTitle><h4>Sign in</h4></CardTitle></center> */}
                    <CardText>
                        <Label><i className="fa fa-key fa-fw fa-lg" />
                            <strong>Password</strong> </Label>
                        <Input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={this.changeHandler} />
                        <Label><i className="fa fa-key fa-fw fa-lg" />
                            <strong>Confirm Password</strong> </Label>
                        <Input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={this.changeHandler} />
                             <Label></Label>
                        <center>
                            <Button outline color="info" className="text-uppercase" onClick={this.submitHandler}>Submit</Button>
                            <CardTitle>
                                <Label ></Label>
                                <Button color="link" onClick={this.signInButton}>
                                    Sign in Here
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

export default withRouter(ResetPasswordComponent);