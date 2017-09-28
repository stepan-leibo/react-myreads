import React, { Component } from 'react';
import Book from "./Book";
import PropTypes from 'prop-types';

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    render () {
        const books = this.props.books;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.id}>
                                <Book book={book} onShelfChanged={this.props.onShelfChanged}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;
