import { notFound } from "next/navigation";
import MushroomCard from "@/components/mushroomCard/mushroomCard";
import Warning from "@/components/Warning/Warning";
import "../../../../components/muhsroomGrid/mushroomGrid.css";
import Pagination from "@/components/Pagination/Pagination";
import MushroomGrid from "@/components/muhsroomGrid/MushroomGrid";
import { MUSHROOMS_PER_PAGE, GBIF_BASE_API } from "@/constants/constants-api";

type Mushroom = {
  key: number;
  canonicalName: string;
  vernacularNames: {
    vernacularName: string;
    language: string;
  }[];
};

export type PaginatedMushroomsProps = {
  params: Promise<{ pageNumber: string }>;
};

export default async function PaginatedMushrooms({
  params,
}: PaginatedMushroomsProps) {
  const { pageNumber } = await params;
  const currentPage = Number(pageNumber);

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound();
  }

  const baseUrlPaginationGBIF = `${GBIF_BASE_API}/species/search?higherTaxonKey=168023315&rank=SPECIES&datasetKey=a6c6cead-b5ce-4a4e-8cf5-1542ba708dec&status=ACCEPTED`;

  const response = await fetch(
    `${baseUrlPaginationGBIF}&limit=${MUSHROOMS_PER_PAGE}&offset=${MUSHROOMS_PER_PAGE * (currentPage - 1)}`,
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  const totalPages = Math.ceil(data.count / MUSHROOMS_PER_PAGE);
  if (currentPage > totalPages) {
    notFound();
  }

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
          commonName={norwegianNameCapitalized ? norwegianNameCapitalized : ""}
          latinName={item.canonicalName}
          sapmiName={sapmiNamCapitalized ? sapmiNamCapitalized : ""}
          alt={`Bilde av ${norwegianNameCapitalized ? norwegianNameCapitalized : item.canonicalName}`}
        />
      );
    }),
  );

  return (
    <>
      <h1>Sopper, side {currentPage}</h1>
      <Warning />
      <MushroomGrid>{mushroomsWithImages}</MushroomGrid>
      <Pagination pageNumber={currentPage} total={totalPages} />
    </>
  );
}
