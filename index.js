import dotenv from "dotenv";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";

// Setup .env
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

// GraphQL Schema

const users = [
  {
    id: "1",
    username: "John",
    email: "john@example.com",
    password: "password1",
    points: 100,
    challengesCompleted: ["1", "2", "3"],
  },
  {
    id: "2",
    username: "Jane",
    email: "jane@example.com",
    password: "password2",
    points: 75,
    challengesCompleted: ["2"],
  },
  {
    id: "3",
    username: "Alice",
    email: "alice@example.com",
    password: "password3",
    points: 150,
    challengesCompleted: ["1", "3"],
  },
];

const challenges = [
  {
    id: "1",
    name: "Workout Challenge",
    startDate: "2024-01-01",
    endDate: "2024-01-21",
    progress: ["1", "2", "3"],
    creator: "1",
  },
  {
    id: "2",
    name: "Reading Challenge",
    startDate: "2024-02-01",
    endDate: "2024-02-21",
    progress: ["4", "5"],
    creator: "2",
  },
  {
    id: "3",
    name: "Meditation Challenge",
    startDate: "2024-03-01",
    endDate: "2024-03-21",
    progress: ["6"],
    creator: "3",
  },
];

const progress = [
  {
    id: "1",
    date: "2024-01-01",
    completed: true,
    notes: "Completed workout session",
    challenge: "1",
  },
  {
    id: "2",
    date: "2024-01-02",
    completed: true,
    notes: "Ran 5 miles",
    challenge: "1",
  },
  {
    id: "3",
    date: "2024-01-03",
    completed: false,
    notes: "Skipped workout",
    challenge: "1",
  },
  {
    id: "4",
    date: "2024-02-01",
    completed: true,
    notes: "Read 50 pages",
    challenge: "2",
  },
  {
    id: "5",
    date: "2024-02-02",
    completed: true,
    notes: "Read 30 pages",
    challenge: "2",
  },
  {
    id: "6",
    date: "2024-03-01",
    completed: true,
    notes: "Meditated for 30 minutes",
    challenge: "3",
  },
];

var getUser = function (args) {
  const userID = args.id;
  const data = users.filter((user) => user.id == userID)[0];
  data["challengesCompleted"] = data["challengesCompleted"].map(
    (challengeId) => {
      const index = challenges.findIndex(
        (challenge) => challenge.id === challengeId,
      );
      if (index > -1) {
        return challenges[index];
      }
    },
  );
  return data;
};

// Return a list of users
var retrieveUsers = function (args) {};

const schema = buildSchema(`
 type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    points: Int!
    challengesCompleted: [Challenge!]!
  }
  ,
  type Challenge {
    id: ID!
    name: String!
    startDate: String!
    endDate: String!
    progress: [Progress!]!
    creator: User!
  }
  ,
  type Progress {
    id: ID!
    date: String!
    completed: Boolean!
    notes: String
    challenge: Challenge!
  }
  ,
  type Query {
    getUser(id: ID!): User
    getChallenge(id: ID!): Challenge
  }
  ,
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createChallenge(
      name: String!
      startDate: String!
      endDate: String!
      creatorId: ID!
    ): Challenge!
    createProgress(
      challengeId: ID!
      date: String!
      completed: Boolean!
      notes: String
    ): Progress!
  }  
`);

const root = {
  hello: () => {
    return "Hidden secret message";
  },
  getUser: getUser,
};

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
  }),
);

// app.get('/', (_, res) => {
//   res.json({ msg: 'Stealth startup nodemon' });
// });

app.get("/", (_, res) => {
  res.type("html");
  res.end(
    ruruHTML({
      endpoint: "/graphql",
    }),
  );
});

// app.get('/stealth', (_, res) => {
//   res.json({ msg: 'Hidden secret message' });
// });

app.listen(PORT, () => {
  console.log("Listening on http://localhost:8080");
});

// console.log('Running a GraphQL API server at http://localhost:4000/graphql');
