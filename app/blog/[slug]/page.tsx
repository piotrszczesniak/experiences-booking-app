import { GetPostQuery } from '@/generated/graphql';
import { GET_POST } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';

const SingleBlog = async ({ params }: { params: { slug: string } }) => {
  const client = getClient();

  const { data } = await client.query({
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

  // TODO: move to a separate file
  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // Handle teens
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  // TODO: move to a separate file
  function formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  const queryData: GetPostQuery = data;
  const post = queryData.post;
  console.log(post?.categories?.nodes.map((category) => category.name));

  const postDate = new Date(post?.date || '');
  const formattedDate = formatDate(postDate);
  const readingTime = post?.seo?.readingTime || '0';

  return (
    <article>
      <Image
        src={post?.featuredImage?.node.sourceUrl || ''}
        sizes={post?.featuredImage?.node.sizes || ''}
        alt={post?.featuredImage?.node.altText || ''}
        width={1024}
        height={540}
        priority={true}
        style={{
          width: '100%',
          maxWidth: '1024px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
      {post?.categories?.nodes.map((category, index) => (
        <a href='#' key={index}>
          {category.name}
        </a>
      ))}
      <h1>{post?.title}</h1>
      {post?.categories?.nodes.map((category, index) => (
        <div key={index}>{category.name}</div>
      ))}
      posted on {formattedDate} by {post?.author?.node.name}
      <p>{readingTime} minute read</p>
      <div className='entry-content' dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
      {post?.author?.node.name}
      <div className='entry-content' dangerouslySetInnerHTML={{ __html: post?.author?.node.description || '' }} />
    </article>
  );
};
export default SingleBlog;
