const express = require('express');
const http = require('http');
const url = require('url');
const fortune = require('./lib/fortune.js');
const rhymes = require('./lib/requestRhyme.js');

var rhymeRequestObject = {
	word:"yellow",
	number:3,
	type:"rhyme"
};

const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', "handlebars");
app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home', {
		fortune: fortune.getFortune(),
		rhymes: rhymes.requestRhyme(rhymeRequestObject),
		pageTestScript: '/qa/tests-home.js',
	} );
});

app.get('/about', function(req, res){
	res.render('about');
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl-C to terminate.');
});