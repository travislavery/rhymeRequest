
var actionBegin = (function() {
	setSectionHeight();

	$(document).click(function (e) {
  		e.stopPropagation();
   		var container = $("#navbarTop");
   		if (container.has(e.target).length === 0 && $('#navCollapsed').attr('aria-expanded') === 'true') {
       		$('#navbarToggleBtn').click();
        }
	});

	var $navs = $('body').find('nav a');
	$($navs).on('click', function(event) {
		if (this.hash !== '') {
			event.preventDefault();
			var hash= this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800);
		}
	});

    socket.on('news', function (data) {
    	console.log(data);
    });
	$('#testBtn').on('click', getWordToRhyme);
	var currentSentenceArray = [];
	socket.on('rhymesRecieved', function(data) {
		console.log(data.responseObject);
		postToPage(data, currentSentenceArray);
	});
})();

function setSectionHeight() {
	var $mainSections = $('.mainSection');
	setHeight100($mainSections);
}

function setHeight100(object) {
	object.css('height', '100%');
}

function getWordToRhyme() {
	var wordToRhyme = $("#rhymeSubject").val() || "";
	var numberRequested = Number($("#numberRequested").val()) || 10;
	var typeOfRequest = $("#typeOfRequest").val();
	var topicOfRequest = $("#topicSubject").val() || "";
	var rhymeRequestObject = {
		word: wordToRhyme,
		number: numberRequested,
		type: typeOfRequest,
		topic: topicOfRequest
	};
	sendObjectRequest(rhymeRequestObject);
}

function sendObjectRequest(object) {
	socket.emit('get a rhyme', object);
}

function getRandom(data, currentSentence) {
	var randomChoice = Math.floor(Math.random() * 10);
	currentSentence.push(data[randomChoice]);
}

function makeIntoSentence(array) {
	var putTogether = ''
	array.forEach(function(word) {
		putTogether = putTogether + word + " ";
	});
	return putTogether;
}

function postToPage (data, currentSentenceArray) {
	if (Array.isArray(data.responseObject.words)) {
		getRandom(data.responseObject.words, currentSentenceArray);
		var finishedSentence = makeIntoSentence(currentSentenceArray);
		$('#newlyRecievedRhymes').text(finishedSentence);
	} else {
		$('#newlyRecievedRhymes').text(data.responseObject);
	}
}