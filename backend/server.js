import express from 'express';
const app = express()
import mongoose from 'mongoose';
import router from './routes-folder/routes.js'
   


mongoose.connect('mongodb://localhost/entries', {useNewUrlParser: true})
const database = mongoose.connection
database.on('error', (err) => console.log(err))
database.once('open', () => console.log("Data connected") )

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next()
})
app.use(express.json())
app.use('/entries', router)







app.listen(5000, () => console.log("Server Connected to port 5000"))