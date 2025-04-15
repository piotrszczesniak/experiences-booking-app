import { gql } from '@apollo/client';

// setting up codegen https://www.youtube.com/watch?v=74JkP9CUWiI

export const GET_MENU_BY_NAME = gql`
  query GetHeaderMenu {
    acfSiteSettings {
      acfHeaderMenu {
        logo {
          node {
            mediaItemUrl
          }
        }
        menuItems {
          label
          hasChildItems
          link
          childMenuItems {
            label
            link
          }
        }
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
        total
      }
      nodes {
        id
        title
        categories {
          nodes {
            name
            categoryId
            slug
          }
        }
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
            altText
            mediaDetails {
              sizes(include: MEDIUM_LARGE) {
                height
                width
                name
              }
            }
          }
        }
        date
      }
    }
  }
`;

export const GET_PAGE_META_BY_SLUG = `
query GET_PAGE_BY_SLUG($id: ID!) {
  page(id: $id, idType: URI) {
    seo {
      title
      metaDesc
    }
  }
} 
`;

export const GET_POST_META_BY_SLUG = `
query GET_POST_BY_SLUG($id: ID!) {
  page(id: $id, idType: URI) {
    seo {
      title
      metaDesc
    }
  }
} 
`;

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id, idType: SLUG) {
      seo {
        title
        metaDesc
        readingTime
      }
      databaseId
      link
      isSticky
      title
      date
      author {
        node {
          name
          description
          avatar {
            url
            width
            height
          }
        }
      }
      featuredImage {
        node {
          title
          altText
          sourceUrl(size: LARGE)
          sizes(size: LARGE)
        }
      }
      content(format: RENDERED)
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

export const GET_ALL_POSTS_FROM_CATEGORY = gql`
  query getPostsFromCategor($categoryId: Int!) {
    posts(where: { categoryId: $categoryId }) {
      nodes {
        title
        slug
        categories {
          nodes {
            name
            categoryId
            slug
          }
        }
        excerpt
        slug
        featuredImage {
          node {
            mediaItemUrl
            altText
            mediaDetails {
              sizes(include: MEDIUM_LARGE) {
                height
                width
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_LADIES_STYLE_CATEGORY = gql`
  query GetLadiesProductCategory {
    krakow: productCategory(idType: SLUG, id: "ladies-style-krakow") {
      parent {
        node {
          slug
        }
      }
      name
      count
      description
      slug
      image {
        mediaItemUrl
      }
    }
    warsaw: productCategory(idType: SLUG, id: "ladies-style-warsaw") {
      parent {
        node {
          slug
        }
      }
      name
      count
      description
      slug
      image {
        mediaItemUrl
      }
    }
  }
`;

export const GET_MENS_ADVENTURE_CATEGORY = gql`
  query GetMensProductCategory {
    krakow: productCategory(idType: SLUG, id: "mens-adventure-krakow") {
      parent {
        node {
          slug
        }
      }
      name
      count
      description
      slug
      image {
        mediaItemUrl
      }
    }
    warsaw: productCategory(idType: SLUG, id: "mens-adventure-warsaw") {
      parent {
        node {
          slug
        }
      }
      name
      count
      description
      slug
      image {
        mediaItemUrl
      }
    }
  }
`;

export const GET_KRAKOW_WARSAW_CATEGORIES = gql`
  query GetKrakowWarsawProductCategory {
    krakow: productCategory(idType: SLUG, id: "krakow") {
      name
      count
      description
      slug
      image {
        mediaItemUrl
      }
    }
    warsaw: productCategory(idType: SLUG, id: "warsaw") {
      name
      count
      description
      slug
      image {
        mediaItemUrl
      }
    }
  }
`;

export const GET_PRODUCTS_WARSAW = gql`
  query getProductsWarsaw {
    products(first: 30, where: { category: "warsaw" }) {
      nodes {
        __typename
        ... on SimpleProduct {
          name
          slug
          regularPrice(format: RAW)
          onSale
        }
        ... on VariableProduct {
          name
          slug
          regularPrice(format: RAW)
          onSale
        }
      }
    }
  }
`;

export const GET_PRODUCTS_KRAKOW = gql`
  query getProductsKrakow {
    products(first: 30, where: { category: "krakow" }) {
      nodes {
        __typename
        ... on SimpleProduct {
          name
          slug
          regularPrice(format: RAW)
          onSale
        }
        ... on VariableProduct {
          name
          slug
          regularPrice(format: RAW)
          onSale
        }
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORY = gql`
  query getProductCategory($id: ID!, $first: Int, $after: String) {
    productCategory(id: $id, idType: SLUG) {
      name
      count
      description
      slug
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        __typename
        nodes {
          ... on SimpleProduct {
            name
            slug
            link
          }
          ... on VariableProduct {
            name
            slug
            link
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      name
      slug
      databaseId
      ... on SimpleProduct {
        id
        name
        slug
        onSale
        regularPrice(format: RAW)
      }
      ... on VariableProduct {
        id
        name
        slug
        onSale
        regularPrice(format: RAW)
      }
    }
  }
`;

export const GET_PRODUCTS_KRAKOW_SLUGS = gql`
  query getProductsKrakowSlugs {
    products(first: 30, where: { category: "krakow" }) {
      nodes {
        slug
      }
    }
  }
`;

// export const GET_NEXT_POST = gql`
//   query getPosts($after: String!) {
//     posts(first: 1, after: $after) {
//       edges {
//         node {
//           id
//           title
//           slug
//         }
//       }
//     }
//   }
// `;

// export const GET_PREVIOUS_POST = gql`
//   query getPosts($before: String!) {
//     posts(first: 1, before: $before) {
//       edges {
//         node {
//           id
//           title
//           slug
//         }
//       }
//     }
//   }
// `;

export const GET_SINGLE_POST_CURSOR = gql`
  query getSinglePostCursor($id: Int!) {
    posts(where: { id: $id }) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
      }
      edges {
        cursor
        node {
          databaseId
        }
      }
    }
  }
`;

export const GET_ADJACENT_POSTS = gql`
  query getAdjacentPosts($after: String, $before: String) {
    nextPosts: posts(first: 1, after: $after) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
    previousPosts: posts(first: 1, before: $before) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`;
