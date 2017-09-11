var actionBegin = (function() {
	setSectionHeight();
	affixNavBar();
	$

	$(document).click(function (e) {
  		e.stopPropagation();
   		var container = $("#navbarTop");
   		if (container.has(e.target).length === 0 && $('#navCollapsed').attr('aria-expanded') === 'true') {
       		$('#navbarToggleBtn').click();
        }
	})

	var $navs = $('body').find('nav a')
	$($navs).on('click', function(event) {
		if (this.hash !== '') {
			event.preventDefault();
			var hash= this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800);
		}
	})

	function affixNavBar() {
		var $navbarTop = $('#navbarTop');
		var $navbarpxFromTop = $navbarTop.offset().top;
		var $windowpxFromTop = 0;
		if ($windowpxFromTop >= $navbarpxFromTop) {
			$navbarTop.affix();
		} else if ($windowpxFromTop < $navbarpxFromTop) {}
	}

	function checkOffsetTop (object) {
		$("'"+object+"'").offset().top;
	}

	function setSectionHeight() {
		var $mainSections = $('.mainSection');
		setHeight100($mainSections);
	}

	function setHeight100(object) {
		object.css('height', '100%');
	}
})()

var slide = (function() {


})()

function slideRight() {
	console.log($(event).closest('.row'))
	getCurrentHash();
}

function getCurrentHash() {

}