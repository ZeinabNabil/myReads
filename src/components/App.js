import "../App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";
import { Routes, Route, Link } from "react-router-dom";
import BookSearch from "./BookSearch";

const App = () => {
  const shelfes = [
    {
      title: "Currently Reading",
      shelf: "currentlyReading",
    },
    {
      title: "Want to Read",
      shelf: "wantToRead",
    },
    {
      title: "Read",
      shelf: "read",
    },
  ];
  const [books, setBooks] = useState([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => {
        setBooks(books);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => {
        setBooks(books);
      })
      .catch((e) => console.log(e));
  }, [render]);

  const updateShelf = (book, shelf) => {
    const changedBooks = books.map((b) => {
      if (b.id === book.id) {
        b.shelf = shelf;
        return b;
      }
      return b;
    });
    setBooks(changedBooks);
    BooksAPI.update(book, shelf);
    // setRender(!render);
  };

  const onBack = () => {
    setRender(!render);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {shelfes.map((shelf, index) => (
                  <BookShelf
                    key={index}
                    title={shelf.title}
                    books={books.filter((book) => book.shelf === shelf.shelf)}
                    onChangeShelf={updateShelf}
                  />
                ))}
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <BookSearch
              books={books}
              onUpdateShelf={updateShelf}
              onBack={onBack}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
