const Client = require('node-rest-client').Client;

var client = new Client();
const rhymes = [];

exports.requestRhyme = function(wordToRhyme) {
	const urlBase = "https://api.datamuse.com/words?rel_rhy=";
	const urlMix = urlBase + wordToRhyme;
	client.get(urlMix, function (data, response) {
		data.forEach(function(item){
			rhymes.push(item.word);
		})
		console.log(rhymes);
	})
	return rhymes;
}