import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import Search from "./components/Search";
import BookLists from "./components/BookLists";
import { ToastContainer } from 'react-toastify';
import { getAll, update as bookApiUpdate } from './BooksAPI';
import 'react-toastify/dist/ReactToastify.min.css';
import update from 'react-addons-update';

class BooksApp extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount () {
        getAll().then((books) => {
            this.setState({
                books: books
            });
        });
    }

    onBookAdded (book, shelf) {
        book.shelf = shelf;
        this.setState({
            books: [...this.state.books, book]
        });
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
            <div className="app">
                <Route exact path="/search" render={() => (
                    <Search bookIds={this.state.books.map(book => book.id)} onBookAdded={this.onBookAdded.bind(this)}/>
                )}/>
                <Route exact path="/" render={() => (
                    <BookLists books={this.state.books} onShelfChanged={this.onShelfChanged.bind(this)}/>
                )}/>
                <ToastContainer
                    position="bottom-right"
                    type="default"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                />
            </div>
        );
    }
}

export default BooksApp;
