import { tempTrendOp, suggestionSearch, gifsResultSearch, tempGif } from './templates.js'

let data = [];
const inputGift = document.getElementById('topic-gift');
const optsTrend = document.getElementById('options');
const suggestList = document.getElementById('suggest-list');
const iLeftSearch = document.getElementById('left-search-icon');
const iSearch = document.getElementById('search-icon');
const iClean = document.getElementById('clean-icon');

const urlSearch = 'https://api.giphy.com/v1/gifs/search?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlTrendingWords = 'https://api.giphy.com/v1/trending/searches?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlSuggestSearch = 'https://api.giphy.com/v1/gifs/search/tags?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';

const urlGet = (url, input) => {
    const result = url + input;
    return result;
};

const sendApiRequest = async(url) => {
    let response = await fetch(url);
    let nextResponse = await response.json();
    data = nextResponse.data;
    return data;
};

const searchGifs = async (url, id) => {
    const urlForSearch = urlGet(url, `=${id}&limit=12`);
    data = await sendApiRequest(urlForSearch);
    gifsResultSearch(id);
    document.getElementById('root').innerHTML = tempGif(data);
};

const trendingWords = async () => {
    data = await sendApiRequest(urlTrendingWords);
    data.slice(-5).forEach((word) => {
        optsTrend.innerHTML += tempTrendOp(word) + ', '
    });
    optsTrend.addEventListener('click', async (event) => {
        const idItem = event.target.id;
        searchGifs (urlSearch, idItem);
    });
}

trendingWords();

inputGift.addEventListener('keyup', async () => {
    suggestList.innerHTML = '';
    if(inputGift.value.length === 0) {
        iLeftSearch.style.display = 'none';
        iSearch.style.display = 'block';
        iClean.style.display = 'none';
        return false;
    }

    iLeftSearch.style.display = 'block';
    iSearch.style.display = 'none';
    iClean.style.display = 'block';

    const url = urlGet(urlSuggestSearch, `=${inputGift.value}`);
    data = await sendApiRequest(url);
    suggestionSearch(data, suggestList);

    suggestList.addEventListener('click', async (event) => {
        const idItem = event.target.id;
        inputGift.value = idItem;
        searchGifs (urlSearch, idItem);
    });
});

iClean.addEventListener('click', () =>{
    inputGift.value = '';
    suggestList.innerHTML = '';
    iLeftSearch.style.display = 'none';
    iSearch.style.display = 'block';
    iClean.style.display = 'none';
});