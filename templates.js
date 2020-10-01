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
                    <div class="icon"><i ${gif.id} class="far fa-trash-alt"></i></div>
                    <div class="icon"><i ${gif.id} class="far fa-heart"></i></div>
                    <div class="icon"><i ${gif.id} class="fas fa-download"></i></div>
                    <div class="icon"><i ${gif.id} class="fas fa-expand-alt"></i></div>
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