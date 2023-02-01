const { AuthenticationError } = require('apollo-server-express');
const { User, Workout } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('workout');
    },
    workouts: async (parent, {username}) => {
      const params = username ? { username} : {};
      return Workout.find(params).sort({createdAt: -1 })
    },
    workout: async (parent, {workoutId }) => {
      return Workout.findOne({ _id: workoutId});
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('workout');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addWorkout: async (parent, { workoutId}, context) => {
      if (context.user) {
        const workout = await Workout.create({
          workoutName,
          excerciseName,
          weightUsed,
          repsDone,
          setsDone,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: workout._id } }
        );

        return Workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  removeWorkout: async (parent, { workoutId}, context) => {
    if (context.user) {
      const workout = await Workout.findOneAndDelete({
        _id: workoutId,
        workoutName,
          excerciseName,
          weightUsed,
          repsDone,
          setsDone,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { workouts: workout._id } }
      );

      return workout;
    }
    throw new AuthenticationError('You need to be logged in!');
  },
  },
};

module.exports = resolvers;
