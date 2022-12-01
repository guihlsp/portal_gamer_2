var detalhesJogo = function (detalhes) {
    var detail = ''
    var key = '?key=9bcd3f7f965d491ead40005e7c50b378';
    var url = '';

    jogo = ''
    if (detalhes) {
        jogo = '/' + detalhes;
    }
    url = 'https://api.rawg.io/api/games' + jogo + key;


    $.get(
        url,
        function (response) {
            detail += `
                <div id="firstCard" class="card bg-dark text-light">
                    <div class="card-title row mb-3">
                        <h1 class="text-center align-center mt-4">
                        ${response.name}
                        </h1>
                    </div>
                    <div class="card-body" style="">
                        <div class="col-12 mb-3" style="
                        background-image: url('${response.background_image}'); 
                        background-size: cover; 
                   
                        left: 0;
                        z-index: 1;
                        display: block;
                        height: 300px">
                        </div>
                        ${response.description}
                    </div>
                    <div class="card-footer pt-5 text-center">
                        <div class="row col-12 text-center">
                            <div class="col-4 text-center">
                                <p>Gênero:</p>
                                <p><span class="badge bg-primary text-bg-danger">${response.genres[0].name}</span></p>
                            </div>
                            <div class="col-4 text-center">
                                <p>Avaliação:</p>
                                <p><i class="fa fa-star mr-3" style="color: yellow" aria-hidden="false"></i> ${response.rating}/${response.rating_top}</p>
                            </div>
                            <div class="col-4 text-center">
                                <p>Data de lançamento:</p>
                                <p><span class="badge bg-primary text-bg-danger">${moment(response.released, "YYYY-MM-DD").format("DD/MM/YYYY")}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="secondCard" class="card bg-dark text-light mt-5">
                    <div class="card-title row">
                        <h2 class="text-center align-center mt-4">
                            Informações adicionais
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="row col-12 mb-3 text-center">
                            <div class="col-4 text-center">
                                <p>Desenvolvido por:</p>
                                <p><span class="badge bg-light text-dark">${response.developers[0].name}</span></p>
                            </div>
                            <div class="col-4">
                                <p>Plataforma principal:</p>
                                <p><span class="badge bg-light text-dark">${response.parent_platforms[0].platform.name}</span></p>
                            </div>
                            <div class="col-4">
                                <p>Publicado por:</p>
                                <p><span class="badge bg-light text-dark">${response.publishers[0].name}</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <a id="site" type="button" class="btn btn-primary col-6 mx-auto" href="${response.website}" target="_blank"><i class="fa fa-external-link" aria-hidden="true" ></i>  Acessar site do jogo</a>
                    </div>
                </div>

                <div id="thirdCard" class="card bg-dark text-light mt-5">
                    <div class="card-title row">
                        <h2 class="text-center align-center mt-4">
                            Onde comprar?
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="row col-12 mb-3 text-center">
                            <div class="col-6 text-center">
                                <p><a href="https://${response.stores[0].store.domain}" target="_blank" class="btn btn-light"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                ${response.stores[0].store.name}</a></p>
                            </div>
                            <div class="col-6">
                                <p><a href="https://${response.stores[1].store.domain}" target="_blank" class="btn btn-light"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                ${response.stores[1].store.name}</a></p>
                            </div>
                        </div>
                    </div>
                </div>`


            $('#detalhes').html(detail);
            $('#detalhes').removeAttr("style");
        }
    )
}



$(document).ready(function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const detalhes = params.get('id')
    detalhesJogo(detalhes);

});