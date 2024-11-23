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
  const totalPages = Math.ceil(
    (total + (currentPage - 1) * postsPerPage) / postsPerPage
  );
  const siblingCount = 3; // Number of pages to show on either side of the current page

  const paginationRange = () => {
    const range: (number | string)[] = [];

    // Always show the first page
    range.push(1);

    const startPage = Math.max(2, currentPage - siblingCount); // First sibling page
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount); // Last sibling page

    // Add ellipses if there's a gap between the first page and the start page
    if (startPage > 2) {
      range.push('...');
    }

    // Add the sibling pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      if (i < totalPages) {
        range.push(i);
      }
    }

    // Add ellipses if there's a gap between the last sibling page and the last page
    if (endPage < totalPages - 1) {
      range.push('...');
    }

    // Always show the last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div>
      <Link
        href={
          currentPage > 1
            ? currentPage === 2
              ? '/blog'
              : `/blog/page/${currentPage - 1}`
            : '/blog'
        }
      >
        <button disabled={currentPage <= 1}>Previous Page</button>
      </Link>

      <span>
        {paginationRange().map((page, index) => {
          if (page === '...') {
            return <span key={index}>...</span>; // Render ellipses
          }

          return (
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
          );
        })}
      </span>

      <Link href={hasNextPage ? `/blog/page/${currentPage + 1}` : '#'}>
        <button disabled={!hasNextPage}>Next Page</button>
      </Link>
    </div>
  );
};

export default PaginationControls;

// import Link from 'next/link';

// type PaginationControlsProps = {
//   hasNextPage?: boolean;
//   endCursor?: string;
//   currentPage: number;
//   total: number;
// };

// export default function PaginationControls({
//   hasNextPage,
//   endCursor,
//   currentPage,
//   total,
// }: PaginationControlsProps) {
//   const postsPerPage = 8;
//   // const totalPages = Math.ceil(total / postsPerPage);
//   const totalPages = Math.ceil(
//     (total + (currentPage - 1) * postsPerPage) / postsPerPage
//   );

//   const pageButtons = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageButtons.push(
//       <Link key={i} href={i === 1 ? '/blog' : `/blog/page/${i}`}>
//         <button
//           disabled={i === currentPage}
//           style={{
//             fontWeight: i === currentPage ? 'bold' : 'normal',
//             margin: '0 5px',
//           }}
//         >
//           {i}
//         </button>
//       </Link>
//     );
//   }

//   return (
//     <div>
//       <Link href={currentPage > 2 ? `/blog/page/${currentPage - 1}` : '/blog'}>
//         <button disabled={currentPage <= 1}>Previous Page</button>
//       </Link>

//       {/* Render page buttons */}
//       <span>{pageButtons}</span>

//       <Link href={hasNextPage ? `/blog/page/${currentPage + 1}` : '#'}>
//         <button disabled={!hasNextPage}>Next Page</button>
//       </Link>
//     </div>
//   );
// }
