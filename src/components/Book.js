import React from "react";
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from "prop-types";

const Book = ({ book, onChangeShelf }) => {
  const handleChangeShelf = (shelf) => {
    onChangeShelf(book, shelf);
  };

  let authors = book.authors ? book.authors.join(",") : "-";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              book.imageLinks && book.imageLinks.smallThumbnail
                ? `url(${book.imageLinks.smallThumbnail})`
                : "",
          }}
        ></div>
        <BookShelfChanger
          shelf={book.shelf}
          handleChangeShelf={handleChangeShelf}
        />
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && book.authors.length > 1 ? (
        <div className="book-authors">{authors}</div>
      ) : !book.authors ? (
        <div className="book-authors">There is no authors</div>
      ) : (
        <div className="book-authors">{book.authors}</div>
      )}
    </div>
  );
};

Book.prototype = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default Book;
