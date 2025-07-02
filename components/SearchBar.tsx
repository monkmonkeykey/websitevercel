import React from 'react';
import styles from '../app/styles/SearchBar.module.css';

type SearchBarProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

const SearchBar = ({ searchQuery, onSearchQueryChange }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <input 
        type="text" 
        placeholder="Search projects..." 
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
