import SpesificMushroomCard from "@/components/spesificMushroomCard/spesificMushroomCard";
import { notFound } from "next/navigation";

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

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let description = "";

  const response = await fetch(`https://api.gbif.org/v1/species/${id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`GBIF svarte med status ${response.status}`);
  }

  const mushroom = await response.json();

  if (!mushroom?.canonicalName || mushroom.kingdom !== "Fungi") {
    notFound();
  }

  let nameData: { results: MushroomName[] } = { results: [] };

  try {
    const nameResponse = await fetch(
      `https://api.gbif.org/v1/species/${id}/vernacularNames`,
    );

    nameData = nameResponse.ok ? await nameResponse.json() : { results: [] };
  } catch {
    console.error("Kunne ikke hente navn fra GBIF");
  }

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

  let img = "";
  try {
    const imgResponse = await fetch(
      `https://api.gbif.org/v1/occurrence/search?scientificName=${mushroom.canonicalName}&mediaType=StillImage&limit=1`,
    );
    const imgData = imgResponse.ok ? await imgResponse.json() : null;
    img = imgData?.results?.[0]?.media?.[0]?.identifier ?? "";
  } catch {
    console.error(`Kunne ikke hente bilde for ${mushroom.canonicalName}`);
  }

  if (norwegianName) {
    try {
      const descriptionResponse = await fetch(
        `https://snl.no/api/v1/search?query=${norwegianName.vernacularName}&utm_`,
      );

      const descriptionData = descriptionResponse.ok
        ? await descriptionResponse.json()
        : [];

      const correctArticle = descriptionData.find(
        (article: SnlArticle) =>
          article.headword === norwegianName.vernacularName,
      );

      description = correctArticle
        ? correctArticle.first_sentences
        : `Det finnes dessverre ingen beskrivelse for ${norwegianName ? norwegianName.vernacularName : mushroom.canonicalName}`;
    } catch {
      console.error("Kunne ikke hente beskrivelse fra SNL");
    }
  }

  return (
    <SpesificMushroomCard
      latinName={mushroom.canonicalName}
      commonName={capitalizedNorwegianName || mushroom.canonicalName}
      img={img}
      alt={`Bilde av ${capitalizedNorwegianName ? capitalizedNorwegianName : mushroom.canonicalName}`}
      sapmiName={capitalizedSapmiName ? capitalizedSapmiName : ""}
      description={description}
    />
  );
}
