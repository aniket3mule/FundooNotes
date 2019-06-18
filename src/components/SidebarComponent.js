import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
class DashboardComponent extends Component {
    
    selectNav = (selected) =>{
        if (selected === "home") {
            this.props.history.push("/signin")
        }
    }

    render() {
        return (
            <SideNav onSelect = {this.selectNav}>
                <SideNav.Toggle />
                <SideNav.Nav>
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
            </NavText>
            </NavItem>

                        <NavItem eventKey="charts">
                            
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon><NavText>
                                Line Chart
                </NavText>
                        </NavItem>
                        <NavItem eventKey="barchart">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon><NavText>
                                Bar Chart
                </NavText>
                        </NavItem>
                </SideNav.Nav>
            </SideNav>
        )
    }
}

export default withRouter(DashboardComponent);