import { ProductCategory } from '@/generated/graphql';
import { GET_KRAKOW_WARSAW_CATEGORIES } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';

const ExperiencesHome = async () => {
  const client = getClient();

  const { data } = await client.query({
    query: GET_KRAKOW_WARSAW_CATEGORIES,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const krakow: ProductCategory = data.krakow;
  const warsaw: ProductCategory = data.warsaw;

  return (
    <main>
      <h1>Experiences by City</h1>
      <h2>
        <Link href={`/${krakow.slug}` || ''}>{krakow.name}</Link>
      </h2>
      <h2>
        <Link href={`/${warsaw.slug}` || ''}>{warsaw.name}</Link>
      </h2>
    </main>
  );
};
export default ExperiencesHome;
