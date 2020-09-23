export const getData = (word) => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q=${word}`)
        .then((resp) => resp.json())
        .then((obj) =>  obj.data);
} 
