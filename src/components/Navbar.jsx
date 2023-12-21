import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = ({ onSearch, clearSearch, setSearchQuery, searchQuery }) => {

  const handleSearch = () => {
    onSearch(searchQuery);
  };
  const handleClearSearch = () => {
    clearSearch();
  }
  return (
    <nav className="navbar border" >
      <Link to="/" className="navbar-brand px-3"> Home </Link>
      <div>
        <input
          type="text"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-pill"
        />
      </div>


    </nav>
  );
}

export default Navbar;
