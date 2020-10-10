import { tempTrendOp, suggestionSearch, gifsResultSearch, tempGif, viewNoResults } from './templates.js'

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

const urlGet = (url, input, limit, offset) => {
    const result = url + input + limit + offset;
    return result;
};

const sendApiRequest = async(url) => {
    let response = await fetch(url);
    let nextResponse = await response.json();
    data = nextResponse.data;
    return data;
};

const searchGifs = async (url, id, limit, offset) => {
    const urlForSearch = urlGet(url, `=${id}`, `&limit=${limit}`, `&offset=${offset}`);
    data = await sendApiRequest(urlForSearch);
    gifsResultSearch(id);
    
    const root = document.getElementById('root');
    if (data.length !== 0) {
        root.innerHTML = tempGif(data);
        const btnSeeMore = document.getElementById('see-more');
        btnSeeMore.addEventListener('click', () => {
            seeMore(url, id);
        });
    } else {
        document.getElementById('root').innerHTML = viewNoResults;
        document.getElementById('root').style.display = 'block';
        document.querySelector('.see-more').style.display = 'none';
    }
};

let offset = 12;
const seeMore = (url, inputSearch) => {
    const limit = 12;
    offset = offset + 12;
    searchGifs(url, inputSearch, limit, offset);
};

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
}

trendingWords();

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
    });
});

inputGift.addEventListener('keypress', async (event) =>{
    suggestList.innerHTML = '';
    if (inputGift.value.length === 0) {
        return false;
    } else if (event.key === 'Enter') {
        resultsSection.innerHTML = '';
        searchGifs (urlSearch, inputGift.value, 12, 0);
    }
});

iClean.addEventListener('click', () =>{
    inputGift.value = '';
    suggestList.innerHTML = '';
    iLeftSearch.style.display = 'none';
    iSearch.style.display = 'block';
    iClean.style.display = 'none';
});

// dark mode
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
}

