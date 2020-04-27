// this function opens the sidebar for the map filter

function openGlobeSidebarFilter(){
    $(".fas").css('visibility', 'hidden');
    $('#filter-sidebar').css('visibility', 'visible');
}

//function closes the sidebar for the map filter

function closeGlobeSidebarFilter(){
    $('.fas').css('visibility', 'visible');
    $('#filter-sidebar').css('visibility', 'hidden');
}

$('#view').on('click', closeGlobeSidebarFilter());