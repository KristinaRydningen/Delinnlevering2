import MushroomCard from "@/components/mushroomCard/mushroomCard";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchMushroomsPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    return <h1>Du har ikke søkt etter en sopp</h1>;
  }

  const response = await fetch(
    `https://api.gbif.org/v1/species/search?q=${encodeURIComponent(q)}`,
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("Noe gikk galt");
  }

  const data = await response.json();

  const searchedMushrooms = data.results;

  console.log(searchedMushrooms);

  return (
    <>
      <h1>Søk etter {q}</h1>
      {searchedMushrooms.map((mushroom) => {
        return (
          <MushroomCard
            key={mushroom.key}
            id={mushroom.key}
            commonName={mushroom.vernacularNames.nno}
            latinName={mushroom.scientificName}
            sapmiName={mushroom.vernacularNames.sme}
            img=""
          />
        );
      })}
    </>
  );
}
