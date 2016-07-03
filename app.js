var express = require('express'); //object we can use
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var nav = [{Link:'/Books', Text: 'Book'}, {Link: '/Authors', Text:'Author'}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

var cookieParser = require('cookie-parser'); //the thing that will 
var passport = require('passport');
var session = require('express-session');

//req = request stuff from the browser
//Res = stuff we're dealing wil

//This is middleware stuff
app.use(express.static('public')); //look for public dir and serve up files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);
//app.use(express.static('src/views'));
app.set('views', './src/views'); //tell express where the view files are


// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));

app.set('view engine', 'ejs');




app.use('/Books', bookRouter); //middleware looks to see if goes to stuff
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
app.get('/', function(req,res){
    //res.send('Hello World');
    res.render('index', {title: 'Hello from render in EJS', 
    nav:[{Link:'/Books', Text: 'Books'}, 
    {Link: '/Authors', Text:'Authors'}]}); //overrides the serve up of index.html, render keyword is important
});

app.get('/bookListView', function(req,res){
    res.send('Hello Books');
});

app.listen(port, function(err){
    console.log('running server on port ' + port);
});