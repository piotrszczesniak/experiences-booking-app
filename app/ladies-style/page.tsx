import { GetLadiesProductCategoryQuery, ProductCategory } from '@/generated/graphql';
import { GET_LADIES_STYLE_CATEGORY } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';

const LadiesHome = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: GET_LADIES_STYLE_CATEGORY,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const queryData: GetLadiesProductCategoryQuery = data;

  const krakow: ProductCategory = data.krakow;
  const warsaw: ProductCategory = data.warsaw;

  console.log(krakow);

  return (
    <main>
      <h1>Ladies style</h1>
      <h2>
        <Link href={`${krakow.parent?.node.slug}/${krakow.slug}` || ''}>{krakow.name}</Link>
        <p>{krakow.count}</p>
      </h2>
      <h2>
        <Link href={`${warsaw.parent?.node.slug}/${warsaw.slug}` || ''}>{warsaw.name}</Link>
        <p>{warsaw.count}</p>
      </h2>
    </main>
  );
};

export default LadiesHome;
