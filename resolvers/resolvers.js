import { query } from "../db/db.js";

const getUser = function (_, args) {
  return new Promise((resolve, reject) => {
    const userID = args.id;
    const queryString = "SELECT * FROM users";

    query({
      queryString,
      callback: (err, res) => {
        if (err) {
          console.error(`Error executing query ${queryString} :`, err.stack);
          reject(err);
        } else {
          const data = res.rows.filter((user) => user.id == userID)[0];
          resolve(data);
        }
      },
    });
  });
};

// createUser mutation
const createUser = function (_, args) {
  return new Promise((resolve, reject) => {
    const queryString = `INSERT INTO users (username, email, password) VALUES ('${args.username}', '${args.email}', '${args.password}');`;
    query({
      queryString,
      callback: (err, res) => {
        if (err) {
          console.error(`Error executing query ${queryString} :`, err.stack);
          reject(err.stack);
        } else {
          resolve({
            username: args.username,
            email: args.email,
            password: args.password,
          });
        }
      },
    });
  });
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
