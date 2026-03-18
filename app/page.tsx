import { Post } from '@/generated/graphql';
import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const client = getClient();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    variables: { first: 3 },
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const posts: Post[] = data?.posts?.nodes;

  return (
    <main>
      <section>
        <h1>Top Things To Do in Krakow & Warsaw</h1>
        <p>Activities, City Tours, Fair Prices, 5&#x2605; Service — Hassle Free Options For Stag Do, Hen Do, Team Building, Couples.</p>
        <Link href='/experiences'>Browse Experiences</Link>
      </section>

      {posts && posts.length > 0 && (
        <section>
          <h2>Latest from the Blog</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                {post.featuredImage?.node?.mediaItemUrl && (
                  <Image
                    src={post.featuredImage.node.mediaItemUrl}
                    alt={post.featuredImage.node.altText || post.title || ''}
                    width={400}
                    height={250}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.excerpt && (
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                )}
              </li>
            ))}
          </ul>
          <Link href='/blog'>Read all articles</Link>
        </section>
      )}
    </main>
  );
}
