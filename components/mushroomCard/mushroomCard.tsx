import styles from "./mushroomCard.module.css";
import "../../app/globals.css";
import Link from "next/link";

type Props = {
  id: number;
  commonName: string;
  latinName: string;
  sapmiName: string;
  img: string;
  alt: string;
};

export default function MushroomCard(props: Props) {
  return (
    <div className={styles.mushroomCard}>
      <div className={styles.imgContainer}>
        <img
          className={styles.mushroomImages}
          src={props.img ? props.img : "/noImage.png"}
          alt={props.img ? props.alt : "Ingen tilgjengelige bilder"}
        />
      </div>
      <div className={styles.textContainer}>
        <h2>{props.commonName}</h2>
        {props.latinName && (
          <h3 className={styles.italicTxtLatin}>{props.latinName}</h3>
        )}
        {props.sapmiName && (
          <h3 className={styles.italicTxtSapmi}>
            <div className={styles.sapmiDisplay}>
              <img
                className={styles.sapmiFlag}
                src="/sapmi.png"
                alt=""
                aria-label="Nordsamisk navn:"
              />
              {props.sapmiName}
            </div>
          </h3>
        )}

        <Link className={styles.lesMerButton} href={`/mushrooms/${props.id}`}>
          Les mer
        </Link>
      </div>
    </div>
  );
}
