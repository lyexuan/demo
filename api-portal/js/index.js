$(function(){
	$('#js-menu-document').click(function(event) {
		$(this).toggleClass('active');
		$('#js-menu-pop').slideToggle();
	});
});