$(window).scroll(function(){

    console.log("loaded")
    
    var wScroll = $(this).scrollTop();

     $('.background').css({
        'transform' : 'translate(0px,-' + wScroll / 80 + '%)' 
    });

    $('.card').css({
        'transform' : 'translate(0px,' + wScroll / 6 + '%)' 
    });

    $(".card").css("opacity", 1.2 - wScroll / 300);

    
    navOffset = $('.navwrap').offset().top;
    console.log(navOffset)

    if(wScroll > navOffset){
        // $( ".navwrap" ).removeClass( "navwrap" ).addClass( "fixed-nav" );
        console.log('success is delicious');
    }
    
    
});