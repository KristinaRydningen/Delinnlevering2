import Warning from "@/components/Warning/Warning";
import styles from "./about.module.css";

export default function aboutPage() {
  return (
    <>
      <h1>Om soppoteket</h1>
      <span className={styles.aboutTxt}>
        <p>
          Soppoteket er for soppnerder som ønsker å sjekke ut flere typer
          sopper. Soppsiden bruker data fra GBIF (Global Biodiversity
          Information Facility) for bilder og vitenskapelige, norske og samiske
          artsnavn. Beskrivelsen som du finner på noen av de mer velkjente
          soppene kommer fra SNL (Store Norske Leksikon). Soppoteket er laget av
          Kristina Rydningen i forbindelse med Frontend studier ved Gokstad
          Akademiet.
        </p>
      </span>
      <Warning />
    </>
  );
}
