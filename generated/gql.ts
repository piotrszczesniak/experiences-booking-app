/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetHeaderMenu {\n    acfSiteSettings {\n      acfHeaderMenu {\n        logo {\n          node {\n            mediaItemUrl\n          }\n        }\n        menuItems {\n          label\n          hasChildItems\n          link\n          childMenuItems {\n            label\n            link\n          }\n        }\n      }\n    }\n  }\n": types.GetHeaderMenuDocument,
    "\n  query getPosts {\n    posts {\n      nodes {\n        title\n        categories {\n          nodes {\n            name\n            categoryId\n            slug\n          }\n        }\n        excerpt\n        slug\n        featuredImage {\n          node {\n            mediaItemUrl\n            altText\n            mediaDetails {\n              sizes(include: MEDIUM_LARGE) {\n                height\n                width\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query getPostsSlugs {\n    posts {\n      edges {\n        node {\n          slug\n        }\n      }\n    }\n  }\n": types.GetPostsSlugsDocument,
    "\n  query getPost($id: ID!) {\n    post(id: $id, idType: SLUG) {\n      title\n      content\n      date\n      author {\n        node {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.GetPostDocument,
    "\n  query getPostsFromCategor($categoryId: Int!) {\n    posts(where: { categoryId: $categoryId }) {\n      nodes {\n        title\n        slug\n        categories {\n          nodes {\n            name\n            categoryId\n            slug\n          }\n        }\n        excerpt\n        slug\n        featuredImage {\n          node {\n            mediaItemUrl\n            altText\n            mediaDetails {\n              sizes(include: MEDIUM_LARGE) {\n                height\n                width\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetPostsFromCategorDocument,
    "\n  query GetLadiesProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"ladies-style-krakow\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"ladies-style-warsaw\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n": types.GetLadiesProductCategoryDocument,
    "\n  query GetMensProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"mens-adventure-krakow\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"mens-adventure-warsaw\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n": types.GetMensProductCategoryDocument,
    "\n  query GetKrakowWarsawProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"krakow\") {\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"warsaw\") {\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n": types.GetKrakowWarsawProductCategoryDocument,
    "\n  query getProductsWarsaw {\n    products(first: 30, where: { category: \"warsaw\" }) {\n      nodes {\n        __typename\n        ... on SimpleProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n        ... on VariableProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n      }\n    }\n  }\n": types.GetProductsWarsawDocument,
    "\n  query getProductsKrakow {\n    products(first: 30, where: { category: \"krakow\" }) {\n      nodes {\n        __typename\n        ... on SimpleProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n        ... on VariableProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n      }\n    }\n  }\n": types.GetProductsKrakowDocument,
    "\n  query getProductCategory($id: ID!, $first: Int, $after: String) {\n    productCategory(id: $id, idType: SLUG) {\n      name\n      count\n      description\n      slug\n      products(first: $first, after: $after) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        __typename\n        nodes {\n          ... on SimpleProduct {\n            name\n            slug\n            link\n          }\n          ... on VariableProduct {\n            name\n            slug\n            link\n          }\n        }\n      }\n    }\n  }\n": types.GetProductCategoryDocument,
    "\n  query getProduct($id: ID!) {\n    product(id: $id, idType: SLUG) {\n      name\n      slug\n      databaseId\n      ... on SimpleProduct {\n        id\n        name\n        slug\n        onSale\n        regularPrice(format: RAW)\n      }\n      ... on VariableProduct {\n        id\n        name\n        slug\n        onSale\n        regularPrice(format: RAW)\n      }\n    }\n  }\n": types.GetProductDocument,
    "\n  query getProductsKrakowSlugs {\n    products(first: 30, where: { category: \"krakow\" }) {\n      nodes {\n        slug\n      }\n    }\n  }\n": types.GetProductsKrakowSlugsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetHeaderMenu {\n    acfSiteSettings {\n      acfHeaderMenu {\n        logo {\n          node {\n            mediaItemUrl\n          }\n        }\n        menuItems {\n          label\n          hasChildItems\n          link\n          childMenuItems {\n            label\n            link\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetHeaderMenu {\n    acfSiteSettings {\n      acfHeaderMenu {\n        logo {\n          node {\n            mediaItemUrl\n          }\n        }\n        menuItems {\n          label\n          hasChildItems\n          link\n          childMenuItems {\n            label\n            link\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPosts {\n    posts {\n      nodes {\n        title\n        categories {\n          nodes {\n            name\n            categoryId\n            slug\n          }\n        }\n        excerpt\n        slug\n        featuredImage {\n          node {\n            mediaItemUrl\n            altText\n            mediaDetails {\n              sizes(include: MEDIUM_LARGE) {\n                height\n                width\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPosts {\n    posts {\n      nodes {\n        title\n        categories {\n          nodes {\n            name\n            categoryId\n            slug\n          }\n        }\n        excerpt\n        slug\n        featuredImage {\n          node {\n            mediaItemUrl\n            altText\n            mediaDetails {\n              sizes(include: MEDIUM_LARGE) {\n                height\n                width\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostsSlugs {\n    posts {\n      edges {\n        node {\n          slug\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostsSlugs {\n    posts {\n      edges {\n        node {\n          slug\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPost($id: ID!) {\n    post(id: $id, idType: SLUG) {\n      title\n      content\n      date\n      author {\n        node {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPost($id: ID!) {\n    post(id: $id, idType: SLUG) {\n      title\n      content\n      date\n      author {\n        node {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPostsFromCategor($categoryId: Int!) {\n    posts(where: { categoryId: $categoryId }) {\n      nodes {\n        title\n        slug\n        categories {\n          nodes {\n            name\n            categoryId\n            slug\n          }\n        }\n        excerpt\n        slug\n        featuredImage {\n          node {\n            mediaItemUrl\n            altText\n            mediaDetails {\n              sizes(include: MEDIUM_LARGE) {\n                height\n                width\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPostsFromCategor($categoryId: Int!) {\n    posts(where: { categoryId: $categoryId }) {\n      nodes {\n        title\n        slug\n        categories {\n          nodes {\n            name\n            categoryId\n            slug\n          }\n        }\n        excerpt\n        slug\n        featuredImage {\n          node {\n            mediaItemUrl\n            altText\n            mediaDetails {\n              sizes(include: MEDIUM_LARGE) {\n                height\n                width\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLadiesProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"ladies-style-krakow\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"ladies-style-warsaw\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLadiesProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"ladies-style-krakow\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"ladies-style-warsaw\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMensProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"mens-adventure-krakow\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"mens-adventure-warsaw\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMensProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"mens-adventure-krakow\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"mens-adventure-warsaw\") {\n      parent {\n        node {\n          slug\n        }\n      }\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetKrakowWarsawProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"krakow\") {\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"warsaw\") {\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetKrakowWarsawProductCategory {\n    krakow: productCategory(idType: SLUG, id: \"krakow\") {\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n    warsaw: productCategory(idType: SLUG, id: \"warsaw\") {\n      name\n      count\n      description\n      slug\n      image {\n        mediaItemUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductsWarsaw {\n    products(first: 30, where: { category: \"warsaw\" }) {\n      nodes {\n        __typename\n        ... on SimpleProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n        ... on VariableProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProductsWarsaw {\n    products(first: 30, where: { category: \"warsaw\" }) {\n      nodes {\n        __typename\n        ... on SimpleProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n        ... on VariableProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductsKrakow {\n    products(first: 30, where: { category: \"krakow\" }) {\n      nodes {\n        __typename\n        ... on SimpleProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n        ... on VariableProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProductsKrakow {\n    products(first: 30, where: { category: \"krakow\" }) {\n      nodes {\n        __typename\n        ... on SimpleProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n        ... on VariableProduct {\n          name\n          slug\n          regularPrice(format: RAW)\n          onSale\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductCategory($id: ID!, $first: Int, $after: String) {\n    productCategory(id: $id, idType: SLUG) {\n      name\n      count\n      description\n      slug\n      products(first: $first, after: $after) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        __typename\n        nodes {\n          ... on SimpleProduct {\n            name\n            slug\n            link\n          }\n          ... on VariableProduct {\n            name\n            slug\n            link\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProductCategory($id: ID!, $first: Int, $after: String) {\n    productCategory(id: $id, idType: SLUG) {\n      name\n      count\n      description\n      slug\n      products(first: $first, after: $after) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        __typename\n        nodes {\n          ... on SimpleProduct {\n            name\n            slug\n            link\n          }\n          ... on VariableProduct {\n            name\n            slug\n            link\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProduct($id: ID!) {\n    product(id: $id, idType: SLUG) {\n      name\n      slug\n      databaseId\n      ... on SimpleProduct {\n        id\n        name\n        slug\n        onSale\n        regularPrice(format: RAW)\n      }\n      ... on VariableProduct {\n        id\n        name\n        slug\n        onSale\n        regularPrice(format: RAW)\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProduct($id: ID!) {\n    product(id: $id, idType: SLUG) {\n      name\n      slug\n      databaseId\n      ... on SimpleProduct {\n        id\n        name\n        slug\n        onSale\n        regularPrice(format: RAW)\n      }\n      ... on VariableProduct {\n        id\n        name\n        slug\n        onSale\n        regularPrice(format: RAW)\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductsKrakowSlugs {\n    products(first: 30, where: { category: \"krakow\" }) {\n      nodes {\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProductsKrakowSlugs {\n    products(first: 30, where: { category: \"krakow\" }) {\n      nodes {\n        slug\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;