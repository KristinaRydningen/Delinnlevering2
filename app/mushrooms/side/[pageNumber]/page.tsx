import { notFound } from "next/navigation";
import MushroomCard from "@/components/mushroomCard/mushroomCard";
import Warning from "@/components/warning/Warning";
import "../../../../components/muhsroomGrid/mushroomGrid.css";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import MushroomGrid from "@/components/muhsroomGrid/MushroomGrid";

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
  const limitNumber = 20;
  const mushroomsPerPage = 20;
  const baseUrlGBIF =
    "https://api.gbif.org/v1/species/search?higherTaxonKey=168023315&rank=SPECIES&datasetKey=a6c6cead-b5ce-4a4e-8cf5-1542ba708dec&status=ACCEPTED";

  const response = await fetch(
    `${baseUrlGBIF}&limit=${limitNumber}&offset=${mushroomsPerPage * (parseInt(pageNumber) - 1)}`,
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  const totalPages = Math.ceil(data.count / mushroomsPerPage);

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
        />
      );
    }),
  );

  return (
    <>
      <h1>Sopper, side {pageNumber}</h1>
      <Warning />
      <MushroomGrid>{mushroomsWithImages}</MushroomGrid>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        limit={limitNumber}
        total={totalPages}
        skip={mushroomsPerPage}
      />
    </>
  );
}
