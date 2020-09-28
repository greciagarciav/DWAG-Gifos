export const tempTrendOp = (trendWord) => {
    let temp = '';
    temp += `<span id="${trendWord}">${trendWord}</span>`;
    return temp;
};

export const suggestionSearch = (dataSuggestion, ulList) => {
    dataSuggestion.forEach((suggestion) => {
        const liSuggestion = document.createElement('li');
        liSuggestion.setAttribute("id", suggestion.name);

        const txtSuggestion = document.createTextNode(suggestion.name);
        liSuggestion.appendChild(txtSuggestion);
        ulList.appendChild(liSuggestion);
    });
};

export const tempGif = (data) => {
    let temp = '';
    data.forEach((gif) => {
        temp += `
        <div id="${gif.id}">
            <img src="${gif.images.original.url}" alt="${gif.title}">
            <div class="card">
                <div class="group-icons">
                    <div id="${gif.id}-remove" class="icons icon-delete"></div>
                    <div id="${gif.id}-add" class="icons icon-heart"></div>
                    <div id="${gif.id}-download" class="icons icon-download"></div>
                    <div id="${gif.id}-max" class="icons icon-max"></div>
                </div>
                <div class="text-card">
                    <div class="text-card-user">${gif.username !== '' ? gif.username : 'User' }</div>
                    <h3 class="text-card-title">${gif.title}</h3>
                </div>
            </div>
        </div>`;
    })
    return temp;
};

export const gifsResultSearch = (inputSearch) => {
    const sectResults = document.getElementById('stc-results');
    const divResults = document.createElement('div');
    sectResults.appendChild(divResults);

    const pResults = document.createElement('p');
    const titleResult = document.createTextNode(inputSearch);
    pResults.appendChild(titleResult);
    divResults.appendChild(pResults);

    const divResultGifs = document.createElement('div');
    divResultGifs.setAttribute("id", "root");
    divResults.appendChild(divResultGifs);

    const btnMore = document.createElement('button');
    btnMore.setAttribute("id", "see-more");
    btnMore.textContent = 'VER MÁS';
    divResults.appendChild(btnMore);
};