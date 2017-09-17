import React from 'react';
import Book from './Book';

const BooksGrid = ({books, updateBookShelf}) => {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <Book 
          key={book.id} 
          book={book} 
          updateBookShelf={updateBookShelf} 
        />
      ))}
    </ol>
  )
}

export default BooksGrid;