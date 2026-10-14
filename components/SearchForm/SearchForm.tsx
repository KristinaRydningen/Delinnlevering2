export default function SearchForm() {
  return (
    <form action="/search">
      <label htmlFor=""></label>
      <input type="search" name="q" required autoComplete="off" />
      <button>Søk</button>
    </form>
  );
}
