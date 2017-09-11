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

	
})();

function setSectionHeight() {
	var $mainSections = $('.mainSection');
	setHeight100($mainSections);
}

function setHeight100(object) {
	object.css('height', '100%');
}