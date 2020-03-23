function openNav(){
    $(".fa-bars").css('visibility', 'hidden');
    $(".fa-filter").css('visibility', 'hidden');
    $(".nav-map").css('visibility', 'visible');
    $(".fa-times-circle").css('visibility', 'visible');
}

function closeNav(){
    $(".nav-map").css('visibility', 'hidden');
    $(".fa-times-circle").css('visibility', 'hidden');
    $(".fa-bars").css('visibility', 'visible');
    $(".fa-filter").css('visibility', 'visible');
}