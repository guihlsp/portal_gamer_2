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
            <img class="bd-placeholder-img" width="100%" height="100%" src="${result.background_image}" style="background-size: contain"/>
                <div class="container">
                <div class="carousel-caption">
                    <h1 class="sombra-titulo">${result.name}</h1>
                    <p class="sombra-titulo">Descrição do jogo</p>
                    <p class="sombra-titulo">Avaliação: ${result.rating}/${result.rating_top}</p>
                    <p><a class="btn btn-lg btn-primary">Saiba mais</a></p>
                </div>
                </div>
            </div>`
                    sliders_indicators += `<button type="button" data-bs-target="#${idCarousel}" data-bs-slide-to="${i}" class="${active}" aria-label="Slide ${i}"></button>`;
                    i++
                });
                $('#' + idCarousel + ' .carousel-inner').html(sliders)
                $('#' + idCarousel + ' .carousel-indicators').html(sliders_indicators)
                $('#carousel-load').removeAttr("style");
            }
        );
    }
}

$(document).ready(function () {
    const page_size = 6;
    initCarousel(page_size, 'banner_principal');
})