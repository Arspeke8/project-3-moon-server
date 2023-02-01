const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Workout {
    _id: ID
    workoutName: String!
    exerciseName: String!
    weightUsed: Number!
    repsDone: Number!
    setsDone: Number!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    workouts(username:String): User
    workout(workoutId: ID!): Workout
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWorkout(workoutName: String!, exerciseName: String!, weightUsed: Number!, resDone: Number!, setsDone: Number!): Workout
    removeWorkout(workoutId: ID!): Workout
  }
`;

module.exports = typeDefs;
