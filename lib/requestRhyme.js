const Client = require('node-rest-client').Client;

let client = new Client();
let rhymesResponseArray = [];
let errorResponse = "";

const apiDatamuseUrlBase = "https://api.datamuse.com/words?";

function rhymeRequestCompiler(wordToRhyme, topic) {
	const rhymeCode = "rel_rhy=";
	const topicCode = "&topics=";
	const urlMix = apiDatamuseUrlBase + rhymeCode + wordToRhyme + topicCode + topic + "&max=6";
	sendApiRequest(urlMix, rhymesResponseArray);
}

function adjectiveRequestCompiler(word) {
	const adjectiveCode = "rel_jjb=";
	const urlMix = apiDatamuseUrlBase + adjectiveCode + word;
}

function sendApiRequest(urlMix, targetArray) {
	client.get(urlMix, function (data, response) {
		data.forEach(function(item){
			targetArray.push(item.word);
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
	if(!rhymesResponseArray.length) {
		errorResponse = "No matches found";
		return true;
	} else if (rhymesResponseArray.length < numberOfRhymesRequested) {
		let i = 0;
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
	rhymeRequestCompiler(rhymeRequestObject.word, rhymeRequestObject.topic);
	if(checkRhymesLength(rhymeRequestObject.number)){
		return errorResponse;
	} else {
		return rhymesResponseArray.slice(0,rhymeRequestObject.number);
	}
}