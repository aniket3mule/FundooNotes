import React, { Component } from 'react'
import { TextField, Container, Typography, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';
import ShoppingComponent from './ShoppingComponent';
import UserService from "../services/UserServices";

const UserServices = new UserService()
// const useStyles = makeStyles(theme => ({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//     },
//     dense: {
//       marginTop: theme.spacing(2),
//     },
//     menu: {
//       width: 200,
//     },

//   }));
const thm = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      formControl: {
        top: "-9px"
      }
    },
    MuiInputBase: {
      root: {
        height: "35px"
      }
    },
    MuiFormControl: {
      marginNormal: {
        marginLeft: "18px"
      }
    }
  }
});

export default class RegistrationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
  // shoppingCartToRegister = (cartId) => {
  //   this.setState({
  //     cartId: cartId
  //   })
  // }

  handleSignInInstead = (cartInfo) => {
    // console.log("this registr ", cartInfo);
    var data = {
      'productId' : cartInfo.productId,
      'cartId': cartInfo.cartId,
     
    }
    this.props.history.push("/signin",data)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = (e) => {
    e.preventDefault();
   
      // service = this.props.history.location.state.service;
    var data = {
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'service': (this.props.location.state !== undefined) ? this.props.location.state.service : 'basic',
      'email': this.state.email,
      'password': this.state.password,
      'cartId': (this.props.location.state !== undefined) ? this.props.location.state.cartId : ''

    }
    UserServices.userRegister(data)
      .then(response => {
        // console.log(response);
        this.props.history.push("/signin")
      })
      .catch(err => {
        // console.log("Eroorrrrrr....", err);
      })
  }

  render() {
    // console.log("resister props", this.props.location.state);
    
    var cssColor = '', productId = '';
    // if (this.props.history.location.state !== undefined) {
    //   cssColor = "orange";
    //   productId = this.props.history.location.state.productId;
    // }
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    return (
      <Container>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "6%" }}>
          <div className="new-register">
            <div style={{ fontSize: "1.6rem", padding: "1%", fontWeight: "bolder", fontFamily: "sarif" }}>
              <span style={{ color: "blue" }}>F</span>
              <span style={{ color: "#f28b81" }}>u</span>
              <span style={{ color: "orange" }}>n</span>
              <span style={{ color: "blue" }}>d</span>
              <span style={{ color: "green" }}>o</span>
              <span style={{ color: "#f28b81" }}>o</span>
            </div>
            <Typography variant="h5" component="div" style={{ padding: "1%" }}>
              Create your Fundoo Account
                  </Typography >
            <MuiThemeProvider theme={thm}>
              <TextField
                label="First name"
                placeholder="First name"
                value={firstName}
                name="firstName"
                id="firstName"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                autoFocus
                required
                className="new-register-input"
              />
              <TextField
                label="Last name"
                placeholder="Last Name"
                value={lastName}
                name="lastName"
                id="lastName"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                required
                className="new-register-input"
              />
              <div >
                <TextField
                  label="Email"
                  placeholder="User name"
                  value={email}
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  className="new-register-email"
                  required
                  type="email"
                />
              </div>
              <div>
                <TextField
                  label="Password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  type="password"
                  className="new-register-input"
                />
                <TextField
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                  type="password"
                  className="new-register-input"
                />
              </div>
              {/**
                display card here.......
                */}
                <div>
              <ShoppingComponent
                cartProps={true}
                // shoppingCartToRegister = {this.shoppingCartToRegister}
                cssColor={cssColor}
                cartId={productId}
              />
              </div>
              <div className="new-register-bottom">
                <Button
                  onClick={() => this.handleSignInInstead(this.props.location.state)}
                  color="primary">
                  Sign in instead
              </Button>
                <Button
                  onClick={this.handleSignUp}
                  variant="outlined" color="primary">
                  Sign up
              </Button>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      </Container>
    )
  }
}
