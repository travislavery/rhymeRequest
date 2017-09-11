suite('"Home" Page Tests', function(){
	test('page should have a link to about section', function(){
		assert($('a[href="#aboutUs"]').length);
	});
});