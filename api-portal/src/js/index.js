$(function(){
	$('#js-menu-document').click(function(event) {
		$(this).toggleClass('active');
		$('#js-menu-pop').slideToggle();
	});
	$(document).on('click',function(e){
		var $target = $(e.target);
		if($target.closest('#js-menu-pop').length === 0 && $target.closest('#js-menu-document').length === 0){
			$('#js-menu-document').removeClass('active');
			$('#js-menu-pop').slideUp();
		}
	});
});