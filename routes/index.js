var express = require('express');
var controllers = require('../controllers/indexControllers');
var router = express.Router();
const Note = require('../models/note');
const { ObjectId } = require('mongodb');
const passport = require('passport');
const jwtd = require('jwt-decode');

/* GET home page. */
router.get('/', controllers.mainPage);
router.get('/note', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.render('note', { token: req.query.token });
});

router.post('/note', passport.authenticate('jwt', { session: false }), async function (req, res) {
    let date = new Date();
    let note = new Note({ data: req.body.newNote, time: date.toISOString(), author: jwtd(req.query.token).user.username });
    await note.save();
    res.redirect('notes?token=' + req.query.token);
});

router.get('/notes',passport.authenticate('jwt', { session: false }), async function (req, res) {
    let user = jwtd(req.query.token).user.username;
    const notes = await Note.find({author: user});
    console.log(req.query.token);
    res.render('notes', { notes, token: req.query.token });
});

router.get('/notes/delete/:nid', passport.authenticate('jwt', { session: false }), async function (req, res) {
    await Note.deleteOne({ _id: req.params.nid });
    res.redirect(url.format({
        pathname:"/notes",
        query:req.query,
    }));
});

router.get('/notes/edit/:nid', async function (req, res) {
    const note = await Note.findById(req.params.nid)
    res.render('onenote', { note })
});

router.post('/notes/edit/:nid', async function (req, res) {
    console.log(req.params.nid);
    await Note.findByIdAndUpdate(ObjectId(req.params.nid), { data: req.body.data });
    res.redirect('/notes');
});

module.exports = router;
