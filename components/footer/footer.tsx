import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Link href="/" aria-label="Gå til forsiden">
          <img src="/SoppoteketDark.png" alt="" />
        </Link>

        <p>© Soppoteket 2026</p>
        <div>
          <p>Kontakt oss</p>
          <p>
            <a href="mailto:hei@soppoteket.no">hei@soppoteket.no</a>
          </p>
          <p>
            <a href="tel:95487789">Tel 95487789</a>
          </p>
        </div>
      </footer>
    </>
  );
}
