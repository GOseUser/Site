var express = require('express');
var controllers = require('../controllers/indexControllers');
var router = express.Router();
const Note = require('../models/note');
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', controllers.mainPage);
router.get('/note', function(req, res){
    res.render('note');
});
router.post('/note', async function(req,res){
    let date = new Date();
    let note = new Note({data:req.body.newNote, time:date.toISOString()});
    await note.save();
    res.redirect('notes');
});

router.get('/notes', async function(req, res){
    const notes = await Note.find();
    res.render('notes',{notes});
});

router.get('/notes/delete/:nid', async function(req, res){
    await Note.deleteOne({_id:req.params.nid});
    res.redirect('/notes');
});

router.get('/notes/edit/:nid', async function(req, res){
    const note = await Note.findById(req.params.nid)
    res.render('onenote',{note})
});

router.post('/notes/edit/:nid', async function (req, res){
    console.log(req.params.nid);
    await Note.findByIdAndUpdate(ObjectId(req.params.nid),{data:req.body.data});
    res.redirect('/notes');
});

module.exports = router;
