import { tempTrendOp, suggestionSearch, gifsResultSearch, tempGif, viewNoResults, infoModal, createModalCtn } from './templates.js'

let data = [];

const inputGift = document.getElementById('topic-gift');
const optsTrend = document.getElementById('options');
const suggestList = document.getElementById('suggest-list');
const iLeftSearch = document.getElementById('left-search-icon');
const iSearch = document.getElementById('search-icon');
const iClean = document.getElementById('clean-icon');
const resultsSection = document.getElementById('stc-results');
const btnMode = document.getElementById('mode');
const hideMenu = document.getElementById('menu-toggle');

const mod = document.getElementById('modal');

const urlSearch = 'https://api.giphy.com/v1/gifs/search?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlTrendingWords = 'https://api.giphy.com/v1/trending/searches?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlSuggestSearch = 'https://api.giphy.com/v1/gifs/search/tags?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlTrendGifs = 'https://api.giphy.com/v1/gifs/trending?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
const urlGifById = 'https://api.giphy.com/v1/gifs/';

const stcMygifos = document.getElementById('stc-mygifos');
const stcSearch = document.getElementById('stc-search');
const stcTrending = document.getElementById('stc-trending');
const stcResults = document.getElementById('stc-results');
const stcFavs = document.getElementById('stc-favs');
const stcGifComm = document.getElementById('gifcommunity');
const stcCreateGif = document.getElementById('stc-createGif');

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

//styles to remove when modal of gif is created
const removeStylesGif = (id, clasStl) => {
    const elem1 = document.getElementById(id);
    elem1.classList.remove(clasStl);
}

// Método que asigna evento del modal a gifs
const assignCardEvent =  (sectionEvent, sectClass, rightView) => {
    const urlGif = (id) => urlGifById + `${id}` + '?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
    const eventMax = document.querySelectorAll(sectClass);
    const stcn = sectionEvent;

    eventMax.forEach((card) => {

        card.addEventListener('click', async (event) => {
            createModalCtn(stcn);
            const modalHtml = document.getElementById('modal');
            const cardId = event.target.closest('.ctn-gif').id;
            data = await sendApiRequest(urlGif(cardId));
            if (rightView) {
                modalHtml.innerHTML = infoModal(data, rightView);
            } else {
                modalHtml.innerHTML = infoModal(data);
            }
            modalHtml.style.display = 'block';
            const close = document.getElementById('sp');
            const favGif = document.querySelector('.favorite');
            const dowGif = document.querySelector('.download');
            const deleteGifMyGif = document.querySelector('div.ctn-content div.modal div.modal-content div.overlay div.group-icons .delete');
            const deleteGifFav = document.querySelector('div.root-fav div.modal div.modal-content div.overlay div.group-icons .delete');

            removeStylesGif(cardId, 'ctn-gif');

            close.addEventListener('click', () => {
                modalHtml.outerHTML = "";
            });

            window.addEventListener('click', (event) => {
                if (event.target === modalHtml) {
                    modalHtml.outerHTML = "";
                }
            });
            
            favGif.addEventListener('click', () => {
                let saved = localStorage.getItem('Favoritos');
                let saved2;

                if(saved !== null) {
                    saved2 = JSON.parse(saved);
                    const idExist = saved2.includes(cardId);
                        if(!idExist) {
                            saved2.push(cardId);
                            localStorage.setItem('Favoritos', JSON.stringify(saved2));
                        }
                } else {
                    let saved3 = [];
                    saved3.push(cardId);
                    localStorage.setItem('Favoritos', JSON.stringify(saved3));
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

            const jsonMyGifos = localStorage.getItem('MyGifs');
            const arrMyGifos = JSON.parse(jsonMyGifos);
            const jsonFavoritos = localStorage.getItem('Favoritos');
            const arrFavoritos = JSON.parse(jsonFavoritos);

            if(deleteGifMyGif) {
                deleteGifMyGif.addEventListener('click', () => {
                    if (arrMyGifos.includes(cardId)) {
                        let index = arrMyGifos.indexOf(cardId);
                        if (index > -1) {                    
                            arrMyGifos.splice(index, 1);
                            localStorage.setItem('MyGifs',JSON.stringify(arrMyGifos));
                            console.log('deleteMyGif');
                            }
                    }
                });
            }
            
            if(deleteGifFav){
                deleteGifFav.addEventListener('click', () => {
                    if (arrFavoritos.includes(cardId)) {
                        let index = arrFavoritos.indexOf(cardId);
                        if (index > -1) {
                            arrFavoritos.splice(index, 1);
                            localStorage.setItem('Favoritos',JSON.stringify(arrFavoritos));
                            favs.click();
                            console.log('deleteFav');
                        }
                    }
                }); 
            }      
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
    assignCardEvent('gifcommunity', '.sctn-gifs .ctn-gif .expand');
};

const slickList = document.getElementById('ctn-gifs');
const track = document.getElementById('sctn-gifs');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
let leftPosition;

previous.addEventListener('click', () => Move(1));;
next.addEventListener('click', () => Move(2));

const Move = (value) => {

    let carrousel =  document.getElementById('ctn-gifs');
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    if(leftPosition < (trackWidth - listWidth) && value == 2){
        track.style.left = `${-1 * (leftPosition + 275)}px`;
        carrousel.scroll(track.style.left,0)
        return;
    }else if(leftPosition > 0  && value == 1){
        track.style.left = `${-1 * (leftPosition - 275)}px`
        carrousel.scroll(track.style.left,0)
    }
}




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
        assignCardEvent('root', '.root .ctn-gif .expand');
        const btnSeeMore = document.getElementById('see-more');
        let offset = 0;
        const limit = 12;
        btnSeeMore.addEventListener('click', async () => {
            if (data.length >= 12) {
                offset = offset + 12;
                const urlForSearch = urlGet(url, id, limit, offset);
                data = [].concat(data, await sendApiRequest(urlForSearch));
                root.innerHTML = tempGif(data);
                assignCardEvent('root', '.root .ctn-gif .expand');
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
const hideD =  document.getElementsByClassName('hideD');
const hideL =   document.getElementsByClassName('hideL');

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
    hideMenu.checked = false;
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
const rootFavs = document.getElementById('root-fav');
const noContentIcon = document.getElementById('hide-favnocontent');

// Muestra sección Favoritos
const urlGif = (id) => urlGifById + `${id}` + '?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';

favs.addEventListener('click', () => {
    gifsResultSearch('Favoritos');

    const getStorageFav = localStorage.getItem('Favoritos');
    let temp = '';
    if(getStorageFav && getStorageFav !== null && getStorageFav.length !== 0) {
        noContentIcon.style.display = 'none';
        const storageFav = JSON.parse(getStorageFav);

        if (storageFav.length > 12) {
            let offset = 0;
            const limit = 12;

            storageFav.slice(offset, limit).forEach(async idGif => {
            data = await sendApiRequest(urlGif(idGif));
            temp += tempGif(data);
            rootFavs.innerHTML = temp;
            assignCardEvent('root-fav', '.root-fav .ctn-gif .expand');
            });

            const btnMore = document.createElement('button');
            btnMore.setAttribute("id", "see-more-fav");
            btnMore.setAttribute("class", "see-more");
            btnMore.textContent = 'VER MÁS';
            stcFavs.appendChild(btnMore);

            const seeMoreButton = document.getElementById('see-more-fav');
            
            seeMoreButton.addEventListener('click', () =>{
                offset = offset + limit
                storageFav.slice(offset, limit).forEach(async idGif => {
                    data = [].concat(data, await sendApiRequest(urlGif(idGif))) ;
                    temp += tempGif(data);
                    rootFavs.innerHTML = temp;
                    assignCardEvent('root-fav', '.root-fav .ctn-gif .expand', true);
                    });
            });
            
        } else {
            storageFav.forEach(async idGif => {
            data = await sendApiRequest(urlGif(idGif));
            temp += tempGif(data);
            rootFavs.innerHTML = temp;
            assignCardEvent('root-fav', '.root-fav .ctn-gif .expand', true);
            });

        }    
    } 
    
    hideMenu.checked = false;
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcResults.style.display = 'none';
    stcMygifos.style.display = 'none';
    stcGifComm.style.display = 'none';
    stcFavs.style.display = 'flex';
    stcCreateGif.style.display = 'none';
});

/* ----------------------------------------- Mis Gifos -----------------------------------------------*/
const myGifos = document.getElementById('my-gifs');
const zeroGifs = document.getElementById('zero-gifs');
const rootMyGifos = document.getElementById('root-my-gifos');

myGifos.addEventListener('click', () => {

    const gifsLS = JSON.parse(localStorage.getItem('MyGifs'));
    let temp = '';
    if(gifsLS && gifsLS !== null && gifsLS.length !== 0) {
        zeroGifs.style.display = 'none';

        if (gifsLS.length > 12) {
            let offset = 0;
            const limit = 12;

            gifsLS.slice(offset, limit).forEach(async idGif => {
                data = await sendApiRequest(urlGif(idGif));
                temp += tempGif(data);
                rootMyGifos.innerHTML = temp;
                assignCardEvent('root-my-gifos', '.ctn-content .ctn-gif .expand');
                });

                const btnMore = document.createElement('button');
                btnMore.setAttribute("id", "see-more-fav");
                btnMore.setAttribute("class", "see-more");
                btnMore.textContent = 'VER MÁS';
                stcFavs.appendChild(btnMore);

                const seeMoreButton = document.getElementById('see-more-fav');
            
                seeMoreButton.addEventListener('click', () =>{
                    offset = offset + limit
                    gifsLS.slice(offset, limit).forEach(async idGif => {
                        data = [].concat(data, await sendApiRequest(urlGif(idGif))) ;
                        temp += tempGif(data);
                        rootMyGifos.innerHTML = temp;
                        assignCardEvent('root-my-gifos', '.ctn-content .ctn-gif .expand', true);
                        });
                });

        } else {
            gifsLS.forEach(async idGif => {
            data = await sendApiRequest(urlGif(idGif));
            temp += tempGif(data);
            rootMyGifos.innerHTML = temp;
            assignCardEvent('root-my-gifos', '.ctn-content .ctn-gif .expand', true);
            });
        }
    } 
    
    hideMenu.checked = false;
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcResults.style.display = 'none';
    stcMygifos.style.display = 'none';
    stcGifComm.style.display = 'none';
    stcFavs.style.display = 'none';
    stcCreateGif.style.display = 'none';
    stcMygifos.style.display = 'flex';
});

/* ----------------------------------------- Crear mis gifs -----------------------------------------------*/
const createGif = document.getElementById('create-gif');
const repeatCapture = document.getElementById('repeat');

createGif.addEventListener('click', () => {
    hideMenu.checked = false;
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcGifComm.style.display = 'none';
    stcMygifos.style.display = 'none';
    stcFavs.style.display = 'none';
    stcCreateGif.style.display = 'block';
});


document.getElementById('starting').addEventListener('click', function() {
    startCreateGif();
});

const createGifSteps = (value) => {
    switch (value) {
        case 1:
            document.getElementById('starting').style.display = 'none'
            document.getElementById('step-1').classList.add('step-selected')
          break
        case 2:
          document.getElementById('askVideoT').remove()
          document.getElementById('askVideoP').remove()
          document.getElementById('step-1').classList.remove('step-selected')
          document.getElementById('step-2').classList.add('step-selected')
          document.getElementById('recording').style.display= 'block'
          break;
        case 3:
            document.getElementById('recording').style.display = 'none'
            document.getElementById('timing').style.display = 'block'
            document.getElementById('container-steps').style.transform = 'translateX(5%)'
            document.getElementById('finishing').style.display = 'block'
            break;
        case 4:
            document.getElementById('finishing').style.display = 'none'
            document.getElementById('timing').style.display= 'none'
            document.getElementById('repeat').style.display= 'block'
            document.getElementById('container-steps').style.transform = 'translateX(0%)'
            document.getElementById('step-1').style.transform = 'translateX(200%)'
            document.getElementById('step-2').style.transform = 'translateX(200%)'
            document.getElementById('step-3').style.transform = 'translateX(200%)'
            document.getElementById('uploading').style.display = 'block'
            break;
        case 5:
            document.getElementById('step-2').classList.remove('step-selected')
            document.getElementById('step-3').classList.add('step-selected')
            break;
        case 6:
            document.getElementById('uploading').style.display = 'none'
            document.getElementById('step-3').classList.remove('step-selected')
            break;
        default:
          console.log("Error")
          break;
    }
}

function startCreateGif () {
    createGifSteps(1)
    let videoRecording = document.createElement('video')
    let containerVideo = document.getElementById('container-video')
    containerVideo.innerHTML = `<h1 id="askVideoT">¿Nos das acceso <br>a tu cámara?</h1>
    <p id="askVideoP">El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>`
    containerVideo.appendChild(videoRecording)
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 320 },
            width: {max: 480}
        }
    }).then( async function (stream) {
        videoRecording.srcObject = stream
        videoRecording.play()
        createGifSteps(2)
        const recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: () => {
                console.log('started')
            },
        })
        let recording = document.getElementById('recording')
        recording.addEventListener('click', () => {
            videoRecording.play()
            recorder.startRecording()
            createGifSteps(3)
            clock(true)
        })
        let finishRecord = document.getElementById('finishing')
        let blob
        finishRecord.addEventListener('click', function(){
            setTimeout(() => {
                recorder.stopRecording(function(){
                    blob = recorder.getBlob()
                })
                videoRecording.pause()
                createGifSteps(4)
                clock(false)
            }, 1000);
        })
        let uploadRecord = document.getElementById('uploading')
        uploadRecord.addEventListener('click', async function(){
            createGifSteps(5)
            let form = new FormData();
            form.append('file', blob, 'myGif.gif')

            uploadGif(form)
        })
    })
}


const successCard = `
<div id="video-card-success" class="video-card hideBtn">
<img src="assets/loader.svg" alt="loader">
<h3>GIFO subido con éxito <br> ve a verlo en MIS GIFOS </h3>
</div>
`

async function uploadGif (file) {
    document.getElementById('uploading').style.display = 'none'
    let vidWidth = document.getElementsByTagName('video')[0].offsetWidth;
    let vidHeight = document.getElementsByTagName('video')[0].offsetHeight;
    let containerVideo = document.getElementById('container-video')
    let cardLoad = document.createElement('div')
    cardLoad.id = 'video-card-loading'
    cardLoad.style.width = `${vidWidth}px`
    cardLoad.style.height = `${vidHeight}px`
    cardLoad.className = 'video-card'
    cardLoad.innerHTML = `<img src="assets/loader.svg" alt="loader"><br>
                          <h3>Estamos subiendo tu GIFO</h3>`
    containerVideo.appendChild(cardLoad)
    let postGif = await postGifos(file);
    addLS('MyGifs',postGif.data.id)
    cardLoad.innerHTML = `<img src="assets/ok.svg" alt="loader"><br>
                          <h3>GIFO subido con éxito <br> ve a verlo en MIS GIFOS</h3>`
                          console.log("Uploaded")
}

// document.getElementById('repeat').addEventListener('click', function(){
//     window.location.reload();
// })

const addLS = (name, value) => {
    let createdGifs = localStorage.getItem(name)
    createdGifs = createdGifs ? JSON.parse(createdGifs) : []
    createdGifs.push(value)
    localStorage.setItem(name,JSON.stringify(createdGifs))
}

const calTimeDuration = (secs) => {
    let hr = Math.floor(secs / 36e2);
    let min = Math.floor((secs - (hr * 36e2)) / 60);
    let sec = Math.floor(secs - (hr * 36e2) - (min * 60));
    if (min < 10) 
        min = '0' + min
    if (sec < 10) 
        sec = '0' + sec
    return hr + ':' + min + ':' + sec;
}

const clock = (recorder) => {
    let dateStarted = new Date().getTime();
    let time = document.getElementById('timing');
    (function looper() {
        if (!recorder) {
            return;
        }
        time.innerHTML = calTimeDuration((new Date().getTime() - dateStarted) / 10e2);
        setTimeout(looper, 10e2);
    })();
}

async function postGifos(file){
    const apiURL = `https://upload.giphy.com/v1/gifs?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q`;
    try {
        const OtherParam = {
            method: "POST",
            body: file
        }
        const response = await fetch(apiURL,OtherParam);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Fetch Error',error);
    }
}

// const showSearch = () => {
//     let y = window.scrollY
//     if(y!== 0){
//         document.querySelector('.header').style.boxShadow = '1px 1px 4px 0 rgba(0, 0, 0, .1)'
//     }else{
//         document.querySelector('.header').style.boxShadow = 'none'
//     }
// }
// window.addEventListener("scroll", showSearch())

repeatCapture.addEventListener('click', () => {
    
    console.log('hola');
});

