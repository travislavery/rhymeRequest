const express = require('express');
const url = require('url');
const fortune = require('./lib/fortune.js');
const rhymes = require('./lib/requestRhyme.js');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//const users = require('./routes/users');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main'});

let rhymeRequestObject = {
	word:"example",
	number:10,
	type:"adjective",
	topic:""
};



app.engine('handlebars', handlebars.engine);
app.set('view engine', "handlebars");
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	let fortuneReq = fortune.getFortune();
	let rhymesReq = [];
	res.render('home', {
		fortune: fortuneReq,
		rhymes: rhymesReq,
		pageTestScript: '/qa/tests-home.js',
	} );
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), () => {
	console.log('Express started on http://localhost' + app.get('port') + '; press Ctrl-C to terminate.');
});


server.listen(80);
io.on('connection', function(socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('get a rhyme', function(data){
		let responseObject = rhymes.requestRhyme(data);
		socket.emit('rhymesRecieved', {responseObject});
	});
});

