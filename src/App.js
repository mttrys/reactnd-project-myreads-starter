import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  
  state = {
    booksQuaried: [],
    books: []
  }

  clearSearchQuery = () => {
    this.setState({booksQuaried:[]})
  }

  updateBookShelf = (book, event) => {
    if (book.shelf !== event) { 
      BooksAPI.update(book, event)
      BooksAPI.getAll().then((books) => { 
        this.setState({ books })
      }) 
    }
  }

  queryBooks = (query) => {
    if(query.target.value === '') {
      this.setState({ booksQuaried: [] })
    }
    else if(query.target.value) {
      BooksAPI.search(query.target.value.trim(), 21)
        .then(booksFound => {
        if(booksFound.error === 'empty query') { 
          this.setState({ booksQuaried: [] })
        } else { 
          this.state.books.forEach(savedBook => { 
            booksFound.forEach((bookFound, index) => { 
              if (bookFound.id === savedBook.id) { 
                booksFound[index] = savedBook
              }
            })
          })
          this.setState({ booksQuaried: booksFound })
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
              booksQuaried={this.state.booksQuaried}
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

  // inconsistent rerendering of ListBooks without this lifecycle hook
  componentWillUpdate() { 
    BooksAPI.getAll().then((books) => { 
      this.setState({ books })
    })     
  }
}

export default BooksApp;
