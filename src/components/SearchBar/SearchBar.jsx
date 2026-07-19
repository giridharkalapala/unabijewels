import styles from "./SearchBar.module.css";

function SearchBar({ value, onChange }) {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Search jewellery..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;