import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from "./components/Search";
import BookLists from "./components/BookLists";

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <Search/>
                )}/>
                <Route exact path='/' render={() => (
                    <BookLists/>
                )}/>
            </div>
        )
    }
}

export default BooksApp
