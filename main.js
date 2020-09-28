import { tempTrendOp, suggestionSearch, gifsResultSearch, tempGif } from './templates.js'

let data = [];
const inputGift = document.getElementById('topic-gift');
const searchButton = document.getElementById('search-gift');
const optsTrend = document.getElementById('options');
const suggestList = document.getElementById('suggest-list');

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

const trendingWords = async () => {
    data = await sendApiRequest(urlTrendingWords);
    data.slice(-5).forEach((word) => {
        optsTrend.innerHTML += tempTrendOp(word) + ', '
    });
    optsTrend.addEventListener('click', async (event) => {
        const idItem = event.target.id;

        const url = urlGet(urlSearch, `=${idItem}&limit=12`);
        data = await sendApiRequest(url);
        gifsResultSearch(idItem);
        document.getElementById('root').innerHTML = tempGif(data);
    });
}

trendingWords();

inputGift.addEventListener('keyup', async () => {
    suggestList.innerHTML = '';
    if(inputGift.value.length === 0) {
        return false;
    }

    const url = urlGet(urlSuggestSearch, `=${inputGift.value}`);
    data = await sendApiRequest(url);
    suggestionSearch(data, suggestList);

    suggestList.addEventListener('click', async (event) => {
        const idItem = event.target.id;
        inputGift.value = idItem;
        
        const url = urlGet(urlSearch, `=${idItem}&limit=12`);
        data = await sendApiRequest(url);
        gifsResultSearch(inputGift.value);
        document.getElementById('root').innerHTML = tempGif(data);
    });
});