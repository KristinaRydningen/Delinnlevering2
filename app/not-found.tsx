import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 – Denne siden finnes dessverre ikke 🍄</h1>
      <Link href="/" className={styles.homeLink}>
        Tilbake til forsiden
      </Link>
    </div>
  );
}
