const UrlModel   = require('../models/url.model')
// string ID generator faster than UUID
const {nanoid}   = require('nanoid')
const UserModel = require('../models/user.model')

// [GET] ../url/:id
exports.getUrl   = async (req, res) => {
    
    console.log('getUrl: [GET] /url/:id')
    // check in db for slug send as param
    const slug   = req.params
    const found  = await UrlModel.findOne({slug})
    
    if(!found || found.length == 0) {
        // create full url 
        let fullUrl = req.protocol + '://' + req.get('Host') + req.originalUrl
        res.status(404).json({message:"URL not found", body:{slug:url, url:fullUrl}})
    } else {
        const result = await found.update({ $inc: { visits: 1} })
        res.status(302).redirect(found.url)
    }

}
 
// [POST] ../url
exports.postUrl  = async (req,res) => {
    
    console.log('postUrl: [POST] /url')
    let {url,slug} = req.body
    let {sub}      = req.user
    // we allow users to create custom slug
    if(!slug) { slug = nanoid(5)}

    slug = slug.toLocaleLowerCase()

    // check in db for slug
    const found      = await UrlModel.findOne({slug})
    const user       = await UserModel.findOne({_id:sub})

    if(!found || found.lenth == 0) {
        // create the full url 
        const newUrl = new UrlModel({
            userId: req.user.sub,
            slug,
            url,
        })

        // save to db
        const result = await newUrl.save()
        const newURLAdded = await user.update({$inc:{urlsCreated:1}})
        res.status(200).json({message:"Created successfully", body:result})

    } else {
        res.status(409).json({message: "Resource already exists.", body:{slug: "", url:""}});
    }

}