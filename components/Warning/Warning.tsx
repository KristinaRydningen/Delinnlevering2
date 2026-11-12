import styles from "./warning.module.css";

export default function Warning() {
  return (
    <>
      <section className={styles.warningContainer}>
        <h3>
          NB! Soppoteket skal aldri brukes til identifisering av spiselig sopp!
        </h3>
      </section>
    </>
  );
}
