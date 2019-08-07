import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CartService from '../services/CartServices';

const CartServices = new CartService();
const styles = theme => ({
  root: {
    width: '50%',
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  instructions: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  MuiStepper: {
    root: {
      padding: '14px'
    }
  }
});

function getSteps() {
  return ['Sign in', 'Review', 'Complete'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Sign in';
    case 1:
      return 'Review your order';
    case 2:
      return 'Complete your order';
    default:
      return 'Unknown stepIndex';
  }
}

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: {},
      activeStep: 1,
      address: '',
      cartId: '',
      status: '',
      isOrderPlaced: false
    }
  }

  handleNext = () => {

    if (this.state.activeStep !== getSteps().length - 1) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    } else {
      console.log("else");
      var data = {
        "cartId": this.state.cartId,
        "address": this.state.address
      }
      CartServices.placeOrder(data)
        .then(res => {
          this.setState(state => ({
            activeStep: state.activeStep + 1,
          }));
        })

    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };
  componentDidMount() {
    CartServices.getCartDetails()
      .then((res) => {
        // console.log("cart res ", res.data.data);
        this.setState({
          status: res.data.data[res.data.data.length - 1].status,
          isOrderPlaced: res.data.data[res.data.data.length - 1].isOrderPlaced,
          cartId: res.data.data[res.data.data.length - 1].id,
          key: res.data.data[res.data.data.length - 1].product
        })
      })
      .catch(err => {
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const { key } = this.state;


    return (
      !this.state.isOrderPlaced ?
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>Order Placed successfully.... Status : {this.state.status}</Typography>
                {/* <Button onClick={this.handleReset}>Reset</Button> */}
              </div>
            ) : (
                <div>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                  <div className="cart-details-div">
                    <div className="product-price">
                      <span>${(key.price)} per month basic</span>
                    </div>
                    <div style={{ fontSize: "0.86rem", width: "300px" }}>
                      <Typography variant="body1" color="primary" component="strong">{key.name} Pack Details</Typography>
                      <ul>
                        <li>{key.description}</li>
                      </ul>
                    </div>
                    <div>
                      <Typography variant="body1" color="primary" component="strong">{"Price"}</Typography>
                      <br />
                      <span>${key.price} per month</span>
                    </div>

                    <div className="checkout-box">
                      <div>
                        <span>Subtotal(1 item) : ${key.price}</span>
                      </div>
                      <div>
                        <Button variant="contained" size="small" color="primary" onClick={this.handleNext}>
                          {activeStep === steps.length - 1 ? 'Place your order' : 'Proceed to checkout'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {activeStep === steps.length - 2 &&
                    <div style={{ padding: "1%" }}>
                      <Typography variant="body1" color="primary" component="strong">Subtotal(1 item) : ${key.price}</Typography>
                    </div>}
                </div>
              )}
            {activeStep === steps.length - 1 &&
              <div style={{ display: "flex", justifyContent: "space-between", width: "130vh", padding: "2%" }}>
                <div>
                  <textarea
                    multiline="true"
                    placeholder="Enter address"
                    name="address"
                    rows="5"
                    value={this.state.address}
                    onChange={this.handleChange}
                    style={{ border: "1px solid lightgrey", width: "300px" }}
                  />
                </div>
                <div>
                  <span>Payment method</span>
                  <Typography color="primary"> Cash on Delivery </Typography>
                </div>
              </div>
            }
          </div>
        </div>
        :
        <div>
          <Typography variant="h3" component="center" style={{ alignSelf: "center", fontWeight: "100" }}> Your cart is empty</Typography>
        </div>

    );
  }
}

CartComponent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CartComponent);