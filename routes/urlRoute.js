const express = require("express")
const router = express.Router()


const ShortURL = require('../models/urlSchema')


router.get('/',async(req,res)=>{
    const shortUrls = await ShortURL.find()
    res.render('index',{shortUrls : shortUrls})
})
router.post('/shortUrls',async (req,res)=>{
    const url = req.body.full
    const newShortUrl = new ShortURL({
        full : url
    })

    await newShortUrl.save()
    console.log('ShortURL crated',newShortUrl);
    res.redirect('/')
})

//ppost end
//view data
router.get('/:shortUrl',async(req,res)=>{
    const shortUrl = await ShortURL.findOne({short : req.params.shortUrl})
    if(shortUrl == null){
        return res.sendStatus(404)
    }
    await shortUrl.clicks++;
    shortUrl.save()
    res.redirect(shortUrl.full)
})

router.get('/delete/:id',async(req,res)=>{
    const id = req.params.id
    try {
        await ShortURL.deleteOne({_id : id})
        console.log('deleted');
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

module.exports =router