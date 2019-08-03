import React, { Component } from 'react'
import { Container, TextField, Typography, Button } from '@material-ui/core';
import UserService from "../services/UserServices";
import ShoppingComponent from './ShoppingComponent';

const UserServices = new UserService();
const url = "http://34.213.106.173/";
export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCreateAccount = () => {
        this.props.props.history.push("/")
    }

    handleSignIn = (e) => {
        
        e.preventDefault();
        var data = {
            'email': this.state.email,
            'password': this.state.password
        }

        UserServices.loginService(data)
            .then(response => {
                console.log(response);
                localStorage.setItem('firstName', response.data.firstName);
                localStorage.setItem('lastName', response.data.lastName);
                localStorage.setItem('token', response.data.id);
                localStorage.setItem('token1', true);
                localStorage.setItem('userid', response.data.userId);
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('ProfileImage', url + response.data.imageUrl)
                console.log("this.props", this);
                this.props.props.history.push('/dashboard');
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        var cssColor = '', cartId = '';
        if (this.props.history.location.state !== undefined) {
            cssColor = "orange";
            cartId = this.props.history.location.state.cartId;
        }
        const { email, password } = this.state;
        return (
            <Container>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "6%" }}>
                    <div className="new-login">
                        <div style={{ fontSize: "1.6rem", padding: "1%", textAlign: "center", fontWeight: "bolder", fontFamily: "sarif" }}>
                            <span style={{ color: "blue" }}>F</span>
                            <span style={{ color: "#f28b81" }}>u</span>
                            <span style={{ color: "orange" }}>n</span>
                            <span style={{ color: "blue" }}>d</span>
                            <span style={{ color: "green" }}>o</span>
                            <span style={{ color: "#f28b81" }}>o</span>
                            <Typography variant="h5" component="div" style={{ padding: "1%" }}>
                                {"Sign in"}
                            </Typography >

                            <Typography variant="body1" component="div" style={{ padding: "1%" }}>
                                Use your Fundoo Account
                        </Typography >
                            <Typography component="div">
                                <TextField
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    name="email"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    autoFocus
                                    required
                                    type="email"
                                    className="new-login-input"
                                />
                            </Typography>
                            <Typography component="div">
                                <TextField
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    name="password"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    type="password"
                                    className="new-login-input"
                                />
                            </Typography>
                        </div>
                        <ShoppingComponent
                            cartProps={true}
                            // shoppingCartToRegister = {this.shoppingCartToRegister}
                            cssColor={cssColor}
                            cartId={cartId}
                        />
                        <div style={{ margin: "auto", display: "flex", justifyContent: "center", paddingBottom: "5vh" }}>
                            <Button
                                onClick={this.handleCreateAccount}
                                color="primary">
                                Create account
                            </Button>
                            <Button
                                onClick={this.handleSignIn}
                                variant="outlined" color="primary"
                                style={{ marginLeft: "35%" }}
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}
