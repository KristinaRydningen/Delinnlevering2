"use client";
import Link from "next/link";
import { useEffect } from "react";
import "./error.css";

export type HandleErrorProps = {
  error: Error;
  reset: () => void;
};

export default function HandleError({ error, reset }: HandleErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <h1>Kunne ikke hente sopper akkurat nå</h1>
      <p>Det kan være et midlertidig problem hos GBIF. Prøv igjen om litt.</p>
      <button onClick={reset} className="errorButtons">
        Prøv igjen
      </button>
      <Link href={"/"} className="errorButtons">
        Tilbake til forsiden
      </Link>
    </>
  );
}
