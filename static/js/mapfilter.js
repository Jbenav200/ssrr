// this function opens the sidebar for the map filter

function openSidebarFilter(){
    $(".fas").css('visibility', 'hidden');
    $('#filter-sidebar').css('visibility', 'visible');
}

//function closes the sidebar for the map filter

function closeSidebarFilter(){
        $('.fas').css('visibility', 'visible');
        $('#filter-sidebar').css('visibility', 'hidden');

}

$('#map').on('click', closeSidebarFilter());