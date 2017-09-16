import React from 'react'
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {

  render() {
    let {queryBooks, booksQuaried, updateBookShelf} = this.props

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
              books={booksQuaried} 
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
