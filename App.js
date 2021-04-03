const express = require('express');

const path  = require('path');

const rootDir = require('./util/path');

const app = express();

app.set('view engine','ejs'); 
app.set('views','views');

const bparser= require('body-parser');

app.use(bparser.urlencoded({extended:true}));

//app.use(bparser.json());

const bodyParser = require("body-parser");
const InitiateMongoServer = require("./database/db");
InitiateMongoServer();

const visitors = require('./routes/visitor');
const admin_login = require('./routes/admin_login');
const student_login = require('./routes/student_login');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(visitors);
app.use(admin_login);
app.use(student_login);

app.use('/',(req,res,next)=>{
    res.send(path.join(rootDir,'views','Home.ejs'));
});

app.listen(3000);