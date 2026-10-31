import styles from "./searchform.module.css";

export default function SearchForm() {
  return (
    <form action="/search" className={styles.form}>
      <input
        aria-label="Søk etter sopp"
        type="search"
        name="q"
        required
        autoComplete="off"
        placeholder="Søk etter sopp"
      />
      <button type="submit" aria-label="Søk">
        <img src="/loupe.png" alt="" />
      </button>
    </form>
  );
}
