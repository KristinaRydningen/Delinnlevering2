import styles from "./mushroomCard.module.css";
import "../../app/globals.css";

type Props = {
  id: number;
  commonName: string;
  latinName: string;
  sapmiName: string;
};

export default function MushroomCard(props: Props) {
  return (
    <div className={styles.mushroomCard}>
      <img src="" alt="" />
      <h2>{props.commonName}</h2>
      <h3 className={styles.italicTxt}>{props.latinName}</h3>
      <h3>
        {props.sapmiName ? (
          <>
            {props.sapmiName}
            <img className={styles.sapmiFlag} src="sapmi.png" alt="" />
          </>
        ) : (
          ""
        )}
      </h3>
      <button className="button">Les mer</button>
    </div>
  );
}
