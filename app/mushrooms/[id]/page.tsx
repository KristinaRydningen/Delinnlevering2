import SpesificMushroomCard from "@/components/SpesificMushroomCard/spesificMushroomCard";

type Props = {
  params: Promise<{ id: string }>;
};

type MushroomName = {
  vernacularName: string;
  language: string;
};

type SnlArticle = {
  headword: string;
  first_sentences: string;
};

export default async function MushroomSpecific({ params }: Props) {
  const { id } = await params;

  let description = "";

  const response = await fetch(`https://api.gbif.org/v1/species/${id}`);
  const mushroom = await response.json();

  const nameResponse = await fetch(
    `https://api.gbif.org/v1/species/${id}/vernacularNames`,
  );
  const nameData = await nameResponse.json();
  const norwegianName = nameData.results.find(
    (name: MushroomName) => name.language === "nob",
  );
  const capitalizedNorwegianName =
    (norwegianName?.vernacularName?.[0]?.toUpperCase() ?? "") +
    (norwegianName?.vernacularName?.slice(1) ?? "");

  const sapmiName = nameData.results.find(
    (name: MushroomName) => name.language === "sme",
  );
  const capitalizedSapmiName =
    (sapmiName?.vernacularName?.[0]?.toUpperCase() ?? "") +
    (sapmiName?.vernacularName?.slice(1) ?? "");

  console.log(capitalizedSapmiName);

  const imgResponse = await fetch(
    `https://api.gbif.org/v1/occurrence/search?scientificName=${mushroom.canonicalName}&mediaType=StillImage&limit=1`,
  );
  const imgData = await imgResponse.json();
  const img = imgData.results?.[0]?.media?.[0]?.identifier;

  if (norwegianName) {
    const descriptionResponse = await fetch(
      `https://snl.no/api/v1/search?query=${norwegianName.vernacularName}&utm_`,
    );

    const descriptionData = await descriptionResponse.json();

    const correctArticle = descriptionData.find(
      (article: SnlArticle) =>
        article.headword === norwegianName.vernacularName,
    );

    description = correctArticle
      ? correctArticle.first_sentences
      : `Det finnes dessverre ingen beskrivelse for ${norwegianName ? norwegianName.vernacularName : mushroom.canonicalName}`;
  }

  return (
    <SpesificMushroomCard
      latinName={mushroom.canonicalName}
      commonName={capitalizedNorwegianName ? capitalizedNorwegianName : ""}
      img={img}
      alt={`Bilde av ${capitalizedNorwegianName ? capitalizedNorwegianName : mushroom.canonicalName}`}
      sapmiName={capitalizedSapmiName ? capitalizedSapmiName : ""}
      description={description}
    />
  );
}
