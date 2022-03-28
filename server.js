import express from 'express';
const app = express()
import mongoose from 'mongoose';
import router from './routes-folder/routes.js'



mongoose.connect('mongodb://localhost/entries', {useNewUrlParser: true})
const database = mongoose.connection
database.on('error', (err) => console.log(err))
database.once('open', () => console.log("Data connected") )


app.use(express.json())
app.use('/entries', router)






app.listen(5000, () => console.log("Server Connected to port 5000"))