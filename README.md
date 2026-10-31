# Soppoteket

Soppoteket viser frem et stort antall sopper med latinske navn. Der det er tilgjengelig vises norsk navn, samisk navn og norsk beskrivelse. Man kan også søke etter sopper på soppoteket. Soppoteket er for nysgjerrige soppintresserte som vil utforske flere sopparter.

## Innstallasjon og oppstart

Prosjektet krever Node.js og npm. Du kan klone repositoryet med `git clone https://github.com/KristinaRydningen/Delinnlevering2`. Gå inn i mappen og installer avhengighetene med `npm install` og start utviklingsserveren med `npm run dev`. Åpne http://localhost:3000 i nettleseren din.

## API og konfigurasjon

Det trengs ingen konfigurasjon av API-ene. Det brukes to API, i hovedsak brukes GBIF (Global Biodiversity Information Facility). Navnene og bildene kommer fra GBIF, mens SNL (Store norske leksikon) sitt API brukes for de norske beskrivelsene som dukker opp når man trykker på "Les mer" knappen.
API-ene krever ikke API-nøkler.

## Kjente feil og begrensninger:

Det er dessverre ikke alle soppene som har bilder, og noen sopper har heller ikke norske eller samiske navn. **Bildene er opplastet av tilfeldige brukere, og skal absolutt ikke brukes til identifisering av spiselig sopp.**
