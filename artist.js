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
const closeLightbox = document.getElementById('closeLightbox')
// ouverture et fermeture du formulaire
contact.onclick = () => modalWrapper.style.display = "block";
closeForm.onclick = () => modalWrapper.style.display = "none";
closeLightbox.onclick = () => lightbox.style.display = "none";



class factory {
    constructor(content) {
		if(content.includes(".mp4")) return new factoryVideo(content);
        else return new factoryImage(content);
    }
}

//toujours la même classe permettant de créer une vidéo
class factoryVideo {
    constructor(content) {
        this.el = document.createElement("video");
        this.el.classList.add('thumb-photographie')
        this.el.appendChild(document.createElement("source"));
        this.el.children[0].src = content;

    }
    //un getter permettant ici de récupérer l'élément html crée dans le constructeur
    getEl() {
        return this.el;

    }
    affich() {
        mediaContainer.appendChild(this.el);
    }
}

class factoryImage {
    constructor(content) {
        this.fig = document.createElement('figure');
        this.caption = document.createElement('figcaption');
        this.el = document.createElement("img");
        this.fig.appendChild(this.el);
        this.fig.appendChild(this.caption);
        this.el.classList.add('thumb-photographie');
        this.el.src = content;
    }
    getEl() {
        return this.el;
    }
    affich() {
        mediaContainer.appendChild(this.fig);
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
                price.textContent = photographes[photographe].price + "€ / Jour";
                for (let tag of photographes[photographe].tags) {
                    let el = document.createElement("button");
                    el.textContent = "#" + tag;
                    el.style.fontSize = "18px";
                    el.classList.add("tagButton");
                    tagWrapper.appendChild(el);
                }
            }
        }
        // filtre des medias correspondants à l'artiste
        const filteredMedias = medias.filter((item) => {
            if (getId == item.photographerId) {
                return item
            }
        });

        // Tri images vs videos pour pouvoir passer les arrays dans la Factory
        const images = [] ;
        const videos = [] ;
        let totalLikes = 0;
        filteredMedias.forEach(element => {
            if(element.video === undefined){
                images.push(element);
            }
            else{videos.push(element);
            }
        });
        // filtrage par date
        filteredMedias.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });
        // fin filtrage par date

        // utilisation des arrays dans le factory et création des élements HTML
        for(media of images){

            const im1 = new factory('Sample Photos/'+media.image)
            im1.affich();
        }
        for(media of videos){

            const vid1 = new factory('Sample Photos/'+media.video);
            vid1.affich();
        }

        for(media in filteredMedias){
            totalLikes += filteredMedias.likes;
        }
        
        totalContent.textContent = totalLikes;

    }).catch(function (error) {
        console.error('erreur');
        console.error(error);
    });



// poster = pour miniature de video