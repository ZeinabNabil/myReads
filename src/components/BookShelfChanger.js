import React, { useState } from "react";
import PropTypes from "prop-types";

const BookShelfChanger = ({ shelf, handleChangeShelf }) => {
  const [selectValue, setSelectValue] = useState(null);

  return (
    <div className="book-shelf-changer">
      <select
        value={selectValue === null ? shelf : selectValue}
        onChange={(e) => {
          handleChangeShelf(e.target.value);
          setSelectValue(e.target.value);
        }}
      >
        <option disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

BookShelfChanger.prototype = {
  shelf: PropTypes.string.isRequired,
  handleChangeShelf: PropTypes.func.isRequired,
};

export default BookShelfChanger;
