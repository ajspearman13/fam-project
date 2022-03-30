import express from 'express';
const router = express.Router()

//import bodyParser from 'body-parser'
//router.use(bodyParser.json)
//router.use(bodyParser.urlencoded({extended: false}))


import mongoose from 'mongoose'
const schema = new mongoose.Schema({
    date: {
        type : String,
       
        required: true
    },
    description: {
        type: String
    },
    type : {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }

})
const RowEntry = mongoose.model('RowEntry' , schema)


const object = [{
    date : 'Date.now()', 
    description: " Whatever you want",
    type : "Income",
    amount: 50000 ,
    id : Math.random()
    
}]

router.get('/', async (req, res) => {
  const allEntries = await RowEntry.find()


    try {
      res.json(allEntries)
           
    } catch (error) {
        res.json({message : error.message})
    }
})
router.get('/:id', getEntry,  (req, res) => {
  
  
        res.json(res.entry)
          
  })
router.post('/', async (req, res) => {
  
const postedRow = new RowEntry({
    date: req.body.date,
    description: req.body.description,
    type: req.body.type,
    amount: req.body.amount
})
    try {
        const awaitedRow = await postedRow.save()
        res.json(postedRow)  
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

router.delete('/:id', getEntry, async (req, res) => {
   
  try {
      await res.entry.remove()
      res.json({message: 'Deleted Subscriber' + " "+res.entry.description})
  } catch (error) {
      res.status(500).json({message : error.message})
  }
  
  })
  async function getEntry(req, res, next){
   let entry
   
    try {
        entry = await RowEntry.findById(req.params.id)
        if (entry == null) {
            return res.status(404).json({message : error.message})
        }
    } catch (error) {
        res.status(404).json({message : error.message})
    }
    res.entry = entry
    next()
  }

 


export default router