import React, {Component} from 'react'
import Book from "./Book";
import PropTypes from 'prop-types'

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            books: props.books
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            books:nextProps.books
        });
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.state.books.map(book => (
                            <li key={book.id}>
                                <Book book={book} onShelfChanged={this.props.onShelfChanged}/>
                            </li>
                        ))}
                        {/*<li>*/}
                            {/*<div className="book">*/}
                                {/*<div className="book-top">*/}
                                    {/*<div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>*/}
                                    {/*<div className="book-shelf-changer">*/}
                                        {/*<select>*/}
                                            {/*<option value="none" disabled>Move to...</option>*/}
                                            {/*<option value="currentlyReading">Currently Reading</option>*/}
                                            {/*<option value="wantToRead">Want to Read</option>*/}
                                            {/*<option value="read">Read</option>*/}
                                            {/*<option value="none">None</option>*/}
                                        {/*</select>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="book-title">Ender's Game</div>*/}
                                {/*<div className="book-authors">Orson Scott Card</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf