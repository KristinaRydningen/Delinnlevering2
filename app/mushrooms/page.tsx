import { notFound } from "next/navigation";
import MushroomCard from "@/components/mushroomCard/mushroomCard";
import { GBIF_BASE_API, MUSHROOMS_PER_PAGE } from "@/constants/constants-api";
import Warning from "@/components/Warning/Warning";
import "../../components/muhsroomGrid/mushroomGrid.css";
import MushroomGrid from "@/components/muhsroomGrid/MushroomGrid";
import Pagination from "@/components/Pagination/Pagination";

export type Mushroom = {
  key: number;
  canonicalName: string;
  vernacularNames: {
    vernacularName: string;
    language: string;
  }[];
};

export default async function Mushrooms() {
  const response = await fetch(
    `${GBIF_BASE_API}/species/search?higherTaxonKey=168023315&rank=SPECIES&datasetKey=a6c6cead-b5ce-4a4e-8cf5-1542ba708dec&status=ACCEPTED&limit=${MUSHROOMS_PER_PAGE}`,
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  const totalPages = Math.ceil(data.count / MUSHROOMS_PER_PAGE);

  const mushroomsWithImages = await Promise.all(
    data.results.map(async (item: Mushroom) => {
      const norwegianName = item.vernacularNames.find(
        (name) => name.language === "nob",
      );
      const norwegianNameCapitalized =
        (norwegianName?.vernacularName?.[0]?.toUpperCase() ?? "") +
        (norwegianName?.vernacularName?.slice(1) ?? "");

      const sapmiName = item.vernacularNames.find(
        (name) => name.language === "sme",
      );

      const sapmiNamCapitalized =
        (sapmiName?.vernacularName?.[0]?.toUpperCase() ?? "") +
        (sapmiName?.vernacularName?.slice(1) ?? "");

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
            norwegianNameCapitalized
              ? norwegianNameCapitalized
              : item.canonicalName
          }
          latinName={norwegianName ? item.canonicalName : ""}
          sapmiName={sapmiNamCapitalized ? sapmiNamCapitalized : ""}
        />
      );
    }),
  );

  return (
    <>
      <h1>Sopper</h1>
      <Warning />
      <MushroomGrid>{mushroomsWithImages}</MushroomGrid>
      <Pagination pageNumber={1} total={totalPages} />
    </>
  );
}
