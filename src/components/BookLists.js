import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAll, update as bookApiUpdate } from '../BooksAPI';
import BookShelf from "./BookShelf";
import update from 'react-addons-update';

class BookLists extends Component {
    componentDidMount () {
        getAll().then((books) => {
            this.setState({
                books: [...this.state.books, ...books]
            });
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.bookAdded) {
            this.setState({
                books: [...this.books, nextProps.bookAdded]
            });
        }
    }

    state = {
        books: []
    };

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
