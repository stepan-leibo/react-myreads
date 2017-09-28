import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import Search from "./components/Search";
import BookLists from "./components/BookLists";
import { ToastContainer } from 'react-toastify';
import { getAll } from './BooksAPI';
import 'react-toastify/dist/ReactToastify.min.css';

class BooksApp extends React.Component {

    componentDidMount () {
        getAll().then((books) => {
            this.setState({
                books: books
            });
        });
    }

    state = {
        books: []
    };

    onBookAdded (book, shelf) {
        book.shelf = shelf;
        this.setState({
            books: [...this.state.books, book]
        });
    }

    render () {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <Search bookIds={this.state.books.map(book => book.id)} onBookAdded={this.onBookAdded.bind(this)}/>
                )}/>
                <Route exact path="/" render={() => (
                    <BookLists books={this.state.books}/>
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
