import styles from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <img src="/SoppoteketDark.png" alt="" />

        <p>© Soppoteket 2026</p>
        <div>
          <p>Kontakt oss</p>
          <p>
            <a href="mailto:hei@soppoteket.no"></a>
            hei@soppoteket.no
          </p>
          <p>
            <a href="tel:95487789"></a>Tel 95487789
          </p>
        </div>
      </footer>
    </>
  );
}
