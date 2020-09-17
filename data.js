export const getData = fetch('https://api.giphy.com/v1/gifs/search?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q=sun&limit=25&offset=0&rating=g&lang=en')
                        .then((resp) => resp.json())
                        .then((data) => {
                            console.log(data);
                        });
