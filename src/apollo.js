import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const apolloServerUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8081/v1/graphql"
    : "https://cottage-graphql.herokuapp.com/v1/graphql"

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: apolloServerUrl,
  }),
})
