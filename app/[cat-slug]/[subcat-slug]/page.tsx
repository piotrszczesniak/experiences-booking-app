import { GetProductCategoryQuery } from '@/generated/graphql';
import { GET_PRODUCT_CATEGORY } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Image from 'next/image';
import Link from 'next/link';

const SubCategoryHome = async ({
  params,
}: {
  params: {
    ['subcat-slug']: string;
  };
}) => {
  const client = getClient();

  const { data } = await client.query({
    query: GET_PRODUCT_CATEGORY,
    variables: { id: params['subcat-slug'], first: 16 },
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
      {/* add hero img from ACF */}
      <h1>{dataQuery.productCategory?.name}</h1>
      <ol>
        {products?.map((item, index) => {
          if (item.__typename === 'SimpleProduct') {
            return (
              <li key={index}>
                <Link href={`/experiences/${item?.slug}` || ''}>{item.name}</Link>
                <button>add to cart</button>
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
export default SubCategoryHome;
