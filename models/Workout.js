const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const workoutSchema = new Schema({
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
      
    },
    repsDone: {
        type: Number,
        required: 'How many reps did you do?',
       
    },
    setsDone: {
        type: Number,
        required: 'How many sets did you do?',
         
    },
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;