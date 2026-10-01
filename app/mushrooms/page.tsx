import { notFound } from "next/navigation";
import MushroomCard from "@/components/mushroomCard/mushroomCard";
import styles from "./mushroomsPage.module.css";

type Mushroom = {
  key: number;
  canonicalName: string;
  vernacularNames: {
    vernacularName: string;
    language: string;
  }[];
};

export default async function Mushrooms() {
  const response = await fetch(
    "https://api.gbif.org/v1/species/search?higherTaxonKey=168023315&rank=SPECIES&datasetKey=a6c6cead-b5ce-4a4e-8cf5-1542ba708dec&status=ACCEPTED&limit=20",
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  const mushroomsWithImages = await Promise.all(
    data.results.map(async (item: Mushroom) => {
      const norwegianName = item.vernacularNames.find(
        (name) => name.language === "nob",
      );

      const sapmiName = item.vernacularNames.find(
        (name) => name.language === "sme",
      );

      const imgResponse = await fetch(
        `https://api.gbif.org/v1/occurrence/search?scientificName=${item.canonicalName}&mediaType=StillImage&limit=1`,
      );

      const imgData = await imgResponse.json();

      const img = imgData.results?.[0]?.media?.[0]?.identifier;

      return (
        <MushroomCard
          key={item.key}
          id={item.key}
          img={img ? img : ""}
          commonName={
            norwegianName ? norwegianName.vernacularName : item.canonicalName
          }
          latinName={item.canonicalName}
          sapmiName={sapmiName ? sapmiName.vernacularName : ""}
        />
      );
    }),
  );

  return (
    <main>
      <h1>Sopper</h1>

      <div className={styles.mushroomsDisplay}>{mushroomsWithImages}</div>
    </main>
  );
}
