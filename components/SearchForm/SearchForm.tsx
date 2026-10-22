export default function SearchForm() {
  return (
    <form action="/search">
      <label htmlFor="q">
        Søk
        <input type="search" name="q" required autoComplete="off" />
      </label>
      <button>Søk</button>
    </form>
  );
}
