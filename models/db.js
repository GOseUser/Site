const { default: mongoose } = require("mongoose");

var dburl = 'mongodb+srv://site:sitepass@sitedb.o5gq3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(dburl);
mongoose.connection.on('connected',()=>{console.log('connected to ' + dburl)});
mongoose.connection.on('error', (error)=>{console.log(error)});