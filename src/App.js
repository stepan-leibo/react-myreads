import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import Search from "./components/Search";
import BookLists from "./components/BookLists";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class BooksApp extends React.Component {
    render () {
        return (
            <div className="app">
                <Route exact path="/search" render={() => (
                    <Search/>
                )}/>
                <Route exact path="/" render={() => (
                    <BookLists/>
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
