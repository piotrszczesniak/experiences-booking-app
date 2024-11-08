import Link from 'next/link';

type PaginationControlsProps = {
  hasNextPage?: boolean;
  endCursor?: string;
  currentPage: number;
  total: number;
};

export default function PaginationControls({
  hasNextPage,
  endCursor,
  currentPage,
  total,
}: PaginationControlsProps) {
  const postsPerPage = 8;
  // const totalPages = Math.ceil(total / postsPerPage);
  const totalPages = Math.ceil(
    (total + (currentPage - 1) * postsPerPage) / postsPerPage
  );

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <Link key={i} href={i === 1 ? '/blog' : `/blog/page/${i}`}>
        <button
          disabled={i === currentPage}
          style={{
            fontWeight: i === currentPage ? 'bold' : 'normal',
            margin: '0 5px',
          }}
        >
          {i}
        </button>
      </Link>
    );
  }

  return (
    <div>
      <Link href={currentPage > 2 ? `/blog/page/${currentPage - 1}` : '/blog'}>
        <button disabled={currentPage <= 1}>Previous Page</button>
      </Link>

      {/* Render page buttons */}
      <span>{pageButtons}</span>

      <Link href={hasNextPage ? `/blog/page/${currentPage + 1}` : '#'}>
        <button disabled={!hasNextPage}>Next Page</button>
      </Link>
    </div>
  );
}
