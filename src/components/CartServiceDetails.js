import React, { Component } from 'react'

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

export default class CartServiceDetails extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider theme={thm}>
                    <Dialog
                        open={this.props.open}
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

                            <DialogActions style={{display:"flex", justifyContent:"space-between"}}>
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
                </MuiThemeProvider>
            </div>
        )
    }
}
