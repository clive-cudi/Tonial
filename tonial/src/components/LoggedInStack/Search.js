import React from "react";
import {AiOutlineSearch} from 'react-icons/ai';

function Search() {
  return (
    <div className="cl-search-wrapper">
      <div className="cl-search">
        <AiOutlineSearch />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default Search;