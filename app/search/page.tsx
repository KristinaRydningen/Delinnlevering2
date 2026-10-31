import MushroomCard from "@/components/mushroomCard/mushroomCard";
import "../../components/muhsroomGrid/mushroomGrid.css";
import MushroomGrid from "@/components/muhsroomGrid/MushroomGrid";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

type Mushroom = {
  key: number;
  canonicalName: string;
  scientificName: string;
};

type MushroomName = {
  vernacularName: string;
  language: string;
};

export default async function SearchMushroomsPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    return <h1>Du har ikke søkt etter en sopp</h1>;
  }

  const response = await fetch(
    `https://api.gbif.org/v1/species/search?q=${encodeURIComponent(q)}&higherTaxonKey=168023315`,
  );

  if (!response.ok) {
    throw new Error("Noe gikk galt");
  }
  const data = await response.json();
  const searchedMushrooms = data.results;

  if (searchedMushrooms.length === 0) {
    return <h1>Søket etter "{q}" ga dessverre ingen resultater</h1>;
  }

  const searchedMushroomCards = await Promise.all(
    searchedMushrooms.map(async (mushroom: Mushroom) => {
      const imgResponse = await fetch(
        `https://api.gbif.org/v1/occurrence/search?scientificName=${mushroom.canonicalName}&mediaType=StillImage&limit=1`,
      );
      const imgData = await imgResponse.json();
      const img = imgData.results?.[0]?.media?.[0]?.identifier;

      const nameResponse = await fetch(
        `https://api.gbif.org/v1/species/${mushroom.key}/vernacularNames`,
      );
      const nameData = await nameResponse.json();

      const norwegianName = nameData.results.find(
        (name: MushroomName) => name.language === "nob",
      );
      const norwegianNameCapitalized =
        (norwegianName?.vernacularName?.[0]?.toUpperCase() ?? "") +
        (norwegianName?.vernacularName?.slice(1) ?? "");

      const sapmiName = nameData.results.find(
        (name: MushroomName) => name.language === "sme",
      );
      const sapmiNameCapitalized =
        (sapmiName?.vernacularName?.[0]?.toUpperCase() ?? "") +
        (sapmiName?.vernacularName?.slice(1) ?? "");

      return (
        <MushroomCard
          key={mushroom.key}
          id={mushroom.key}
          commonName={norwegianNameCapitalized}
          latinName={mushroom.scientificName}
          sapmiName={sapmiNameCapitalized ? sapmiNameCapitalized : ""}
          img={img}
          alt={`Bilde av ${norwegianNameCapitalized ? norwegianNameCapitalized : mushroom.scientificName}`}
        />
      );
    }),
  );

  return (
    <>
      <h1 className="h1">Søk etter {q}</h1>
      <MushroomGrid>{searchedMushroomCards}</MushroomGrid>
    </>
  );
}
