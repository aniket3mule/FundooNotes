import React, { Component } from 'react'
import { CardContent, Typography, Card, Container, AppBar, IconButton, Toolbar, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import UserService from '../services/UserServices'
import CartService from '../services/CartServices';
import { MuiThemeProvider, createMuiTheme, } from '@material-ui/core';

const thm = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                overflow: "Hidden",
                width: "100%"
            }
        },
        MuiPaper: {
            root: {
                margin: "1px 0 0 50px"
            },
            rounded: {
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgb(143, 143, 143)"
            }
        },
    }
});
const CartServices = new CartService();
const UserServices = new UserService();
export default class ShoppingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceDetails: [],
            cartId: '',
            service: '',
            mouseEnter: false,
            cartSelected: false
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


    handleCartDialog = (productId, name) => {
        this.setState({
            cartId: productId,
            cartSelected: true,
            open: true,
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleMouseOver = (id) => {
        this.setState({
            mouseEnter: true,
            cartId: id
        })
    }
    handleMouseLeave = () => {
        this.setState({
            mouseEnter: false
        })
    }
    render() {
        // console.log("props cart ",this.props.cartId);
        const cardColor = this.state.mouseEnter ? "orange" : "#acacac"
        const cartSelected = this.state.cartSelected ? "orange" : "#acacac"
        const shoppingService = this.state.serviceDetails.map(key => {
            return (

                <Card className="inner-card" style={{
                    overflow: "visible",
                    backgroundColor: (this.state.cartId === key.id) ? cardColor : "#acacac"
                        && (key.id === this.props.cartId) ? this.props.cssColor : "#acacac"
                }}
                    onMouseEnter={this.props.cartProps ? null : () => this.handleMouseOver(key.id)}
                    onMouseLeave={this.props.cartProps ? null : () => this.handleMouseLeave()}
                >
                    <Card
                        onClick={this.props.cartProps ? null : () => this.handleCart(key.id, key.name)}
                        style={{
                            overflow: "visible"
                        }}
                        key={key.id}
                        className="cart-selected"
                    >
                        <CardContent>
                            <Typography gutterBottom variant="div"
                                component="strong"
                                style={{ borderBottom: "1px solid rgb(128,128,128)" }}>
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
                    <div style={{ width: "100%", textAlign: "center" }}>
                        {(key.id === this.props.cartId) ? <span >Selected</span> : <span >Add To Cart</span>}
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

                            {/* <MuiThemeProvider theme={thm}>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                    style={{ borderRadius: "8px" }}
                                >
                                    <div style={{ minHeight: "40%", minWidth: "50%", borderRadius: "8px" }}>
                                        <DialogContent
                                            style={{ maxHeight: "180px", minWidth: "250px" }}
                                        >
                                            <div>sdddddddddddd</div>
                                        </DialogContent>

                                        <DialogActions style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Button
                                                className="close-btn"
                                                onClick={this.handleClose}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span style={{ textTransform: "none" }}> Close </span>
                                            </Button>
                                            <Button
                                                className="close-btn"
                                                onClick={this.handleSaveCollaborator}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span style={{ textTransform: "none" }}> Save </span>
                                            </Button>
                                        </DialogActions>
                                    </div>
                                </Dialog>
                            </MuiThemeProvider> */}
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
