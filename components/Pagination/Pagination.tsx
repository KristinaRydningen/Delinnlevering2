import styles from "./Pagination.module.css";

export type PaginationProps = {
  children: React.ReactNode;
};

export default function Pagination({ children }: PaginationProps) {
  return <nav className={styles.paginationNav}>{children}</nav>;
}
