import { GetMensProductCategoryQuery, ProductCategory } from '@/generated/graphql';
import { GET_MENS_ADVENTURE_CATEGORY } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';

const MensHome = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: GET_MENS_ADVENTURE_CATEGORY,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const queryData: GetMensProductCategoryQuery = data;

  const krakow: ProductCategory = data.krakow;
  const warsaw: ProductCategory = data.warsaw;

  return (
    <main>
      <h1>Mens adventure</h1>
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

export default MensHome;
