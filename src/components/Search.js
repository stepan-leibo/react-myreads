import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search, update } from '../BooksAPI';
import Book from "./Book";
import { toast } from 'react-toastify';
import SearchInput from "./SearchInput";
import PropTypes from 'prop-types';

class Search extends Component {
    static propTypes = {
        bookIds: PropTypes.array.isRequired,
        onBookAdded: PropTypes.func.isRequired
    };

    state = {
        books: []
    };

    onSearchTriggered (query) {
        search(query, 20)
            .then(data => {
                if (!data || !data.hasOwnProperty('error')) {
                    this.setState({
                        books: data.filter(book => !this.props.bookIds.includes(book.id))
                    });
                } else {
                    toast.error(data.error);
                }
            });
    }

    onBookAdded (book, shelf) {
        update(book, shelf)
            .then(data => {
                toast.success(`Book is added.`);
                this.props.onBookAdded(book, shelf);
                this.setState({
                    books: this.state.books.filter(item => item.id !== book.id)
                });
            });
    }

    render () {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <SearchInput onSearchTriggered={this.onSearchTriggered.bind(this)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map(book => (
                            <li key={book.id}>
                                <Book book={book} onShelfChanged={this.onBookAdded.bind(this)} isSearch/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
