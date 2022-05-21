const Note = require('../models/note');

function mainPage(req, res, next) {
    console.log(req.ads);
    res.render('index', { title: 'Note', ...req.data });
}

module.exports = {mainPage}