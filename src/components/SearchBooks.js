import React from 'react'
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {

  render() {
    return (
       <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.props.queryBooks}
              />
            </div>
          </div>
          <div className="search-books-results">
            <BooksGrid
              books={this.props.booksQuaried} 
              updateBookShelf={this.props.updateBookShelf}/>
          </div>
       </div>
    )
  }

  componentWillUnmount() { 
    this.props.clearSearchQuery()
  }
}

export default SearchBooks;
