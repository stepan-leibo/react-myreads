import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from "./BookShelf";
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

class BookLists extends Component {
    static propTypes={
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    };

    onShelfChanged (book, newShelfName) {
        this.props.onShelfChanged(book, newShelfName);
    }

    render () {
        const books = this.props.books.sort(sortBy('title'));
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf books={books.filter(item => item.shelf === 'currentlyReading')}
                                   onShelfChanged={this.onShelfChanged.bind(this)}
                                   title="Currently reading"
                                    />
                        <BookShelf books={books.filter(item => item.shelf === 'wantToRead')}
                                   onShelfChanged={this.onShelfChanged.bind(this)}
                                   title="Want to read"/>
                        <BookShelf books={books.filter(item => item.shelf === 'read')}
                                   onShelfChanged={this.onShelfChanged.bind(this)}
                                   title="Read"/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookLists;
