import { GetPostQuery } from '@/generated/graphql';
import { GET_POST } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';

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

  const queryData: GetPostQuery = data;
  const post = queryData.post;

  return (
    <main>
      <h1>{post?.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
    </main>
  );
};
export default SingleBlog;
