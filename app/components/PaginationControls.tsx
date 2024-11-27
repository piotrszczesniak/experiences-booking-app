import Link from 'next/link';

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
  const siblingCount = 3; // Number of pages to show on either side of the current page

  const paginationRange = (): (number | string)[] => {
    const range: (number | string)[] = [];

    // Always show the first page
    range.push(1);

    // Determine the start and end page
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add ellipses if there's a gap between the first page and the start page
    if (startPage > 2) range.push('...');

    // Add sibling pages
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    // Add ellipses if there's a gap after the last sibling page
    if (endPage < totalPages - 1) range.push('...');

    // Always show the last page if there are more than 1 page
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <div>
      <Link
        href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
      >
        <button disabled={currentPage <= 1}>Previous Page</button>
      </Link>

      <span>
        {paginationRange().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`}>...</span> // Render ellipses
          ) : (
            <Link key={page} href={page === 1 ? '/blog' : `/blog/page/${page}`}>
              <button
                disabled={page === currentPage}
                style={{
                  fontWeight: page === currentPage ? 'bold' : 'normal',
                  margin: '0 5px',
                }}
              >
                {page}
              </button>
            </Link>
          )
        )}
      </span>

      <Link href={hasNextPage ? `/blog/page/${currentPage + 1}` : '#'}>
        <button disabled={!hasNextPage}>Next Page</button>
      </Link>
    </div>
  );
};

export default PaginationControls;
