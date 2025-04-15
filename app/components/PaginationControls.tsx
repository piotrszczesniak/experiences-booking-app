import Link from 'next/link';
import styles from './PaginationControls.module.scss';

type PaginationControlsProps = {
  hasNextPage?: boolean;
  currentPage: number;
  total: number;
};

const PaginationControls = ({
  hasNextPage,
  currentPage,
  total,
}: PaginationControlsProps) => {
  const postsPerPage = 8;
  const totalPages = Math.ceil(total / postsPerPage);
  const siblingCount = 3; // Number of pages to show on either side

  const paginationRange = (): (number | string)[] => {
    const range: (number | string)[] = [];

    // Always show the first page
    range.push(1);

    // Determine the start and end page
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add ellipsis if there's a gap between the first page and the start page
    if (startPage > 2) {
      range.push('...');
    }

    // Add sibling pages
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    // Add ellipsis if there's a gap after the last sibling page
    if (endPage < totalPages - 1) {
      range.push('...');
    }

    // Always show the last page if there are more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
        >
          <button className={styles.arrowButton}>‹</button>
        </Link>
      )}

      <span className={styles.pageNumbers}>
        {paginationRange().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <Link key={page} href={page === 1 ? '/blog' : `/blog/page/${page}`}>
              <button
                className={`${styles.pageButton} ${
                  page === currentPage ? styles.active : ''
                }`}
                disabled={page === currentPage}
              >
                {page}
              </button>
            </Link>
          )
        )}
      </span>

      {hasNextPage && currentPage < totalPages && (
        <Link href={`/blog/page/${currentPage + 1}`}>
          <button className={styles.arrowButton}>›</button>
        </Link>
      )}
    </div>
  );
};

export default PaginationControls;
