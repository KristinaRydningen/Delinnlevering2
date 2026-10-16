import styles from "../spesificMushroomCard/spesificMushroomCard.module.css";

type Props = {
  commonName: string;
  latinName: string;
  sapmiName: string;
  description: string;
  img: string;
};

export default function SpesificMushroomCard(props: Props) {
  return (
    <div className={styles.main}>
      <img className={styles.img} src={props.img} alt="" />
      <div className={styles.mushroomCard}>
        <h1>{props.commonName}</h1>
        <h2 className={styles.italicTxt}>{props.latinName}</h2>
        <span className={styles.sapmiDisplay}>
          <h3 className={styles.italicTxt}>{props.sapmiName} </h3>
          <img className={styles.sapmiFlag} src="/sapmi.png" alt="" />
        </span>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
