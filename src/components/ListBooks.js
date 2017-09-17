import React from 'react';
import BooksGrid from './BooksGrid';
import { Link } from 'react-router-dom';

class ListBooks extends React.Component {
  
  render() {
    const {books, updateBookShelf} = this.props;

    /*
    const currentlyReading = books.filter((book) => { book.shelf === 'currentlyReading'});
    
    -> warning  Expected to return a value in this function
    -> Note: It also won't render BooksGrid for currentlyReading, wantToRead and read. 
    */

    const currentlyReading = books.filter((book) => {
      return (book.shelf === 'currentlyReading')
    });
    const wantToRead = books.filter((book) => {
      return (book.shelf === 'wantToRead')
    });
    const read = books.filter((book) => {
      return (book.shelf === 'read')
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BooksGrid 
                  books={currentlyReading} 
                  updateBookShelf={updateBookShelf}/> 
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BooksGrid 
                  books={wantToRead} 
                  updateBookShelf={updateBookShelf}/> 
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BooksGrid 
                  books={read} 
                  updateBookShelf={updateBookShelf}/> 
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="open-search">search</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
