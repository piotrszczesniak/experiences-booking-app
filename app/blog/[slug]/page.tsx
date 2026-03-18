import { GetPostQuery } from '@/generated/graphql';
import { GET_ADJACENT_POSTS, GET_ALL_POSTS, GET_POST, GET_SINGLE_POST_CURSOR } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';
import styles from './post.module.scss';
import '@/app/globals.scss';

import ShareButtons from '../blogComponents/ShareButtons';
import { formatDate } from '@/utilis/formatDate';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_ALL_POSTS,
    variables: { first: 100 },
  });
  const posts: Array<{ slug?: string | null }> = data?.posts?.nodes ?? [];
  return posts
    .filter((post) => post.slug)
    .map((post) => ({ slug: post.slug as string }));
}

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const client = getClient();

  // * fetch the post data
  const { data: initialData } = await client.query({
    query: GET_POST,
    variables: { id: params.slug },
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const queryInitialData: GetPostQuery = initialData;
  const post = queryInitialData.post;

  const postDate = new Date(post?.date || '');
  const formattedDate = formatDate(postDate);
  const readingTime = post?.seo?.readingTime || '0';

  // * fetch the post curosor
  const { data: cursorData } = await client.query({
    query: GET_SINGLE_POST_CURSOR,
    variables: { id: post?.databaseId },
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const cursorPost = cursorData.posts.edges[0].cursor;

  // * fetch the next and previous post
  const { data: nextPostData } = await client.query({
    query: GET_ADJACENT_POSTS,
    variables: { after: cursorPost, before: cursorPost },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const nextPost = nextPostData.nextPosts?.edges[0]?.node;
  const previousPost = nextPostData.previousPosts?.edges[0]?.node;

  return (
    <article className={styles.article}>
      <span className={styles.date}>{formattedDate}</span>
      <header className={styles.header}>
        <Image
          src={post?.featuredImage?.node.sourceUrl || ''}
          sizes={post?.featuredImage?.node.sizes || ''}
          alt={post?.featuredImage?.node.altText || ''}
          width={1024}
          height={540}
          priority={true}
          style={{
            width: '100%',
            maxWidth: '1193px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
        <div className={styles.headline}>
          <div className={styles.categories}>
            {post?.categories?.nodes.map((category, index) => {
              const slug = (category as { name?: string | null; slug?: string | null }).slug || '';
              return (
                <Link className={styles.category} href={`/blog/category/${slug}`} key={index}>
                  {category.name}
                </Link>
              );
            })}
          </div>

          <h1 className={styles.title}>{post?.title}</h1>
          <span>
            posted on {formattedDate} by {post?.author?.node.name}
          </span>
          <span>{readingTime} minute read</span>
        </div>
      </header>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
      <ShareButtons cta={'Share this post and inspire others to travel!'} title={post?.title || ''} url={post?.link || ''} />
      <footer className={styles.metadata}>
        This entry was posted in{' '}
        {post?.categories?.nodes.map((category, index) => {
          const slug = (category as { name?: string | null; slug?: string | null }).slug || '';
          return (
            <Link className={styles.category} href={`/blog/category/${slug}`} key={index}>
              {category.name}
            </Link>
          );
        })}
      </footer>
      <div className={styles.author}>
        <div className={styles.image}>
          <Image src={post?.author?.node?.avatar?.url || ''} alt='author image' width={90} height={90} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{post?.author?.node.name}</div>
          <div className={styles.bio} dangerouslySetInnerHTML={{ __html: post?.author?.node.description || '' }} />
        </div>
      </div>
      <nav className={styles.navigation}>
        {previousPost && (
          <div className={styles.previous}>
            <FaChevronLeft />
            <Link href={`/blog/${previousPost?.slug}`}>{previousPost?.title}</Link>
          </div>
        )}

        {nextPost && (
          <div className={styles.next}>
            <Link href={`/blog/${nextPost?.slug}`}>{nextPost?.title}</Link>
            <FaChevronRight />
          </div>
        )}
      </nav>
    </article>
  );
};
export default SinglePost;
