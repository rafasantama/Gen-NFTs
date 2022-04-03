$(window).on('load', function(){

    //preloader
    $(".preloader").delay(300).animate({
       "opacity" : "0"
       }, 1500, function() {
       $(".preloader").css("display","none");
   });
})