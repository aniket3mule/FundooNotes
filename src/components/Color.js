import React, { Component } from 'react';
import { IconButton, Tooltip, Card, ClickAwayListener } from '@material-ui/core';


const hexCodesAndNames = 
[   { name: "lightcoral", hexCode: "#f28b81" },
    { name: "lavender", hexCode: "#e8eaed" },
    { name: "orange", hexCode: "#f7bc02" },
    { name: "green", hexCode: "#ccff8f" },
    { name: "yellow", hexCode: "#fcf475" },
    { name: "paleturquoise", hexCode: "#a7ffeb" },
    { name: "lightcyan", hexCode: "#cbf0f8" },
    { name: "lightblue", hexCode: "#aecbfa" },
    { name: "plum", hexCode: "#d7aefb" },
    { name: "wheat", hexCode: "#e6c9a8" },
    { name: "mistyrose", hexCode: "#fbcfe8" },
    { name: "white", hexCode: "#ffffff" }
]
class ColorPallete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }
   
    closePopper() {
        this.setState({
            open: false
        })
    }
    handleColor(evt) {
        try{
        this.closePopper() ;
        console.log("Color Component 37: ", this.props.noteID)
        this.props.toolsPropsToColorpallete(evt.target.value, this.props.noteID);
        console.log(evt.target.value);
        }catch(err){
            console.log("error in handle color event");
        } 
    }

    handleToggle() {
        this.setState({ open: !this.state.open });
        //this.props.handleToggle(!this.state.open)
    }
    render() {

        const changeCardColor = hexCodesAndNames.map((colorKey) =>

            <Tooltip title={colorKey.name} key={colorKey.hexCode}>
                <IconButton style={{ backgroundColor: colorKey.hexCode, "margin": "2px", }}
                    value={colorKey.hexCode}
                    onClick={this.handleColor}>
                </IconButton>
            </Tooltip>
        );

        return (
            <div className="color-pallate-icon">
                <Tooltip title="Change Color">
                    <img src={require('../assets/img/color.svg')}
                        className="img"
                        alt="change color"
                        onClick={this.handleToggle}
                    />
                </Tooltip>
                <div>
                    {this.state.open ?
                        <ClickAwayListener onClickAway={() => this.closePopper()}>
                            <Card className="colorPalleteCard">
                                {changeCardColor}
                            </Card>
                        </ClickAwayListener>

                        : null}
                </div>
            </div>

        )
    }
}
export default ColorPallete;
