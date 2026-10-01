type Props = {
  params: Promise<{ id: string }>;
};

export default async function mushroomSpesific({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`https://api.gbif.org/v1/species/${id}`);

  if (!response.ok) {
    throw new Error("Feil ved innhenting av data");
  }

  const spesificMushroom = await response.json();

  console.log(spesificMushroom);

  return (
    <>
      <p>{spesificMushroom.canonicalName}</p>
    </>
  );
}
