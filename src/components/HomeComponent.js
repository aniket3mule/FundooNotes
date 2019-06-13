import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    NavbarBrand,
    NavbarToggler
} from 'reactstrap'
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
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/" >
                    <img src={require('../assets/img/keep_48dp.png')} alt="keep Note icon"/>
                    Fundoo Notes
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.signInClick}>Sign In</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.signUpClick}>Sign Up</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(HomePage)