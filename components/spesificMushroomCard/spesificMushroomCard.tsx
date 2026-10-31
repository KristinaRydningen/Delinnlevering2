import styles from "../spesificMushroomCard/spesificMushroomCard.module.css";

type Props = {
  commonName: string;
  latinName: string;
  sapmiName: string;
  description: string;
  img: string;
  alt: string;
};

export default function SpesificMushroomCard(props: Props) {
  return (
    <div className={styles.spesificContainer}>
      <img
        className={styles.img}
        src={props.img ? props.img : "/noImage.png"}
        alt={props.img ? props.alt : "Ingen tilgjengelige bilder"}
      />
      <div className={styles.mushroomCard}>
        <h1>{props.commonName}</h1>
        <h2 className={styles.italicTxt}>{props.latinName}</h2>
        {props.sapmiName && (
          <div className={styles.sapmiDisplay}>
            <img
              className={styles.sapmiFlag}
              src="/sapmi.png"
              alt=""
              aria-label="Nordsamisk navn:"
            />
            <h3 className={styles.italicTxt}>{props.sapmiName} </h3>
          </div>
        )}
        <p>
          {props.description
            ? props.description
            : `Det finnes dessverre ingen beskrivelse for ${props.commonName ? props.commonName : props.latinName}`}
        </p>
      </div>
    </div>
  );
}
