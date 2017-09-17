import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  
  state = {
    booksQueried: [],
    books: []
  }

  clearSearchQuery = () => {
    this.setState({booksQueried:[]})
  }

  updateBookShelf = (book, event) => {
    if (book.shelf !== event) {
      BooksAPI.update(book, event).then(() => {
        book.shelf = event
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  queryBooks = (query) => {
    if(query.target.value === '') {
      this.setState({ booksQueried: [] })
    }
    else if(query.target.value) {
      BooksAPI.search(query.target.value.trim(), 21)
        .then(booksFound => {
        if(booksFound.error === 'empty query') { 
          this.setState({ booksQueried: [] })
        } else { 
          this.state.books.forEach(savedBook => { 
            booksFound.forEach((bookFound, index) => { 
              if (bookFound.id === savedBook.id) { 
                booksFound[index] = savedBook
              }
            })
          })
          this.setState({ booksQueried: booksFound })
        }
      })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books}
              updateBookShelf={this.updateBookShelf}/>
          )}/>
          <Route path="/search" render={()=> (
            <SearchBooks
              booksQueried={this.state.booksQueried}
              queryBooks={this.queryBooks}
              clearSearchQuery={this.clearSearchQuery}
              updateBookShelf={this.updateBookShelf}/>

          )}/>
        </div>
      </Router>
    )
  }

  componentDidMount() { 
    BooksAPI.getAll().then((books) => { 
      this.setState({ books })
    }) 
  }

}

export default BooksApp;
