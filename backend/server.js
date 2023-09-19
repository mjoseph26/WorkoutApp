require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const { default: mongoose } = require('mongoose')
const app = express()

app.use(express.json())/* checks if request has body
if so it is attached to request object */

//middleware to log requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to the database and listening on port', process.env.PORT)
        })  
    })
    .catch((error) => {
        console.log(error)
    })

