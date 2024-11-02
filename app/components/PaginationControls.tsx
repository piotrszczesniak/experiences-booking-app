import Link from 'next/link';

type PaginationControlsProps = {
  hasNextPage?: boolean;
  endCursor?: string; // Add this line to accept endCursor
  currentPage: number;
  total: number;
};

export default function PaginationControls({
  hasNextPage,
  endCursor,
  currentPage,
  total,
}: PaginationControlsProps) {
  return (
    <div>
      <Link href={currentPage > 1 ? `/blog/page/${currentPage - 1}` : '#'}>
        <button disabled={currentPage <= 1}>Previous Page</button>
      </Link>
      {currentPage}
      <Link href={hasNextPage ? `/blog/page/${currentPage + 1}` : '#'}>
        <button disabled={!hasNextPage}>Next Page</button>
      </Link>
    </div>
  );
}
