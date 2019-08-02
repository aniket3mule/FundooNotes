import React, {Component} from 'react';
import ShoppingComponent from '../components/ShoppingComponent';

export default class Home extends Component{
    render(){
        return(
            <div>
                <ShoppingComponent
                props ={this.props}
                />
            </div>
        )
    }
}