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
  query getPosts {
    posts {
      nodes {
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
      }
    }
  }
`;

export const GET_ALL_POSTS_SLUGS = gql`
  query getPostsSlugs {
    posts {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      content
      date
      author {
        node {
          firstName
          lastName
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
