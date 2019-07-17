import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, Label, Input, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import Services from '../services/UserServices';
const loginService = new Services().loginService;

const url = "http://34.213.106.173/"
class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        // this.inputRef = React.createRef();
        // this.cbRef = null;
        // this.setCbRef = element =>{
        //     this.cbRef = element
        // }
    }

    componentDidMount(){
        // if(this.cbRef){
        //     this.cbRef.focus();
        // }
        // this.inputRef.current.focus()
        // console.log("Ref", this.inputRef)
        
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
        
        loginService(data)
        .then(response => {
            console.log(response);
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);
            localStorage.setItem('token', response.data.id);
            localStorage.setItem('token1',true);
            localStorage.setItem('userid',response.data.userId);
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('ProfileImage', url+response.data.imageUrl)
            this.props.history.push('/dashboard');
        })
        .catch(error => {
            console.log(error);
            toast.error("Invalid username or Password", {
                position: toast.POSITION.TOP_CENTER
            });
        })
    })

    signUpButton = (e => {
        e.preventDefault();
        this.props.history.push("/signup")
    })
    forgetPasswordButton =(e =>{
        e.preventDefault();
        this.props.history.push("/forgetpassword")
    })

    render() {
        const { email, password } = this.state;
        return (
            <Card className="card-signin-signup" color="light">
                <CardBody>
                    <CardTitle><h4>Sign in</h4></CardTitle>
                </CardBody>
                <CardImg width="120" height="125" src={require('../assets/img/signin.svg')} alt="sign up logo" />
                <CardBody>
                    <div>
                    <Label><i className="fa fa-envelope-o fa-fw fa-lg" />
                        <strong>Email</strong> </Label>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                            value={email}
                            onChange={this.changeHandler}
                            />
                            
                        <Label><i className="fa fa-key fa-fw fa-lg" /><strong>Password</strong> </Label>
                        <Input
                            type='password'
                            name='password'
                            id='password'
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
                            <CardTitle>Forget Password?
                                <Button color="link" onClick={this.forgetPasswordButton}>
                                Click Here
                                </Button>
                            </CardTitle>
                        </center>
                    </div>
                </CardBody>
                <ToastContainer/>
            </Card>
        );
    }
}

export default 
withRouter(
    SignInComponent
    );