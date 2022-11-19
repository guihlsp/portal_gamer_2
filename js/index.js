var initCarousel = function (page_size, idCarousel) {
    if ($("#" + idCarousel).length) {
        var sliders = '';
        var sliders_indicators = '';
        $.get(
            'https://api.rawg.io/api/games?page=1&page_size=' + page_size + '&key=9bcd3f7f965d491ead40005e7c50b378',
            function (response) {
                let i = 0;
                let active = 'active';
                response.results.forEach(result => {
                    console.log(result)
                    if (i != 0) active = '';
                    sliders += `
            <div class="carousel-item ${active}">   
            <img class="bd-placeholder-img" width="100%" height="100%" src="${result.background_image}" style="background-size: cover"/>
                <div class="container">
                <div class="carousel-caption">
                    <h1 class="sombra-titulo">${result.name}</h1>
                    <p class="sombra-titulo"><i class="fa fa-star mr-3" style="color: yellow" aria-hidden="true"></i>Avaliação: ${result.rating}/${result.rating_top}</p>
                    <p class="sombra-titulo"><span class="badge bg-info">${result.genres[0].name}</span><p class="sombra-titulo"><span class="badge bg-secondary">${result.genres[1].name}</span></p>

                </div>
                </div>
            </div>`
                    sliders_indicators += `<button style="width: 50px; height: 15px; background-color: white; cursor: pointer;" type="button" data-bs-target="#${idCarousel}" data-bs-slide-to="${i}" class="${active}" aria-label="Slide ${i}"></button>`;
                    i++
                });
                $('#' + idCarousel + ' .carousel-inner').html(sliders)
                $('#' + idCarousel + ' .carousel-indicators').html(sliders_indicators)
                $('#carousel-load').removeAttr("style");
            }
        );
    }
}
{/* <p><a class="btn btn-lg btn-primary">Saiba mais</a></p> */}

var initPublishers = function (page_size, idPublisher) {   
    if ($("#" + idPublisher).length) {
        var pubs = '';
        $.get(
            'https://api.rawg.io/api/publishers?page=1&page_size=' + page_size + '&key=9bcd3f7f965d491ead40005e7c50b378',
            function (response) {
                let i = 0;
                let item = 'item';
                response.results.forEach(result => {
                    console.log(result)
                    pubs += `
            <div class="col-lg-4 md-6 sm-12 ${item}">
                <div class="card card-cover overflow-hidden text-bg-dark shadow-lg">
                    <h2 class=>${result.name}</h2>
                    <img class="" src="${result.image_background}" style="background-size: cover; width: auto;">
                    </img>
                    <h4 class="fw-normal text-decoration-underline mt-2 mb-2">Principais jogos</h4>
                    <p>${result.games[0].name}</p>
                    <p>${result.games[1].name}</p>
                    <p>${result.games[2].name}</p>
                    
                </div>
            </div>` 
            // <p><a class="btn btn-light" href="#">Saiba mais</a></p>
                    i++
                });
                $('#' + idPublisher + ' .mainPublisher').html(pubs)
            }
        );
    }
}



$(document).ready(function () {
    const page_size = 3;
    initCarousel(page_size, 'banner_principal');
    initPublishers(page_size, 'Publisher');
})