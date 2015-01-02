$(document).ready(function() {
	var jumbotronHeight = $('#jumbotron').outerHeight()
	  , $navbar = $('#navbar')
	  , navbarHeight = $navbar.height()
	  , $content = $('#content')
	  , $window = $(window);

	$window.bind('scroll', function() {
		if ($window.scrollTop() >= jumbotronHeight) {
			$navbar.addClass('navbar-fixed-top');
			$content.css('padding-top', navbarHeight);
		} else {
			$navbar.removeClass('navbar-fixed-top');
			$content.css('padding-top', 0);
		}
	});
});