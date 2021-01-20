const UrlModel   = require('../models/url.model')
// string ID generator faster than UUID
const {nanoid}   = require('nanoid')
const UserModel = require('../models/user.model')
// get points awarding system from util
const {
  pointsEarned
} = require('../utils/utils')

/* Point scoring system needs refactoring into a function and or middleware
const pointsEarned = {
  signup: 10,
  login : 2,
  shareURL: 5,
  createURL : 4
}
*/

// [GET] ../url/:id
exports.getUrl   = async (req, res) => {
    
    console.log('getUrl: [GET] /url/:id')
    // check in db for slug send as param
    const {slug}   = req.params
    console.log("Slug: ",slug)
    const found  = await UrlModel.findOne({slug})
    console.log("Found: ",found)
    
    if(!found || found.length == 0) {
        // create full url 
        let fullUrl = req.protocol + '://' + req.get('Host') + req.originalUrl
        res.status(404).json({message:"URL not found", body:{slug:url, url:fullUrl}})
    } else {
        const result = await found.update({ $inc: { visits: 1} })
        console.log(found.url)
        res.status(302).redirect(found.url)
    }

}
 
// [POST] ../url
exports.postUrl  = async (req,res) => {
    
    console.log('postUrl: [POST] /url')
    let {url,slug} = req.body
    let {sub}      = req.user
    console.log("USER INFO.....", req.user)
    // we allow users to create custom slug
    if(!slug) { slug = nanoid(5)}

    slug = slug.toLocaleLowerCase()

    // check in db for slug
    const found      = await UrlModel.findOne({slug})
    const user       = await UserModel.findOne({_id:sub})

    if(!found || found.lenth == 0) {
        // create the full url 
        const newUrl = new UrlModel({
            userId: user._id,
            slug,
            url,
        })

        // save to db
        const result = await newUrl.save()
        const newURLAdded = await user.update({$inc:{urlsCreated:1, points: pointsEarned.createURL}})
        res.status(200).json({message:"Created successfully", body:{result, newURLAdded}})

    } else {
        res.status(409).json({message: "Resource already exists.", body:{slug: "", url:""}});
    }

}

// GET ALL URLS  => [GET] ../url  
exports.getAllUrls = async (req,res,next) => {
    console.log('getAllUrls: [GET] /url')
      try {
          const urls = await UrlModel.find()
            .lean()
            .select('_id userId slug url created visits');
      
          res.json({
            urls
          });
        } catch (err) {
          return res.status(400).json({
            message: 'There was a problem getting the urls'
          });
        }
  }