const fortune = require('../../lib/fortune.js');
const apiRequests = require('../../lib/requestRhyme.js');
const expect = require('chai').expect;

suite('Fortune cookie tests', function(){
	test('getFortune() should return a fortune', function(){
		expect(typeof fortune.getFortune() === 'string');
	});
});

suite('API request tests', function(){
	let testObject1 = {
		word: "cow",
		number:10,
		type:"adjective",
		topic:""
	};
	let testObject2 = {
		word: "cow",
		number:-3,
		type:"adjective",
		topic:""
	};
	let testObject3 = {
		word: "cow",
		number:"3",
		type:"adjective",
		topic:""
	};
	let testObject4 = {
		word: "",
		number:3,
		type:"rhyme",
		topic:""
	};
	let testObject5 = {
		word: 3,
		number:3,
		type:"rhyme",
		topic:""
	};
	test('requestRhyme() should return an array gathered from datamuse api', function() {
		expect(typeof apiRequests.requestRhyme(testObject1) === 'string');
		expect(apiRequests.requestRhyme(testObject1).length >= 1);
	})
	test('requestRhyme() should return "Invalid number requested" if testObject.number is < 1', function() {
		expect(apiRequests.requestRhyme(testObject2) === 'Invalid number requested');
	})
	test('requestRhyme() should return "Invalid number requested" if testObject.number is not a number', function() {
		expect(apiRequests.requestRhyme(testObject3) === 'Invalid number requested');
	})
	test('requestRhyme() should return "No matches found" if there are no matches found in the api database', function() {
		expect(apiRequests.requestRhyme(testObject4) === 'No matches found');
	})
	test('requestRhyme() should return "Not a valid word" if testObject.word isnt a string', function() {
		expect(apiRequests.requestRhyme(testObject5) === 'Not a valid word');
	})
})