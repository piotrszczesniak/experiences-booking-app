import Counter from '@/app/components/Counter';
import { GetProductQuery, Product, SimpleProduct, VariableProduct } from '@/generated/graphql';
import { GET_PRODUCT } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';

export default async function Page({ params }: { params: { slug: string } }) {
  const client = getClient();

  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: { id: params.slug },
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const queryDate: GetProductQuery = data;
  const product = queryDate.product;

  if (product?.__typename === 'SimpleProduct') {
    const { name, regularPrice } = product;

    return (
      <main>
        <h1>{name}</h1>
        <p>price from {regularPrice}</p>
      </main>
    );
  }

  if (product?.__typename === 'VariableProduct') {
    const { name, regularPrice } = product;

    console.log(product);

    return (
      <main>
        <h1>{name}</h1>
        <p>prices from {regularPrice}</p>
      </main>
    );
  }
}
