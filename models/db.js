const { default: mongoose } = require("mongoose");

var dburl = 'mongo'

mongoose.connect(dburl);
mongoose.connection.on('connected',()=>{console.log('connected to ' + dburl)});
mongoose.connection.on('error', (error)=>{console.log(error)});