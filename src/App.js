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
    BooksAPI.update(book, event)
  }

  queryBooks = (query) => {
    if(query.target.value) {
      BooksAPI.search(query.target.value.trim(), 21)
        .then(books => {
        if(books.error === 'empty query') { 
          this.setState({ booksQuaried: [] })
        } else { 
          this.setState({ booksQuaried: books })
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

  componentWillUpdate() { 
    BooksAPI.getAll().then((books) => { 
      this.setState({ books })
    })     
  }


}

export default BooksApp;
