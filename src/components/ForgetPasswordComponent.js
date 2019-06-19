import React, { Component } from 'react';
import { Button, Label, Input, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Services from '../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import {withRouter} from 'react-router-dom';

const forgetPassService = new Services().forgetPassService;

class ForgetPasswordComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    changeHandler = (e => {
        this.setState({ [e.target.name]: e.target.value })
    })

    submitHandler = (e => {
        e.preventDefault()

        if (!this.state.email) {
            toast.error("email can not be empty", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            var data = {
                'email': this.state.email,
            }
            forgetPassService(data)
        }
    })

    signInButton = (e => {
        e.preventDefault();
        this.props.history.push("/signin")
    })

    render() {
        const { email } = this.state;
        return (
            <Card className="card-signin-signup" color="light">
                <CardBody>
                    <CardTitle><h4>Forget Password</h4></CardTitle>
                </CardBody>
                <CardImg width="120" height="125" src={require('../assets/img/signin.svg')} alt="sign up logo" />
                <CardBody>
                    {/* <center><CardTitle><h4>Sign in</h4></CardTitle></center> */}
                    <CardText>
                        <Label><i className="fa fa-envelope-o fa-fw fa-lg" />
                            <strong>Email</strong> </Label>
                        <Input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
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
                <ToastContainer />
            </Card>
        );
    }
}

export default withRouter(ForgetPasswordComponent);