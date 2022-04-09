const Note = require('../models/note');

function mainPage(req, res, next) {
    res.render('index', { title: 'Express' });
}

module.exports = {mainPage}