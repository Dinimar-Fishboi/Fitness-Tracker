const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get('/api/workouts', (req, res) => {
    // summons all excercises
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
            // finds range for the last 7 days by aggregating data for the stats page.
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
    // adding new excercise for the day (this runs once 'New Workout' has been activated)
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
    // updates excercises for the day
    Workout.findOneAndUpdate(
      { 
          _id: req.params.id
         },
         // We are not creating new documents but rather adding excercises to an existing post.
         // This is why we use $push and not $set.
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