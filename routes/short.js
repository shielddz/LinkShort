const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

//@route Redirect :id
//@access public
router.get('/:short', (req, res)=>{
    let query = {short:req.params.short};
    Link.findOne(query, (err,link) => {
        if(err) throw err;
        if(!link){
            req.flash('error', "No link with that url was found.");
            res.redirect('/');
            return;
        }
        if(link){
            res.writeHead(302, {
                'Location': link.url
            });
            res.end();
        }
    })
});

router.get('/', (req,res)=>{
    res.render('home', {error: req.flash('error')});
})
module.exports = router;