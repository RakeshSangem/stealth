import { challenges, progress, users } from "../db/db.js";

const getUser = function (_, args) {
  const userID = args.id;
  const data = users.filter((user) => user.id == userID)[0];
  data["challengesCompleted"] = data["challengesCompleted"].map(
    (challengeId) => {
      const index = challenges.findIndex(
        (challenge) => challenge.id === challengeId
      );
      if (index > -1) {
        return challenges[index];
      }
    }
  );
  return data;
};

// createUser mutation
const createUser = function (_, args) {
  const newUser = {
    username: args.username,
    id: users.length + 1,
    email: args.email,
    password: args.password,
    challengesCompleted: [],
  };

  users.push(newUser);
  return newUser;
};

// resolvers
export const resolvers = {
  Query: {
    getUser: getUser,
  },
  Mutation: {
    createUser: createUser,
  },
};
