import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { update as bookApiUpdate } from '../BooksAPI';
import BookShelf from "./BookShelf";
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

class BookLists extends Component {

    static propTypes={
        books: PropTypes.array.isRequired
    };

    constructor (props) {
        super(props);
        this.state = {
            books: props.books.sort(sortBy('title'))
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.books) {
            this.setState({
                books: nextProps.books.sort(sortBy('title'))
            });
        }
    }

    onShelfChanged (book, newShelfName) {
        let index = this.state.books.indexOf(book);
        let updatedBooks;
        if (newShelfName === 'none') {
            updatedBooks = this.state.books;
            updatedBooks.splice(index, 1);
        } else {
            let updatedBook = update(this.state.books[index], { shelf: { $set: newShelfName } });
            updatedBooks = update(this.state.books, {
                $splice: [[index, 1, updatedBook]]
            });
        }
        this.setState({
            books: updatedBooks
        });
        bookApiUpdate(book, newShelfName);
    }

    render () {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf books={this.state.books.filter(item => item.shelf === 'currentlyReading')}
                                   onShelfChanged={this.onShelfChanged.bind(this)}
                                   title="Currently reading"
                                    />
                        <BookShelf books={this.state.books.filter(item => item.shelf === 'wantToRead')}
                                   onShelfChanged={this.onShelfChanged.bind(this)}
                                   title="Want to read"/>
                        <BookShelf books={this.state.books.filter(item => item.shelf === 'read')}
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
