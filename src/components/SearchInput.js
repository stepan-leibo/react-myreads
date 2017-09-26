import React, { Component } from 'react';
import PropTypes from 'prop-types';

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

class SearchInput extends Component {
    static propTypes = {
        onSearchTriggered: PropTypes.func.isRequired
    };

    componentWillMount () {
        this.timer = null;
    }

    state = {
        query: ''
    };

    queryChanged (event) {
        this.setState({
            query: event.target.value
        });

        clearTimeout(this.timer);

        this.timer = setTimeout(this.searchTriggered.bind(this), WAIT_INTERVAL);
    }

    onKeyDown (event) {
        if (event.keyCode === ENTER_KEY) {
            clearTimeout(this.timer);
            this.searchTriggered();
        }
    }

    searchTriggered () {
        this.props.onSearchTriggered(this.state.query);
    }

    render () {
        return (
            <div>
                <input type="text"
                       placeholder="Search by title or author"
                       value={this.state.query}
                       onChange={event => this.queryChanged(event)}
                       onKeyDown={event => this.onKeyDown(event)}/>
            </div>
        );
    }
}

export default SearchInput;
