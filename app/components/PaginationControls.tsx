import Link from 'next/link';

type PaginationControlsProps = {
  hasNextPage?: boolean;
  endCursor?: string;
  currentPage: number;
};

export default function PaginationControls({
  hasNextPage,
  endCursor,
  currentPage,
}: PaginationControlsProps) {
  return (
    <div>
      <Link
        href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : '#'}
        passHref
      >
        <button disabled={currentPage <= 1}>Previous Page</button>
      </Link>
      <Link
        href={
          hasNextPage && endCursor
            ? `/blog?page=${currentPage + 1}&after=${endCursor}`
            : '#'
        }
        passHref
      >
        {/* https://bumperball.pl/blog/page/2/ */}
        <button disabled={!hasNextPage}>Next Page</button>
      </Link>
    </div>
  );
}
