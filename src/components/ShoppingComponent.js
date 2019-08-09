import React, { Component } from 'react'
import { CardContent, Typography, Card, Container, AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import UserService from '../services/UserServices'
import CartService from '../services/CartServices';

const CartServices = new CartService();
const UserServices = new UserService();
export default class ShoppingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceDetails: [],
            cartId:'',
            service:''
        }
    }
    componentDidMount() {
        UserServices.shoppingServiceDetails()
            .then(res => {
                console.log(res.data.data.data);
                this.setState({
                    serviceDetails: res.data.data.data
                })
            })
    }
     handleCart = async(productId, name) => {
        console.log("true", productId);

        var data = {
            "productId" :productId
        }
        CartServices.addToCart(data)
        .then((res) => {
            console.log("addto cart res",res.data.data.details.id);
            
            var cartInfo = {
                'cartId': res.data.data.details.id,
                'productId' : productId,
                'service': res.data.data.details.product.name
            }
            this.props.props.history.push(`/register/${productId}`, cartInfo)
        })
        // this.props.shoppingCartToRegister(cartId);
        
        
    }

    handleSignInInstead = () => {
        // var cartInfo = {
        //     'cartId': this.state.cartId,
        //     'service' : this.state.service
        // }
        this.props.props.history.push(`/signin`)
      }
    render() {
        // console.log("props cart ",this.props.cartId);
        const shoppingService = this.state.serviceDetails.map(key => {
            return (
                // <div>
                <Card
                onClick={this.props.cartProps ? null : () => this.handleCart(key.id, key.name)}
                style={{backgroundColor: (key.id ===this.props.cartId) ? this.props.cssColor : null,
                }} 
                key={key.id}
                className="cart-selected"
                >
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" style={{borderBottom:"1px solid rgb(128,128,128)"}}>
                                Price : ${key.price} per month
                            </Typography>
                            <Typography color="primary" component="p">
                                {(key.name).toString().toUpperCase()}
                            </Typography>
                            <Typography variant="body2" component="p">
                                
                                        {key.description}
                            </Typography>
                        </CardContent>
                </Card>
                

            )
        })
        return (
            this.props.cartProps ?
            <div style={{ display: "flex", justifyContent: "space-evenly" }} className = "shopping-cart">
                        {shoppingService}
            </div>
            :
            <div >
                <AppBar style={{ backgroundColor: "whitesmoke" }} color="primary" position="fixed">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6" style={{ color: "black" }}>
                            fundooNotes
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container >
                    <Typography variant="h6" component="p" style={{ textAlignLast: "center", padding: "10vh", }}>
                        {"FundooNotes offered. Choose below service to Register."}
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }} className = "shopping-cart">
                        {shoppingService}
                        
                    </div>
                    <Typography variant="h6" component="p" style={{ textAlignLast: "center", padding: "5vh" }}> 
                    <Button
              onClick={this.handleSignInInstead}
              color="primary">
                Sign in instead
              </Button>
              </Typography>
                </Container>
            </div>
        )
    }
}
