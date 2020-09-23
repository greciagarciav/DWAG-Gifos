import { getData } from './data.js';

let data = [];
const inputGift = document.getElementById('topic-gift');
const searchButton = document.getElementById('search-gift');

searchButton.addEventListener('click', () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q=${inputGift.value}`)
        .then((resp) => resp.json())
        .then((obj) => {
            data = obj.data;
        console.log('hola', inputGift.value, data);

        });
});