function openNav(){
    $(".fa-bars").css('visibility', 'hidden');
    $(".fa-filter").css('visibility', 'hidden');
    $(".fa-map").css('visibility', 'hidden');
    $(".nav-map").css('visibility', 'visible');
    $(".fa-times-circle").css('visibility', 'visible');
}

function closeNav(){
    $(".fa-times-circle").css('visibility', 'hidden');
    $(".nav-map").css('visibility', 'hidden');
    $(".fa-bars").css('visibility', 'visible');
    $(".fa-filter").css('visibility', 'visible');
    $(".fa-map").css('visibility', 'visible');
}

$(".fa-times-circle").css('visibility', 'hidden');