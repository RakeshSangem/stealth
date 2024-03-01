import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/resolvers.js";

// Setup .env
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

// Get Schema from schema.graphql
const typeDefs = gql(
  readFileSync("./schema/schema.graphql", { encoding: "utf-8" })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// start apollo server
await server.start();

app.use("/graphql", express.json(), expressMiddleware(server));

app.listen(PORT, () => {
  console.log("Listening on http://localhost:8080");
});
