var createButton  = (page, distance) => {
    button = '';
    if(parseInt(page)+distance <= 0){
        return '';
    }
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", parseInt(page)+distance);
    btn = searchParams.toString();
    button = `
        <li class="page-item">
            <a class="page-link page-${parseInt(page)+distance}" href="pesquisa.html?${btn}">${parseInt(page)+distance}</a>
        </li>
    `
    return button
}
var initGamesList = function (search, page=1, page_size=24) {
    if(page == null){
        page = 1;
    }
    var url = '';
    var key = '&key=9bcd3f7f965d491ead40005e7c50b378'
    if(!search){
        url = 'https://api.rawg.io/api/games?ordering=popularity' + '&page=' + page + '&page_size=' + page_size + key
    }else{
        url = 'https://api.rawg.io/api/games?search=' + search + '&page=' + page + '&page_size=' + page_size + key
    }
    
    var cards = '';
    // $(".loader-wrapper")
    $.get(
        url,
        function (response) {
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set("page", parseInt(page)+1);
            btnNext = searchParams.toString();

            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set("page", parseInt(page)-1);
            btnPrev = searchParams.toString();
            
            pages = Math.ceil(response.count/page_size);
            let paginator = ''
            if(page > 1){
                paginator = `<li class="page-item"><a class="page-link" href="pesquisa.html?${btnPrev}">Anterior</a></li>`;
            }

            for (let index = -3; index < 3; index++) {
                if(pages >= parseInt(page) + index){
                    paginator += createButton(page, index) 
                }
            }
            if(pages > page){
                paginator += `<li class="page-item"><a class="page-link" href="pesquisa.html?${btnNext}">Próxima</a></li>`;
            }
            $("#games-items").removeAttr("style")
            $('.pagination').html(paginator)
            let currentPage = $("#page").val()
            $(".page-"+currentPage).addClass("active");
            response.results.forEach(result => {
                cards += `
        <div class="col preview-game" data-target="${result.id}" style="cursor: pointer;height: 290px;">
          <div class="card card-cover h-100 overflow-hidden text-bg-dark shadow-lg" style="background-image: url('${result.background_image}'); background-size: cover">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 text-center">
              <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style="text-shadow: 1px 1px 2px black, 0 0 1em black, 0 0 0.2em black;">${result.name}</h3>
                </li>
              </ul>
            </div>
          </div>
        </div>`
            });
            
            $('#custom-cards .row').html(cards)
            // $(".loader-wrapper").fadeOut("slow" | 4000)
        }
    );
}

$(document).ready(function () {
    // const page_size = 20;
    const modalToggle = document.getElementById('gameModal'); 
    const myModal = new bootstrap.Modal(document.getElementById('gameModal'))
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString)
    const search = params.get('search'); 
    const page = params.get('page');
    $("#page").val(page)
    $("#search").val(search)
    initGamesList(search, page);
    $( "body" ).delegate( ".preview-game", "click", function() {
        let idTarget = $(this).attr('data-target');
        var key = '?key=9bcd3f7f965d491ead40005e7c50b378'
        url = 'https://api.rawg.io/api/games/'+idTarget + key
        $.get(
            url,
            function (response) {
                console.log(response)
                $('#modalBody').removeAttr("style");
                $('.modal-body').html(response.description)
                $("#modalTitle").html(response.name)
                $(this).data("target", response.id)
                $("#site").attr("href", response.website)
                $("#visualizar").attr("href", 'detalhes.html?id='+response.id)

            }
        );
        myModal.show(modalToggle)

        // alert(idTarget)
    })
})