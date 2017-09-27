const Client = require('node-rest-client').Client;
const waitUntil = require('wait-until');

let client = new Client();
let currentRequestArray = [];

let responseObject1 = function() {
	this.words = [];
	this.type = '';
	this.error = {
		indicator: false,
		message: '',
	};
}
const apiDatamuseUrlBase = "https://api.datamuse.com/words?";

function rhymeRequestCompiler(wordToRhyme, topic) {
	const rhymeCode = "rel_rhy=";
	const topicCode = "&topics=";
	const urlMix = apiDatamuseUrlBase + rhymeCode + wordToRhyme + topicCode + topic + "&max=10";
	sendApiRequest(urlMix);
}

function adjectiveRequestCompiler(word) {
	const adjectiveCode = "rel_jjb=";
	const urlMix = apiDatamuseUrlBase + adjectiveCode + word + "&max=10";
	sendApiRequest(urlMix);
}

function triggerRequestCompiler(word) {
	const triggerCode = "rel_trg=";
	const urlMix = apiDatamuseUrlBase + triggerCode + word + "&max=10";
	sendApiRequest(urlMix);
}

function nextWordRequestCompiler(word) {
	const nextWordCode = "lc=";
	const urlMix = apiDatamuseUrlBase + nextWordCode + word + "&max=10";
	sendApiRequest(urlMix);
}

function previousWordRequestCompiler(word) {
	const previousWordCode = "rc=";
	const urlMix = apiDatamuseUrlBase + previousWordCode + word + "&max=10";
	sendApiRequest(urlMix);
}


function soundsLikeRequestCompiler(word) {
	const soundsLikeWordCode = "sl=";
	const urlMix = apiDatamuseUrlBase + soundsLikeWordCode + word + "&max=10";
	sendApiRequest(urlMix);
}

function sendApiRequest(urlMix) {
	client.get(urlMix, function (data, response) {
		data.forEach(function(item){
			currentRequestArray.push(item.word);
		});
	});
}
function verifyRequest(testObject, responseObject) {
	if(typeof testObject.word !== 'string') {
		responseObject.error.message = "Not a valid word";
		responseObject.error.indicator = true;
		return true;
	} else if (typeof testObject.number !== 'number') {
		responseObject.error.message = "Invalid number requested";
		responseObject.error.indicator = true;
		return true;
	} else if (testObject.number < 1){
		responseObject.error.message = "Invalid number requested";
		responseObject.error.indicator = true;
		return true;
	} else {
		return false;
	}
}

function checkRhymesLength(numberRequested, targetArray, responseObject) {
	if(!targetArray.length) {
		responseObject.error.message = "No matches found";
		responseObject.error.indicator = true;
		return true;
	} else if (targetArray.length < numberRequested) {
		responseObject.error.message = "Only " + targetArray.length + " matches found";
		responseObject.error.indicator = true;
		return true;
	} else {
		return false;
	}
}

function chooseCompiler (rhymeRequestObject) {
	if(rhymeRequestObject.type === 'rhyme') {
		rhymeRequestCompiler(rhymeRequestObject.word, rhymeRequestObject.topic);
		return true;
	} else if (rhymeRequestObject.type === 'adjective') {
		adjectiveRequestCompiler(rhymeRequestObject.word);
	} else if (rhymeRequestObject.type === 'trigger') {
		triggerRequestCompiler(rhymeRequestObject.word);
	} else if (rhymeRequestObject.type === 'next') {
		nextWordRequestCompiler(rhymeRequestObject.word);
	} else if (rhymeRequestObject.type === 'soundsLike') {
		soundsLikeRequestCompiler(rhymeRequestObject.word);
	} else if (rhymeRequestObject.type === 'previous') {
		previousWordRequestCompiler(rhymeRequestObject.word);
	} else {
		console.log('unexpected error when choosing compiler');
		return;
	}
}

exports.requestRhyme = function(rhymeRequestObject) {
	let targetArray = [];
	let responseObject = new responseObject1();
	responseObject.type = rhymeRequestObject.type;
	if(verifyRequest(rhymeRequestObject, responseObject)){
		return responseObject.error.message;
	}
	chooseCompiler(rhymeRequestObject);
	targetArray = currentRequestArray;
	if(checkRhymesLength(rhymeRequestObject.number, targetArray, responseObject)){
		return responseObject.error.message;
	} else {
		currentRequestArray = [];
		responseObject.words = targetArray.slice(0,rhymeRequestObject.number);
		return responseObject;
	}
}

/*waitUntil()
	    .interval(500)
	    .times(10)
	    .condition(function(chooseCompiler) {
	    	process.nextTick(function() {
            	chooseCompiler(rhymeRequestObject);
        	});
	    })
	    .done(function(result) {
	        targetArray = currentRequestArray;
	    });*/