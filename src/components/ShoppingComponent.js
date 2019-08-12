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
            cartId: '',
            service: '',
            mouseEnter:false
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
    handleCart = async (productId, name) => {
        console.log("true", productId);

        var data = {
            "productId": productId
        }
        CartServices.addToCart(data)
            .then((res) => {
                console.log("addto cart res", res.data.data.details.id);

                var cartInfo = {
                    'cartId': res.data.data.details.id,
                    'productId': productId,
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

    handleMouseOver = (id) => {
        this.setState({
            mouseEnter : true,
            cartId:id
        })
    }
    handleMouseLeave = () => {
        this.setState({
            mouseEnter : false
        })
    }
    render() {
        // console.log("props cart ",this.props.cartId);
        const cardColor = this.state.mouseEnter ? "orange": "#acacac"

        const shoppingService = this.state.serviceDetails.map(key => {
            return (
                // <div>
                <Card className="inner-card" style={{overflow:"visible", 
                backgroundColor:(this.state.cartId === key.id) ? cardColor : "#acacac" 
                && (key.id === this.props.cartId) ? this.props.cssColor : "#acacac"}}
                onMouseEnter={this.props.cartProps ? null : ()=>this.handleMouseOver(key.id)}
                onMouseLeave={this.props.cartProps ? null : () => this.handleMouseLeave()} 
                >
                    <Card
                        onClick={this.props.cartProps ? null : () => this.handleCart(key.id, key.name)}
                        style={{
                            overflow:"visible"
                        }}
                        key={key.id}
                        className="cart-selected"
                    >


                        <CardContent>
                            <Typography gutterBottom variant="div" component="strong" style={{ borderBottom: "1px solid rgb(128,128,128)" }}>
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
                    <div style={{width:"100%", textAlign:"center"}}>
                    {(key.id === this.props.cartId) ?  <span >Selected</span> : <span >Add To Cart</span> }
                    </div>
                </Card>

            )
        })
        return (
            this.props.cartProps ?
                <div style={{ display: "flex", justifyContent: "space-evenly" }} className="shopping-cart">
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
                        <div style={{ display: "flex", justifyContent: "space-evenly" }} className="shopping-cart">
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
