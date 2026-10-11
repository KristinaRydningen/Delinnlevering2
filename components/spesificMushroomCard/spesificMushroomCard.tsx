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
        <h2>{props.latinName}</h2>
        <h3>{props.sapmiName}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
