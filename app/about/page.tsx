import Warning from "@/components/Warning/Warning";

export default function aboutPage() {
  return (
    <>
      <h1>Om soppoteket</h1>
      <Warning />
      <p>
        Soppoteket er for soppnerder som ønsker å sjekke ut flere typer sopper.
        Soppsiden bruker data fra GBIF (Global Biodiversity Information
        Facility) for bilder og vitenskapelige, norske og samiske artsnavn.
        Tekst kommer fra SNL (Store Norske Leksikon).
      </p>
    </>
  );
}
