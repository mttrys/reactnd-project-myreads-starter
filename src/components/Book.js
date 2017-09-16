import React from 'react';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';

class Book extends React.Component {
  static propTypes = {
    updateBookShelf: PropTypes.func,
    book: PropTypes.object
  }
  
  state = { 
    shelf: 'none'
  }
  
  handleShelfChange = (e) => {
    this.props.updateBookShelf(this.props.book, e.target.value)
    if (this.props.book.shelf !== e.target.value) { 
      this.setState({shelf: e.target.value})
    }
  }

  render() {
    let {book} = this.props

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>

            <form className="book-shelf-changer" >
              <select
                id={book.id}
                value={this.state.shelf}
                onChange={this.handleShelfChange}
                >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </form>

          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div>
        </div>
      </li>
    )
  }

  componentDidMount() { 
    BooksAPI.get(this.props.book.id).then(book => this.setState({book:book, shelf:book.shelf}))
  }  

}

export default Book;
