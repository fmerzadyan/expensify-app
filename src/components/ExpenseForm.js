import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
// /initialize is requird to use css files for date picker...
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";


export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({
            description
        }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        // Match numbers to two decimal places
        // Ff there is no amount or it matches then set the value
        if (!amount || amount.match(/^\d{1,}(.\d{0,2})?$/)) {
            this.setState(() => ({
                amount
            }));
        }
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({
            note
        }));
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({
                createdAt
            }));
        }
    };
    onFocusChanged = ({focused}) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({
                error: "error: Please provide description and amount!"
            }));
        } else {
            this.setState(() => ({
                error: ""
            }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChanged}
                        id="my_date_picker"
                        numberOfMonths={1}
                        isOutsideRange={(day) => false}
                    />
                    <textarea
                        type="text"
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add expense</button>
                </form>
            </div>
        );
    }
}
