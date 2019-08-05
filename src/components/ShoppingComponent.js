import React, { Component } from 'react'
import { CardContent, CardActionArea, Typography, Card, Container, List, ListItem, AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import UserService from '../services/UserServices'

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
    handleCart = (cartId, name, description, price) => {
        console.log("true", cartId);
        // this.props.shoppingCartToRegister(cartId);
        var cartInfo = {
            'cartId': cartId,
            'service' : name,
            'description':description,
            'price':price
        }
        this.setState({
            cartId: cartId,
            service:name
        })
        this.props.props.history.push(`/register/${cartId}`, cartInfo)
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
        const selectedCart = this.props.cartProps ? "cartSelected":null
        const shoppingService = this.state.serviceDetails.map(key => {
            return (
                <Card
                onClick={this.props.cartProps ? null : () => this.handleCart(key.id, key.name,key.description,key.price)}
                style={{ maxWidth: "40vh", height: "40vh", marginLeft: "8vh", 
                backgroundColor:   (key.id ===this.props.cartId) ? this.props.cssColor : null }} 
                key={key.id}
                className={selectedCart}
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" style={{borderBottom:"1px solid rgb(128,128,128)"}}>
                                Price : ${key.price} per month
                            </Typography>
                            <Typography color="primary" component="p">
                                {(key.name).toString().toUpperCase()}
                            </Typography>
                            <div>
                                <List style={{ height: "200px" }}>
                                    <ListItem>
                                        {key.description}
                                    </ListItem>
                                </List>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        })
        return (
            this.props.cartProps ?
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        {shoppingService}
            </div>
            :
            <div>
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
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
