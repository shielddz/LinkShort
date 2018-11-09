const express = require('express');
const router = express.Router();
const length = 5;
//Link model
const Link = require('../../models/Link');

router.get('/result', (req,res)=>{
    res.render('result', {
        short : req.flash('short'),
        error : req.flash('error')
    });
})
// @route GET api/links
// @desc Get all links
// @access Public
router.get('/', (req, res)=>{
    Link.find()
    .then(links => res.json(links));
});

// @route POST api/links
// @desc create a short link
// @access public
router.post('/', async (req, res) => {
    let specified = req.body.short;
    let short = await makeShort(specified);
    let url = await makeUrl(req.body.url);
    if(specified != short){
        req.flash("error","The specified link is already used.");
    }
    const newLink = new Link({
        url: url,
        short:short
    });
  
    newLink.save().then(link => {
        req.flash('short', link.short);  
        res.redirect('/api/result');
    });
});

async function makeShort(specified) {
    let cond = true;
    let short;
    if(specified){
        short = specified;
        let query = { short:short};
        cond = await findOne(query);
    }
    while (cond) {
      short = (Math.random() * 1000).toString(32).replace(/\./g, '').substr(0, length);
      let query = { short: short };
      cond = await findOne(query);
    }
    return short;
}

function findOne(query) {
    return new Promise(resolve => {
        Link.findOne(query, (err, link) => {
        if (err) resolve(false);
        if (!link) {
            return resolve(false);
        }
        return resolve(true);
        });
    })
}

async function makeUrl(url){
    return new Promise(resolve =>{
        if(url.includes("http://")||url.includes("https://")){
            return resolve(url);
        }else{
            return resolve("http://"+url);
        }
    });
}

module.exports = router;