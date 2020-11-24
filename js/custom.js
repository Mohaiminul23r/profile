$(document).ready(function(){
	 window.scrollTo(0,0);
  
});

function goTo(divid, classOne, classTwo){
	let d_id = divid;
	let class_1 = classOne;
	let class_2 = classTwo;
	let elem = $(document).find("#"+d_id+"");
	$(document).find("#"+class_1+"").addClass('show');
	$(document).find("#"+class_2+"").removeClass('show');
	$('html, body').animate({
        scrollTop: elem.offset().top
    }, 500);
}