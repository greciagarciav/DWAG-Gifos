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

// Método que asigna evento del modal a gifs
// let favoritesGifs = [];

const assignCardEvent =  () => {
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
//Asigna eventos a iconos de cada card de esta sección
const assignCardEventSearch = () => {
    const favGif = document.querySelectorAll('.ctn-gif .love');
    const downloadGif = document.querySelectorAll('.ctn-gif .download');
    const expandGif = document.querySelectorAll('.ctn-gif .expand');

    favGif.forEach((iconLove) => {

        
        iconLove.addEventListener('click', (event) => {
            const cardId = event.target.closest('.ctn-gif').id;

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
    });

    downloadGif.forEach((iconDownload) => {
        iconDownload.addEventListener('click', () => {
            console.log('download');
        });
    });

    expandGif.forEach((iconExpand) => {
        iconExpand.addEventListener('click', () => {
            console.log('expand');
        });
    });
};

const searchGifs = async (url, id, limit, offset) => {
    const urlForSearch = urlGet(url, id, limit, offset);
    data = await sendApiRequest(urlForSearch);
    gifsResultSearch(id);
    
    const root = document.getElementById('root');
    if (data.length !== 0) {
        root.innerHTML = tempGif(data);
        assignCardEventSearch();
        const btnSeeMore = document.getElementById('see-more');
        let offset = 0;
        const limit = 12;
        btnSeeMore.addEventListener('click', async () => {
            if (data.length >= 12) {
                offset = offset + 12;
                const urlForSearch = urlGet(url, id, limit, offset);
                data = [].concat(data, await sendApiRequest(urlForSearch));
                root.innerHTML = tempGif(data);
                assignCardEventSearch();
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

const assignCardEventFavs = () => {
    const deleteGif = document.querySelectorAll('.ctn-gif .delete');
    const downloadGif = document.querySelectorAll('.ctn-gif .download');
    const expandGif = document.querySelectorAll('.ctn-gif .expand');

    deleteGif.forEach((iconDelete) => {
        iconDelete.addEventListener('click', () => {
            console.log('delete');
        });
    });

    downloadGif.forEach((iconDownload) => {
        iconDownload.addEventListener('click', () => {
            console.log('download');
        });
    });

    expandGif.forEach((iconExpand) => {
        iconExpand.addEventListener('click', () => {
            console.log('expand');
        });
    });
};

// Muestra sección Favoritos
const urlGif = (id) => urlGifById + `${id}` + '?api_key=xRw1K9iEL7bkhCblwCyxd00ppSOBwLVE&q';
favs.addEventListener('click', () => {
    gifsResultSearch('Favoritos');

    const getStorageFav = localStorage.getItem('Favoritos');
    let temp = '';
    if(getStorageFav !== null) {
        noContentIcon.style.display = 'none';
        const storageFav = JSON.parse(getStorageFav);

        if (storageFav.length > 12) {
            let offset = 0;
            const limit = 12;

            storageFav.slice(offset, limit).forEach(async idGif => {
            data = await sendApiRequest(urlGif(idGif));
            temp += tempGifav(data);
            rootFavs.innerHTML = temp;
            assignCardEventFavs();
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
                    temp += tempGifav(data);
                    rootFavs.innerHTML = temp;
                    assignCardEventFavs();
                    });
            });
            
        } else {
            storageFav.forEach(async idGif => {
            data = await sendApiRequest(urlGif(idGif));
            temp += tempGifav(data);
            rootFavs.innerHTML = temp;
            assignCardEventFavs();
            });

        }    
    } 
  
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcResults.style.display = 'none';
    stcMygifos.style.display = 'none';
    stcGifComm.style.display = 'none';
    stcFavs.style.display = 'flex';
});

/* ----------------------------------------- Mis Gifos -----------------------------------------------*/
const myGifos = document.getElementById('my-gifs');

myGifos.addEventListener('click', () => {
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcResults.style.display = 'none';
    stcFavs.style.display = 'none';
    stcCreateGif.style.display = 'none';
    stcMygifos.style.display = 'block';
});

/* ----------------------------------------- Crear mis gifs -----------------------------------------------*/
const createGif = document.getElementById('create-gif');
const startBtn = document.getElementById('starting');

createGif.addEventListener('click', () => {
    stcSearch.style.display = 'none';
    stcTrending.style.display = 'none';
    stcGifComm.style.display = 'none';
    stcMygifos.style.display = 'none';
    stcCreateGif.style.display = 'block';
});


startBtn.addEventListener('click', () => {
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

const startCreateGif = () => {
    createGifSteps(1)
    let videoRecording = document.createElement('video')
    let containerVideo = document.getElementById('container-video')
    containerVideo.innerHTML = `<h1 id="askVideoT">¿Nos das acceso <br>a tu cámara?</h1>
    <p id="askVideoP">El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>`
    containerVideo.appendChild(videoRecording)
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 300 },
            width: {max: 500}
        }
    }).then(async function(stream){
        videoRecording.srcObject = stream
        videoRecording.play()
        // Desde aqui se cuelgagit
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
<img src="/img/loader.svg" alt="loader">
<h3>GIFO subido con éxito</h3>
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
    cardLoad.innerHTML = `<img src="/img/loader.svg" alt="loader"><br>
                          <h3>Estamos subiendo tu GIFO</h3>`
    containerVideo.appendChild(cardLoad)
    let postGif = await postGifos(file);
    addLS('MyGifs',postGif.data.id)
    cardLoad.innerHTML = `<img src="/img/ok.svg" alt="loader"><br>
                          <h3>GIFO subido con éxito</h3>`
                          console.log("Uploaded")
}

document.getElementById('repeat').addEventListener('click', function(){
    window.location.reload();
})

const addLS = () => {
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
    const apiURL = `https://upload.giphy.com/v1/gifs?api_key=TwJ1SaQHCIBd0qczJHRc3ioNpKdTxEYs`;
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
