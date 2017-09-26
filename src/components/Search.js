import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search, update } from '../BooksAPI';
import Book from "./Book";
import { toast } from 'react-toastify';
import SearchInput from "./SearchInput";

class Search extends Component {
    state = {
        books: []
    };

    onSearchTriggered (query) {
        search(query, 10)
            .then(data => {
                if (!data.hasOwnProperty('error')) {
                    this.setState({
                        books: data
                    });
                } else {
                    toast.error(data.error);
                }
            });
    }

    onBookAdded (book, shelf) {
        update(book, shelf)
            .then(book => {
                toast.success(`Book ${book.title} is added.`);
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
