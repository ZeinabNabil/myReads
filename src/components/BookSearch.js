import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";

const BookSearch = ({ books, onUpdateShelf, onBack }) => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const updateQuery = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  useEffect(() => {
    if (query !== "") {
      BooksAPI.search(query)
        .then((searchResult) => {
          if (Array.isArray(searchResult)) {
            const searchResults = searchResult.map((res) => {
              res.shelf = "none";
              books.map(
                (book) => res.id === book.id && (res.shelf = book.shelf)
              );
              return res;
            });
            setSearchedBooks(searchResults);
          } else {
            setSearchedBooks([]);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link onClick={onBack} to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={updateQuery}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {query === ""
            ? "we have huge library of books"
            : searchedBooks.length === 0
            ? "There is no books"
            : searchedBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} onChangeShelf={onUpdateShelf} />
                </li>
              ))}
        </ol>
      </div>
    </div>
  );
};

BookSearch.prototype = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default BookSearch;
