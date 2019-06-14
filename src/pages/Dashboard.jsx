import React, {Component} from 'react';
import { Container} from 'reactstrap'
import DashboardComponent from '../components/DashboardComponent'

export default class  Dashboard extends Component{
    render(){
        return(
            <Container>
                <DashboardComponent/>
            </Container>
        );
    }
}