import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChanged: PropTypes.func.isRequired,
        isSearch: PropTypes.bool
    };

    changeShelf (event) {
        this.props.onShelfChanged(this.props.book, event.target.value);
    }

    render () {
        let book = this.props.book;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}
                    />
                    <div className="book-shelf-changer">
                        <select defaultValue={this.props.isSearch ? 'moveto' : book.shelf}
                                onChange={event => this.changeShelf(event)}>
                            <option value="moveto" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            { !this.props.isSearch && (
                                <option value="none">None</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
            </div>
        );
    }
}

export default Book;
