import { tempTrendOp, suggestionSearch, gifsResultSearch, tempGif, viewNoResults, infoModal, createModalCtn, tempGifav } from './templates.js'

let data = [];

const inputGift = document.getElementById('topic-gift');
const optsTrend = document.getElementById('options');
const suggestList = document.getElementById('suggest-list');
const iLeftSearch = document.getElementById('left-search-icon');
const iSearch = document.getElementById('search-icon');
const iClean = document.getElementById('clean-icon');
const resultsSection = document.getElementById('stc-results');
const btnMode = document.getElementById('mode');

const urlSearch = 'https://api.giphy.com/v1/gifs/search?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlTrendingWords = 'https://api.giphy.com/v1/trending/searches?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlSuggestSearch = 'https://api.giphy.com/v1/gifs/search/tags?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlTrendGifs = 'https://api.giphy.com/v1/gifs/trending?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlGifById = 'https://api.giphy.com/v1/gifs/';

// Método para url
const urlGet = (url, input, limit, offset) => {
    const keyword = `=${input}`;
    const limity = `&limit=${limit}`;
    const offst = `&offset=${offset}`;
    const result = url + keyword + limity + offst;
    return result;
};

// Método que hace el llamado a la API y retorna data
const sendApiRequest = async(url) => {
    let response = await fetch(url);
    let nextResponse = await response.json();
    data = nextResponse.data;
    return data;
};

// Método que asigna evento del modal a gifs
const assignCardEvent =  () => {
    let favoritesGifs = [];
    const urlGif = (id) => urlGifById + `${id}` + '?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
    const eventMax = document.querySelectorAll('.sctn-gifs .ctn-gif');
    const stcn = 'gifcommunity';

    eventMax.forEach((card) => {

        card.addEventListener('click', async (event) => {
            createModalCtn(stcn);
            const modalHtml = document.getElementById('modal');
            const cardId = event.target.closest('.ctn-gif').id;
            data = await sendApiRequest(urlGif(cardId));
            modalHtml.innerHTML = infoModal(data);
            modalHtml.style.display = 'block';
            const close = document.getElementById('sp');
            const favGif = document.querySelector('.favorite');
            const dowGif = document.querySelector('.download');

            close.addEventListener('click', () => modalHtml.style.display = 'none');

            window.addEventListener('click', (event) => {
                if (event.target === modalHtml) {
                    modalHtml.style.display = 'none';
                }
            });

            favGif.addEventListener('click', () => {
                let saved = localStorage.getItem('Favoritos');
                if(saved !== null) {
                    const saved2 = JSON.parse(saved);
                    const idExist = saved2.includes(cardId);
                        if(!idExist) {
                            favoritesGifs.push(cardId);
                            localStorage.setItem('Favoritos', JSON.stringify(favoritesGifs));
                        }
                } else {
                    favoritesGifs.push(cardId);
                    localStorage.setItem('Favoritos', JSON.stringify(favoritesGifs));
                }  
            });

            dowGif.addEventListener('click', async () => {
                let a = document.createElement('a');
                let response = await fetch(`${data.images.downsized.url}`);
                let file = await response.blob();
                a.download = `${data.title}`;
                a.href = window.URL.createObjectURL(file);
                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                a.click();
            });
        });
    });
};

/* -------------------------------------------- Trending words ------------------------------------------*/
// Consulta en API y trae las 5 palabras más buscadas
const trendingWords = async () => {
    data = await sendApiRequest(urlTrendingWords);
    data.slice(-5).forEach((word) => {
        optsTrend.innerHTML += tempTrendOp(word) + ', ';
    });
    optsTrend.addEventListener('click', async (event) => {
        resultsSection.innerHTML = '';
        inputGift.value = '';
        const idItem = event.target.id;
        searchGifs (urlSearch, idItem, 12, 0);
    });
};
// Inicializa y muestra las 5 palabras más buscadas
trendingWords();

/* -------------------------------------------- Trending Gifos ------------------------------------------*/
// Consulta en API y trae los 12 gifs más buscados
const trendingGifs = async () => {
    const ctnGifs = document.getElementById('sctn-gifs');
    data = await sendApiRequest(urlTrendGifs + '&limit=12&rating=g');
    ctnGifs.innerHTML = tempGif(data);
    assignCardEvent();
};

// Inicializa y muestra los 12 gifs más buscados
trendingGifs();


/* ---------------------------------------------- Buscador --------------------------------------------*/
const searchGifs = async (url, id, limit, offset) => {
    const urlForSearch = urlGet(url, id, limit, offset);
    data = await sendApiRequest(urlForSearch);
    gifsResultSearch(id);
    
    const root = document.getElementById('root');
    if (data.length !== 0) {
        root.innerHTML = tempGif(data);
        const btnSeeMore = document.getElementById('see-more');
        let offset = 0;
        const limit = 12;
        btnSeeMore.addEventListener('click', async () => {
            if (data.length >= 12) {
                offset = offset + 12;
                const urlForSearch = urlGet(url, id, limit, offset);
                data = [].concat(data, await sendApiRequest(urlForSearch));
                root.innerHTML = tempGif(data);
            } else {
                document.querySelector('.see-more').style.display = 'none';
            }
        });
    } else {
        document.getElementById('root').innerHTML = viewNoResults;
        document.getElementById('root').style.display = 'block';
        document.querySelector('.see-more').style.display = 'none';
    }
};

// 
inputGift.addEventListener('keyup', async () => {
    suggestList.innerHTML = '';
    if (inputGift.value.length === 0) {
        iLeftSearch.style.display = 'none';
        iSearch.style.display = 'block';
        iClean.style.display = 'none';
        return false;
    }

    iLeftSearch.style.display = 'block';
    iSearch.style.display = 'none';
    iClean.style.display = 'block';

    const url = urlSuggestSearch + `=${inputGift.value}`;
    data = await sendApiRequest(url);
    suggestionSearch(data, suggestList);

    suggestList.addEventListener('click', async (event) => {
        resultsSection.innerHTML = '';
        const idItem = event.target.id;
        inputGift.value = idItem;
        searchGifs (urlSearch, idItem, 12, 0);
        suggestList.innerHTML = '';
    });
});

// 
inputGift.addEventListener('keypress', async (event) =>{
    suggestList.innerHTML = '';
    if (inputGift.value.length === 0) {
        return false;
    } else if (event.key === 'Enter') {
        resultsSection.innerHTML = '';
        searchGifs (urlSearch, inputGift.value, 12, 0);
        suggestList.innerHTML = '';
    }
});

// Borra palabra del buscador con el icono x
iClean.addEventListener('click', () =>{
    inputGift.value = '';
    suggestList.innerHTML = '';
    iLeftSearch.style.display = 'none';
    iSearch.style.display = 'block';
    iClean.style.display = 'none';
});

/* ------------------------------------ Modo Diurno & Modo Nocturno -----------------------------------*/
const darkM = document.getElementById('dark-mode');
const dayM = document.getElementById('day-mode');

btnMode.addEventListener('click', () =>{
    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
        dayM.style.display = 'block';
        darkM.style.display = 'none';
	} else {
        localStorage.setItem('dark-mode', 'false');
        dayM.style.display = 'none'; 
        darkM.style.display = 'block';
	}
});

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    dayM.style.display = 'block';
    darkM.style.display = 'none';
} else {
    document.body.classList.remove('dark');
    dayM.style.display = 'none'; 
    darkM.style.display = 'block';
};

/* -----------------------------------------Favoritos-----------------------------------------------*/
const favs = document.getElementById('fav');
const stcSearch = document.getElementById('stc-search');
const stcTrending = document.getElementById('stc-trending');
const stcResults = document.getElementById('stc-results');
const stcFavs = document.getElementById('stc-favs');
const rootFavs = document.getElementById('root-fav');
const noContentIcon = document.getElementById('hide-favnocontent');

// Muestra sección Favoritos
const urlGif = (id) => urlGifById + `${id}` + '?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
favs.addEventListener('click', () => {
    gifsResultSearch('Favoritos');

    const getStorageFav = localStorage.getItem('Favoritos');
    let temp = '';
    if(getStorageFav !== null) {
        noContentIcon.style.display = 'none';
        const storageFav = JSON.parse(getStorageFav);
        storageFav.forEach(async idGif => {
        data = await sendApiRequest(urlGif(idGif));
        temp += tempGifav(data);
        rootFavs.innerHTML = temp;
        });
    } 
  
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcResults.style.display = 'none';
    stcMygifos.style.display = 'none';
    stcFavs.style.display = 'block';
});

/* ----------------------------------------- Mis Gifos -----------------------------------------------*/
const myGifos = document.getElementById('my-gifs');
const stcMygifos = document.getElementById('stc-mygifos');

myGifos.addEventListener('click', () => {
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcResults.style.display = 'none';
    stcFavs.style.display = 'none';
    stcMygifos.style.display = 'block';
});