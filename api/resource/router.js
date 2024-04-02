// build your `/api/resources` router here
const express = require('express')
const router = express.Router()
const Resource = require('./model')

router.use(express.json())


router.post('/', async (req,res,next) => {
    try { 
        const newResource = await Resource.create(req.body)
        res.json(newResource)
    } catch (err){
        next(err)
    }
})

router.get('/',async (req,res,next) => {
    try { 
        const resources = await Resource.getAll()
        res.json(resources)
    } catch (err){
        next(err)
    }
})



module.exports = router