import Warning from "@/components/Warning/Warning";

export default function Home() {
  return (
    <>
      <h1>Velkommen til Soppoteket!</h1>

      <span className={"welcomeTxt"}>
        <p>
          Her på soppoteket kan du bla deg gjennom tonnevis av sopper, kjente
          som ukjente, dette finner du under "Sopper". Du kan trykke på "Les
          mer"-knappen for å lese en kort beskrivelse. Dette er dessverre ikke
          tilgjengelig på de mest obskure soppene.
        </p>
        <p>
          Hvis du vil finne en spesifikk sopp eller en spesifikk familie av
          sopper så kan du søke på f.eks. "kantarell" i søkefeltet øverst.
        </p>
      </span>
      <Warning />
    </>
  );
}
