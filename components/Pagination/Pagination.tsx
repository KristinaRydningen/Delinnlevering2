import Link from "next/link";
import styles from "./Pagination.module.css";

export type PaginationProps = {
  pageNumber: number;
  total: number;
};

export default function Pagination({ pageNumber, total }: PaginationProps) {
  return (
    <>
      <div className={styles.paginationNav}>
        <div className={styles.prevPage}>
          {pageNumber >= 2 && (
            <Link
              href={
                pageNumber === 2
                  ? "/mushrooms"
                  : `/mushrooms/side/${pageNumber - 1}`
              }
            >
              Forrige side
            </Link>
          )}
        </div>

        <div className={styles.nextPage}>
          {pageNumber < total && (
            <Link href={`/mushrooms/side/${pageNumber + 1}`}>Neste side</Link>
          )}
        </div>
      </div>
    </>
  );
}
