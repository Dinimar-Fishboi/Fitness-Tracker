const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date(),
    },
    exercises: [
     {
        type: {
            type: String,
            trim: true,
            required: "What kind of workout is this?"
        },
        name: {
            type: String,
            trim: true,
            required: "What is the name of this workout?"
        },
        distance: {
            type: Number,
            unique: false,
            required: false
          },
        duration: {
            type: Number,
            unique: false,
            required: false
            },
        weight: {
            type: Number,
            unique: false,
            required: false
            },
        sets: {
            type: Number,
            unique: false,
            required: false
            },
        reps: {
            type: Number,
            unique: false,
            required: false
            },
     }
    ]
})  

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;