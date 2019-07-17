import React, { Component } from 'react';
import { Tooltip, Card, ClickAwayListener, TextField } from '@material-ui/core';


class RemindMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            reminder: ''

        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRemindToday = this.handleRemindToday.bind(this);
        this.handleRemindTomorrow = this.handleRemindTomorrow.bind(this);

    }

    closePopper() {
        this.setState({
            open: false
        })
    }


    handleRemindToday(evt) {
        console.log("Reminder Component 37: ", this.props.noteID);
        try {
            this.closePopper();
            let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
            var date = new Date().toDateString();
            // var reminder1 = "Today, 8:00 "+ampm;
            var reminder1 = date + ", 8:00 " + ampm;
            // this.setState({reminder:reminder1})
            console.log("in reminder1==>", reminder1);
            this.props.toolsPropsToReminder(reminder1, this.props.noteID);
        } catch (err) {
            console.log("error in set reminder for today");
        }
    }

    handleRemindTomorrow(evt) {
        try {
            this.closePopper();


            let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"]
            var date = new Date().toDateString();
            date = date.replace(new Date().getDate().toString(), new Date().getDate() + 1);
            date = date.replace(days[new Date().getDay() - 1], days[new Date().getDay()]);
            var reminder1 = date + ", 8:00 AM";
            console.log("tommorow reminder==>", reminder1);
            this.setState({ [evt.target.reminder]: reminder1 });

            console.log("state : ", this.state.reminder);

            this.props.toolsPropsToReminder(reminder1, this.props.noteID);
        }
        catch (err) {
            console.log("error in set reminder for tommorrow");
        }
    }

    handleRemindNextWeek = (evt) => {
        try {
            this.closePopper();
            var date = new Date().toDateString();

            date = date.replace((new Date().getDate()), (new Date().getDate() + 7));
            console.log("date", date);

            var reminder1 = date + ", 8:00 AM";
            console.log("weekly reminder==>", reminder1);
            this.props.toolsPropsToReminder(reminder1, this.props.noteID);
        }
        catch (err) {
            console.log("error in set reminder for next week", err);
        }
    }

    handleRemindPickdate(evt) {
        try {
            console.log("Color Component 37: ", this.props.noteID)
            this.props.toolsPropsToReminder(evt.target.value, this.props.noteID);
            console.log(evt.target.value);

        } catch (err) {
            console.log("error in handle color event");
        }
    }


    handleToggle() {
        this.setState({ open: !this.state.open });
        //this.props.handleToggle(!this.state.open)
    }
    render() {
        return (
            <div className="remind-me-icon">
                <Tooltip title="Remind me">
                    <img src={require('../assets/img/alert.svg')}
                        className="img"
                        alt="remind me"
                        onClick={this.handleToggle}
                    />
                </Tooltip>
                <div>
                    {this.state.open ?
                        <ClickAwayListener onClickAway={() => this.closePopper()}>
                            <Card className="remind-me">
                                <div >
                                    <div className="remind-heading">
                                        Reminder:
                                    </div>
                                    <div className="remind-day" onClick={this.handleRemindToday}>
                                        <div>
                                            Later today
                                       </div>
                                        <div>
                                            8:00 PM
                                       </div>
                                    </div>
                                    <div className="remind-day" onClick={this.handleRemindTomorrow}>
                                        <div>
                                            Tomorrow
                                       </div>
                                        <div>
                                            8:00 AM
                                       </div>
                                    </div>
                                    <div className="remind-day" onClick={this.handleRemindNextWeek}>
                                        <div>
                                            Next Week
                                       </div>
                                        <div>
                                            Mon 8.00 AM
                                       </div>
                                    </div>
                                    {/* <div>
                                        <TextField
                                            id="datetime-local"
                                            label="Next appointment"
                                            type="datetime-local"
                                            value={this.reminder}
                                            // className={useStyles.textField}
                                            onChange={this.dateTime}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </div> */}
                                </div>
                            </Card>
                        </ClickAwayListener>

                        : null}
                </div>
            </div>

        )
    }
}
export default RemindMe;
