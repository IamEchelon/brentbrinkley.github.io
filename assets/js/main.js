$(document).ready( function(){
    
    // variable inits
    let navOffset; //offsetTop of the nav wrapper

    function setOffset(){ //calculate offset of nav wrapper and set navOffset
        navOffset = $('.navwrap').offset().top;
    }

    setOffset(); //run on document load

    $(window).resize( function(){
        setOffset(); //run again on every resize event
    });

$(window).scroll(function(){
    
    var wScroll = $(this).scrollTop(); // check scroll position

     /*$('.background').css({
        'transform' : 'translate(0px,-' + wScroll / 80 + '%)' 
    });*/

    $('.card').css({
        'transform' : 'translate(0px,' + wScroll / 6 + '%)' 
    });

    $(".card").css("opacity", 1.2 - wScroll / 300);

    if(wScroll >= navOffset){
        // if window scroll is equal or greater than navoffset, add fixed class to all the things
        $('.background, .card-wrapper, .nav-wrap, body').addClass('is-fixed');
    }else{
        // otherwise remove it
        $('.background, .card-wrapper, .nav-wrap, body').removeClass('is-fixed');
    }
    
    
});

});