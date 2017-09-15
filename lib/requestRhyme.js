const Client = require('node-rest-client').Client;

var client = new Client();
var rhymesResponseArray = [];
var errorResponse = "";

function rhymeRequestCompiler(wordToRhyme) {
	const urlBase = "https://api.datamuse.com/words?rel_rhy=";
	const urlMix = urlBase + wordToRhyme;
	client.get(urlMix, function (data, response) {
		data.forEach(function(item){
			rhymesResponseArray.push(item.word);
		});
	});
}

function verifyRequest(testObject) {
	if(typeof testObject.word !== 'string') {
		errorResponse = "Not a valid word";
		return true;
	} else if (typeof testObject.number !== 'number') {
		errorResponse = "Invalid number requested";
		return true;
	} else {
		return false;
	}
}

function checkRhymesLength(numberOfRhymesRequested) {
	if(rhymesResponseArray.length < 1) {
		errorResponse = "No matches found";
		return true;
	} else if (rhymesResponseArray.length < numberOfRhymesRequested) {
		var i = 0;
		while (rhymesResponseArray.length < numberOfRhymesRequested) {
			var repeat = rhymesResponseArray[i];
			rhymesResponseArray.push(repeat);
			i++;
		}
		return false;
	} else {
		return false;
	}
}

exports.requestRhyme = function(rhymeRequestObject) {
	console.log(rhymeRequestObject.word);
	if(verifyRequest(rhymeRequestObject)){
		return errorResponse;
	}
	rhymeRequestCompiler(rhymeRequestObject.word);
	if(checkRhymesLength(rhymeRequestObject.number)){
		return errorResponse;
	} else {
		return rhymesResponseArray.slice(0,rhymeRequestObject.number);
	}
}