const router = require("express").Router();
const Workout = require("../models/workout.js");

// User needs to be able to ADD excercises to the most recent workout plan

// User needs to be able to add NEW exercises to the workout plan

// REview most recent 7 days of excercise

// For this 7 day review, we are looking for the total combined WEIGHT

// For this 7 day review, we are looking for the total combined DURATION

router.get('/api/workouts', (req, res) => {
     Workout.find()
     .then(data => {
         res.status(200).json(data);
     }

     )
     .catch (err => { 
        res.status(500).json(err);
        console.log(err)
     })
})

router.get('/api/workouts/range', (reg, res) => {
            // need to find range for the last 7 days 
    Workout.aggregate([
            {
             $addFields: {
                 totalDuration: {
                     $sum: "$excercises.duration"
                 },
                 totalWeight: {
                    $sum: "$excercises.weight"
                 }
             }   
            }
        ])
        .sort({_id: -1})
        .limit(7)
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch ((err) => {
            res.json(err);
        })
})

router.post('/api/workouts/')

module.exports = router