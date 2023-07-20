/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const generateAQuote = /* GraphQL */ `
  query GenerateAQuote($input: AWSJSON!) {
    generateAQuote(input: $input)
  }
`;
export const getQuoteAppTest = /* GraphQL */ `
  query GetQuoteAppTest($id: ID!) {
    getQuoteAppTest(id: $id) {
      id
      queryName
      quotesGenerated
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listQuoteAppTests = /* GraphQL */ `
  query ListQuoteAppTests(
    $filter: ModelQuoteAppTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuoteAppTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        queryName
        quotesGenerated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const quotesQueryName = /* GraphQL */ `
  query QuotesQueryName(
    $queryName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelQuoteAppTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    quotesQueryName(
      queryName: $queryName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        queryName
        quotesGenerated
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
