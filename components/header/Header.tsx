import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.headerNav}>
      <nav>
        <Link href="/">Hjem</Link>
        <Link href="/mushrooms">Sopper</Link>
        <Link href="/about">Om siden</Link>
      </nav>
    </header>
  );
}
