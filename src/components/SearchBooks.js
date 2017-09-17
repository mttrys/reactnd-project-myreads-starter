import React from 'react'
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class SearchBooks extends React.Component {
  static propTypes = {
    queryBooks: PropTypes.func,
    booksQueried: PropTypes.array,
    updateBookShelf: PropTypes.func, 
    clearSearchQuery: PropTypes.func
  }


  render() {
    const {queryBooks, booksQueried, updateBookShelf} = this.props

    return (
       <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={queryBooks}
              />
            </div>
          </div>
          <div className="search-books-results">
            <BooksGrid
              books={booksQueried} 
              updateBookShelf={updateBookShelf}/>
          </div>
       </div>
    )
  }

  componentWillUnmount() { 
    this.props.clearSearchQuery()
  }
}

export default SearchBooks;
