const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const workoutShema = new Schema({
    workoutName: {
    type: String,
    required: 'Name your workout here.',
    minlength: 1, 
    maxlength: 20,
    trim: true,
    },
    exerciseName: {
        type: String,
        required: 'What exercise are you doing?',
        minlength: 1,
        maxlength: 20,
        trim: true,
    },
    weightUsed: {
        type: Number,
        required: 'How much weight did you use?',
        minlength: 1,
        maxlength: 4,
        trim: true,
    },
    repsDone: {
        type: Number,
        required: 'How many reps did you do?',
        minlength: 1,
        maxlength: 2,
        trim: true,
    },
    setsDone: {
        type: Number,
        required: 'How many sets did you do?',
        minlength: 1,
        maxlength: 2,
        trim: true,
    },
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;