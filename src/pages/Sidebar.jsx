import React, {Component} from 'react';
import { Container} from 'reactstrap'
import SidebarComponent from '../components/SidebarComponent'

export default class  Dashboard extends Component{
    render(){
        return(
            <div>
                <SidebarComponent/>
            </div>
        );
    }
}