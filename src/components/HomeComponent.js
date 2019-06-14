import React, { Component } from 'react';
import {Collapse, Navbar,NavItem,Nav,NavbarBrand,NavbarToggler,Button} from 'reactstrap'
import {withRouter} from 'react-router-dom'

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    signInClick = (e) =>{
        e.preventDefault();
        this.props.history.push('/signin');
    }

    signUpClick = (e) =>{
        e.preventDefault();
        this.props.history.push('/signup');
    }

    render() {
        return (
            <div className="Header-color">
                <Navbar color="#F7F7EF" light expand="md">
                    <NavbarBrand href="/" >
                    <img src={require('../assets/img/keep_48dp.png')} alt="keep Note icon"/>
                    Fundoo Notes
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                            <Button color="link" onClick={this.signInClick}>Sign in</Button>
                            </NavItem>
                            <NavItem>
                            <Button color="link" onClick={this.signUpClick}>Sign Up</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(HomePage)