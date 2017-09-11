const fortuneCookies = [
	'Conquer your fears or they will conqure you.',
	'Rivers need springs.',
	'Do not fear what you do not know.',
	'You will have a pleasant surprise.',
	'Whenever possible, keep it simple',
];

exports.getFortune = function() {
	var idx = Math.floor(Math.random() * fortuneCookies.length);
	return fortuneCookies[idx];
};