import { GetProductCategoryQuery } from '@/generated/graphql';
import { GET_PRODUCT_CATEGORY } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';

const CategoryHome = async ({ params }: { params: { ['cat-slug']: string } }) => {
  const client = getClient();

  const { data } = await client.query({
    query: GET_PRODUCT_CATEGORY,
    variables: { id: params['cat-slug'], first: 5 },
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const dataQuery: GetProductCategoryQuery = data;
  const products = dataQuery.productCategory?.products?.nodes;

  return (
    <main>
      <h1>{dataQuery.productCategory?.name}</h1>
      <h2>{dataQuery.productCategory?.count}</h2>
      <ol>
        {products?.map((item, index) => {
          if (item.__typename === 'SimpleProduct') {
            return (
              <li key={index}>
                <Link href={`/experiences/${item?.slug}` || ''}>{item.name}</Link>
                <button>add to basket</button>
              </li>
            );
          }
          if (item.__typename === 'VariableProduct') {
            return (
              <li key={index}>
                <Link href={`/experiences/${item?.slug}` || ''}>{item.name}</Link>
                <button>select options</button>
              </li>
            );
          }
        })}
      </ol>
    </main>
  );
};
export default CategoryHome;
