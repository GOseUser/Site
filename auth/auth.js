const User = require('../models/user');
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local').Strategy;

passport.use('signup', new localStrategy({ usernameField: 'username', passwordField: 'password' }, async function (username, password, done) {
    try {
        const users = await User.find({}, { username: 1, _id: 0 });
        for (let user of users) if (user.username === username) return done(null, false, { message: 'username is already used' });
        let user = await User.create({ username, password });
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}
));

passport.use('login', new localStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
    try {
        let user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'User not found' });
        if (user.password != password) return done(null, false, { message: 'Wrong password' });
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.use(new jwtStrategy({ secretOrKey: 'NotesLoginSecret', jwtFromRequest: extractJwt.fromUrlQueryParameter('token') }, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        return done(error)
    }
}));