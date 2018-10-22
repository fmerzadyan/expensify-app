import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

class ExpenseListFilters extends React.Component {
    state = {
        focusedInput: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (focusedInput) => {
        this.setState(() => ({
            focusedInput
        }));
    };
    render() {
        return (
            <div>
            <input type="text"
                value={this.props.filters.text}
                onChange={(e) => {
                    this.props.dispatch(setTextFilter(e.target.value));
                }}
            />
            <select 
                value={this.props.filters.sortBy}
                onChange={(e) => {
                    if (e.target.value === "date") {
                        this.props.dispatch(sortByDate());
                    } else if (e.target.value === "amount") {
                        this.props.dispatch(sortByAmount());
                    }
                }}
            >
                <option value="date">Date</option>
                <option value="amount" >Amount</option>
            </select>
            <DateRangePicker
                startDate={this.props.filters.startDate}
                startDateId="my_start_date_id"
                endDate={this.props.filters.endDate}
                endDateId="my_end_date_id"
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.focusedInput}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                showClearDates={true}
            />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters);
