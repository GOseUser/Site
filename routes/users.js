var express = require('express');
var router = express.Router();
const User = require("../models/user");
const passport = require('passport');
const jwt = require('jsonwebtoken');
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {
  res.render('registration');
});


router.post('/register', passport.authenticate('signup',{session:false}),function (req, res){
  res.send(req.user);
});

router.get('/login', (req, res)=>{
res.render('login');
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login',
    async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
            const body = { _id: user._id, username: user.username };
            const token = jwt.sign({ user: body }, 'NotesLoginSecret');
            return res.json({ token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }) (req, res, next);
}
);
router.get('/profile', passport.authenticate('jwt', {session:false}), (req,res) =>{
res.render('profile');
});
module.exports = router;