import Link from "next/link";
import styles from "./header.module.css";
import SearchForm from "../SearchForm/SearchForm";

export default function Header() {
  return (
    <header className={styles.headerNav}>
      <nav>
        <Link href="/">Hjem</Link>
        <Link href="/mushrooms">Sopper</Link>
        <Link href="/about">Om soppoteket</Link>
        <SearchForm />
      </nav>
    </header>
  );
}
