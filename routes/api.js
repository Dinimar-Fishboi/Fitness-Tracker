const router = require("express").Router();
const Workout = require("../models/workout.js");

// User needs to be able to ADD excercises to the most recent workout plan

// User needs to be able to add NEW exercises to the workout plan

// REview most recent 7 days of excercise

// For this 7 day review, we are looking for the total combined WEIGHT

// For this 7 day review, we are looking for the total combined DURATION

router.get('/api/workouts', (req, res) => {
    // summons all documents
     Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
                totalWeight: {
                   $sum: "$exercises.weight"
                }
            }   
           }
     ])
     .then(data => {
         console.log(data)
         res.status(200).json(data);
     }

     )
     .catch (err => { 
        console.log(err)
        res.status(500).json(err);
     })
})

router.get('/api/workouts/range', (reg, res) => {
            // finds range for the last 7 days by aggregating data for total duration.
    Workout.aggregate([
            {
             $addFields: {
                 totalDuration: {
                     $sum: "$exercises.duration"
                 },
                 totalWeight: {
                    $sum: "$exercises.weight"
                 }
             }   
            }
        ])
        .sort({_id: -1})
        .limit(7)
        .then((data) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch ((err) => {
            console.log(err)
            res.status(500).json(err);
        })
})

  router.post('/api/workouts', ( req ,res) => {
    // adding new excercise for the day
    Workout.create({})
    .then((data) => {
        console.log(data)
        res.status(200).json(data)
    })
    .catch ((err) => {
        console.log(err)
        res.status(500).json(err);
    })
})

router.put('/api/workouts/:id', (req, res) => {
    Workout.findOneAndUpdate(
      { 
          _id: req.params.id
         },
      { $push: 
        { 
            exercises: req.body
         }
     },
      { 
          new: true
         }
    )
    .then((data) => {
        console.log(data)
        res.status(200).json(data)
    })
    .catch ((err) => {
        console.log(err)
        res.status(500).json(err);
    })
  });

module.exports = router