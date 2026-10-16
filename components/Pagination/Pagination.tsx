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
        {pageNumber >= 2 && (
          <Link href={`${pageNumber - 1}`}>Forrige side</Link>
        )}

        {pageNumber < total && (
          <Link href={`${pageNumber + 1}`}>Neste side</Link>
        )}
      </div>
    </>
  );
}
