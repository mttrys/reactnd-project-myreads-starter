import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BooksGrid extends React.Component {
  static propTypes = {
    updateBookShelf: PropTypes.func,
    book: PropTypes.object
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <Book 
            key={book.id} 
            book={book} 
            updateBookShelf={this.props.updateBookShelf} 
          />
        ))}
      </ol>
    )
  }

}

export default BooksGrid;
