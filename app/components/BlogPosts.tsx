import Link from 'next/link';
import Image from 'next/image';
import PaginationControls from './PaginationControls';
import styles from '@/app/blog/blog.module.scss';
import type { Post } from '@/generated/graphql';

interface BlogPostsProps {
  posts: Post[];
  pageInfo: any;
  currentPage: number;
}

export default function BlogPosts({ posts, pageInfo, currentPage }: BlogPostsProps) {
  return (
    <>
      <div className={styles.postsList}>
        {posts.map((item) => {
          if (!item.title) return null;
          const titleText = typeof item.title === 'object' ? item.title.rendered : item.title;
          // TODO: do not use type any @lukasczerota
          const imageUrl: string =
            item.featuredImage?.node?.mediaItemUrl || (item as any)._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

          return (
            <div key={item.id} className={styles.postCard}>
              {imageUrl && (
                <div className={styles.postImageContainer}>
                  <Image src={imageUrl} alt={titleText} layout='fill' objectFit='cover' quality={75} />
                </div>
              )}
              <h3 className={styles.postTitle}>
                <Link href={`/blog/${item.slug}`}>{titleText}</Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <PaginationControls hasNextPage={pageInfo?.hasNextPage} currentPage={currentPage} total={pageInfo?.total} />
      </div>
    </>
  );
}
