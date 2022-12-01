$(document).ready(function(){
    $('#btn_search').on('click', function(){
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString)

        console.log(params.get('search'))
        console.log(params.get('page_size'))
        console.log(params.get('page'))

        console.log($('#search').val())
        console.log()
    })
})