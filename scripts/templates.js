export const tempTrendOp = (trendWord) => {
    let temp = '';
    temp += `<span id="${trendWord}">${trendWord}</span>`;
    return temp;
};

export const suggestionSearch = (dataSuggestion, ulList) => {
    dataSuggestion.forEach((suggestion) => {
        const searchIcon = document.createElement('i');
        searchIcon.setAttribute("class", "fas fa-search");
        searchIcon.setAttribute("id", suggestion.name);

        const liSuggestion = document.createElement('li');
        liSuggestion.setAttribute("id", suggestion.name);
        liSuggestion.setAttribute("class", "suggestion");

        const txtSuggestion = document.createTextNode(suggestion.name);
        
        liSuggestion.appendChild(searchIcon);
        liSuggestion.appendChild(txtSuggestion);
        ulList.appendChild(liSuggestion);
    });
};

export const tempGif = (data) => {
    let temp = '';
    data.forEach((gif) => {
        temp += `
        <div class="ctn-gif" id="${gif.id}">
            <img class="img-gif" src="${gif.images.original.url}" alt="${gif.title}">
            <div class="overlay">
                <div class="group-icons">
                    <div id="${gif.id}" class="icon"><i class="far fa-trash-alt"></i></div>
                    <div id="${gif.id}" class="icon"><i class="far fa-heart"></i></div>
                    <div id="${gif.id}" class="icon"><i class="fas fa-download"></i></div>
                    <div id="${gif.id}" class="icon"><i class="fas fa-expand-alt"></i></div>
                </div>
                <div class="text-card">
                    <p class="text-user">${gif.username !== '' ? gif.username : 'User' }</p>
                    <p class="text-gift">${gif.title}</p>
                </div>
            </div>
        </div>`;
    })
    return temp;
};

export const gifsResultSearch = (inputSearch) => {
    const sectResults = document.getElementById('stc-results');
    sectResults.innerHTML = '';
    const divResults = document.createElement('div');
    divResults.setAttribute("class", "ctn-results");
    sectResults.appendChild(divResults);

    const pResults = document.createElement('p');
    pResults.setAttribute("class", "title-results");
    const titleResult = document.createTextNode(inputSearch);
    pResults.appendChild(titleResult);
    divResults.appendChild(pResults);

    const divResultGifs = document.createElement('div');
    divResultGifs.setAttribute("id", "root");
    divResultGifs.setAttribute("class", "root");
    divResults.appendChild(divResultGifs);

    const btnMore = document.createElement('button');
    btnMore.setAttribute("id", "see-more");
    btnMore.setAttribute("class", "see-more");
    btnMore.textContent = 'VER MÁS';
    divResults.appendChild(btnMore);
};

export const viewNoResults = `
      <div class="error-results">
          <img src="assets/icon-busqueda-sin-resultado.svg" alt="Busqueda-sin-resultados"><br><br>
          <p>Intenta con otra búsqueda.</p><br>
      </div>
  `
;

export const infoModal = (idGif) => {
    let info = '';
    info += `
    <div class="modal-content">
    <span id="sp" class="close">&times;</span>
        <div class="ctn-gif" id="${idGif.id}">
            <img class="img-gif" src="${idGif.images.original.url}" alt="${idGif.title}">
            <div class="overlay">
                <div class="text-card">
                    <p class="text-user">${idGif.username !== '' ? idGif.username : 'User' }</p>
                    <p class="text-gift">${idGif.title}</p>
                </div>
                <div class="group-icons">
                    <div id="${idGif.id}" class="icon favorite"><i class="far fa-heart"></i></div>
                    <div id="${idGif.id}" class="icon download"><i class="fas fa-download"></i></div>
                </div>
                
            </div>
        </div>
    </div>
    `;
    return info;
};

export const createModalCtn = (sct) => {
    const section = document.getElementById(sct);
    const container = document.createElement('div');
    container.setAttribute("id", "modal");
    container.setAttribute("class", "modal");
    section.insertBefore(container, section.firstChild);
}

export const tempGifav = (dataEachGif) => {
    let temp = '';
    // data.forEach((gif) => {
        temp += `
        <div class="ctn-gif" id="${dataEachGif.id}">
            <img class="img-gif" src="${dataEachGif.images.original.url}" alt="${dataEachGif.title}">
            <div class="overlay">
                <div class="group-icons">
                    <div id="${dataEachGif.id}" class="icon"><i class="far fa-trash-alt"></i></div>
                    <div id="${dataEachGif.id}" class="icon"><i class="far fa-heart"></i></div>
                    <div id="${dataEachGif.id}" class="icon"><i class="fas fa-download"></i></div>
                    <div id="${dataEachGif.id}" class="icon"><i class="fas fa-expand-alt"></i></div>
                </div>
                <div class="text-card">
                    <p class="text-user">${dataEachGif.username !== '' ? dataEachGif.username : 'User' }</p>
                    <p class="text-gift">${dataEachGif.title}</p>
                </div>
            </div>
        </div>`;
    // })
    return temp;
};