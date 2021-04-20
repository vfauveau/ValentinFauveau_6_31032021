//formulaire DOM
let modal = document.getElementById('modalWrapper');
let contact = document.getElementById('contactMe');
let submit = document.querySelector('.submit-button');
let closeForm = document.getElementById('closeForm');
// form inputs
let modalArtistName = document.querySelector('.photographer-nameModal');
let nameTitle = document.querySelector(".photographer-name");
let endroit = document.querySelector(".photographer-location");
let tagline = document.querySelector(".photographer-tagline");
let imageProfil = document.querySelector('.thumb-photographer-picture');
let price = document.getElementById('photographer-price');
let totalContent = document.getElementById('total-content');
let tagWrapper = document.querySelector('.tagWrapper');
let getId = localStorage.getItem("idphot");
let mediaContainer = document.getElementById('mediaContainer');

const lightbox = document.getElementById('lightbox');
const closeLightbox =document.getElementById('closeLightbox')
// ouverture et fermeture du formulaire
contact.onclick=()=>modalWrapper.style.display = "block" ;
closeForm.onclick=()=>modalWrapper.style.display = "none";
closeLightbox.onclick=()=>lightbox.style.display="none" ;

class factory {
    static create(type = "image") {
        if (type == "image") return new imageFactory();
        if (type == "video") return new videoFactory();
    }
}

class imageFactory {
    constructor() {
        this.fig = document.createElement('figure');
        this.caption = document.createElement('figcaption');
        this._el = document.createElement('img');
        this._el.classList.add('thumb-photographie');
        this._el.onclick=()=>{lightbox.style.display="block"}
    }
    affich(content) {
        this._el.src = content;
        this.fig.appendChild(this._el);
        this.fig.appendChild(this.caption);
        this.fig = mediaContainer.appendChild(this.fig);
    }
}

class videoFactory {
    constructor() {
        this._el = document.createElement("video");
        this._el.classList.add('thumb-video')
        this._el.appendChild(document.createElement("source"));
    }
    affich(content) {
        this._el.src = content;
        return document.body.appendChild(this._el);
    }
}

const myRequest = new Request('data.json')
fetch(myRequest)
    .then((response) => {
        return response.json();
    }).then(function (data) {
        // récupération des arrays from .json
        const photographes = data.photographers;
        const medias = data.media;
        // remplissage du header en fonction de la valeur (ID) reçue en localStorage
        for (let photographe in photographes) {
            if (getId == photographes[photographe].id) {
                nameTitle.textContent = photographes[photographe].name;
                endroit.textContent = photographes[photographe].city + ", " + photographes[photographe].country;
                tagline.textContent = photographes[photographe].tagline;
                imageProfil.src = "Sample Photos/Photographers ID Photos/" + photographes[photographe].portrait;
                price.textContent = photographes[photographe].price+"€ / Jour";
                for (let tag of photographes[photographe].tags) {
                    let el = document.createElement("button");
                    el.textContent = "#" + tag;
                    el.style.fontSize="18px";
                    el.classList.add("tagButton");
                    tagWrapper.appendChild(el);
                }
            }
        }
        // filtre des medias correspondants à l'artiste
        let totalLikes = 0 ;
        const filteredMedias = medias.filter((item) => {
            if(getId == item.photographerId){
                return item
            }
        });
        for(let media in filteredMedias){
            let im1 = factory.create("image");
            im1.affich("Sample Photos/"+filteredMedias[media].image);


            totalLikes += filteredMedias[media].likes ;
        }
        totalContent.textContent=totalLikes
    }).catch(function (error) {
        console.error('erreur');
        console.error(error);
    });



// poster = pour miniature de video