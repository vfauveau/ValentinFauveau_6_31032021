// header du photographe
let nameTitle = document.querySelector(".photographer-name");
let endroit = document.querySelector(".photographer-location");
let tagline = document.querySelector(".photographer-tagline");
let imageProfil = document.querySelector('.thumb-photographer-picture');
let tagWrapper = document.querySelector('.tagWrapper');
let mediaContainer = document.getElementById('mediaContainer');
let select = document.getElementById('select');
let getId = localStorage.getItem("idphot");
// lightbox
const lightbox = document.querySelector('.lightbox');
const closeLightbox = document.querySelector('.lightbox-close');
const lightboxMedia = document.getElementById('lightbox-content');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');
// bottom-right-corner text-box
let spanPrice = document.getElementById('total-photographer-price');
let spanLike = document.getElementById('total-likes');
//formulaire DOM
let modal = document.getElementById('modalForm');
let contact = document.getElementById('contactMe');
let submit = document.querySelector('.submit-button');
let closeForm = document.getElementById('closeForm');
let contactForm = document.querySelector('.contactForm');
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputEmail = document.getElementById('email');
let inputYourMessage = document.getElementById('yourMessage');
let modalArtistName = document.querySelector('.photographer-nameModal');

// ouverture et fermeture du formulaire / de la lightbox
let cover = document.getElementById('cover');
contact.onclick = () => {modal.style.display = "block"; cover.style.display="block";} 
closeForm.onclick = () => {modal.style.display = "none";  cover.style.display="none"; }
closeLightbox.onclick = () => lightbox.style.display= "none";
let contenu = document.createElement('img');
let contenuDesc = document.createElement('span');
let imgs = document.getElementsByClassName('thumb-photographie');
var els = []

// envoi du formulaire
contactForm.onsubmit = () => console.log(inputFirstName.value, inputLastName.value, inputEmail.value, inputYourMessage.value)

class factory {
    static create(type = {}) {
        if (type.image) return new imageFactory(type.image);
        if (type.video) return new videoFactory(type.video);
    }
}

class imageFactory {
    constructor(content) {
        this._fig = document.createElement('figure');
        this._caption = document.createElement('figcaption');
        this._el = document.createElement('img');
        this._el.classList.add('thumb-photographie');
        this.init(content);
        }
    init (content) {
        this._el.src = "Sample Photos/"+content;
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption);
        let captionTitle = content.replace("Sample Photos/", " ");
        captionTitle = captionTitle.replace(".jpg", " ");
        captionTitle = captionTitle.replaceAll("_", " ");
        this._caption.textContent = captionTitle;
        this._el.setAttribute('alt', "Photo "+ captionTitle);
    }
    showPrice (price){
        let priceText = document.createElement('strong');
        priceText.textContent=price+" €"
        this._caption.appendChild(priceText);
    }
    showLikes (likes){
        let likesText =document.createElement('strong');
        likesText.textContent=likes;
        this._caption.appendChild(likesText);
        els.push(likesText)

    }
    affich() {
        mediaContainer.appendChild(this._fig);
    }
}

class videoFactory {
    constructor(content) {
        this._fig = document.createElement('figure');
        this._caption = document.createElement('figcaption');
        this._el = document.createElement("video");
        this._el.classList.add('thumb-photographie');
        this._el.appendChild(document.createElement("source"));
        this.init(content)
        }
    init (content) {
        this._el.children[0].src = content;
        this._el.src = "Sample Photos/"+content;
        let captionTitle = content.replace("Sample Photos/", " ");
        captionTitle = captionTitle.replaceAll("_", " ");
        captionTitle = captionTitle.replace(".mp4", "");
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption).textContent=captionTitle;
        this._el.setAttribute('alt', "Video "+ captionTitle);


    }
    affich() {
        mediaContainer.appendChild(this._fig);
    }
    showPrice (price){
        let priceText = document.createElement('strong');
        priceText.textContent=price+" €"
        this._caption.appendChild(priceText);
    }
    showLikes (likes){
        let likesText =document.createElement('strong');
        likesText.textContent=likes;
        els.push(likesText)
        this._caption.appendChild(likesText)
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
        // remplissage des zones de texte statique en fonction de la valeur (ID) reçue en localStorage
        for (let photographe in photographes) {
            if (getId == photographes[photographe].id) {
                nameTitle.textContent = photographes[photographe].name;
                modalArtistName.textContent = photographes[photographe].name;
                endroit.textContent = photographes[photographe].city + ", " + photographes[photographe].country;
                tagline.textContent = photographes[photographe].tagline;
                imageProfil.src = "Sample Photos/Photographers ID Photos/" + photographes[photographe].portrait; imageProfil.setAttribute('alt', photographes[photographe].name) ;
                spanPrice.textContent = photographes[photographe].price + "€ / Jour";
                for (let tag of photographes[photographe].tags) {
                    let el = document.createElement("button");
                    el.textContent = "#" + tag;
                    el.classList.add("tagButton");
                    el.style.fontSize = "18px";
                    tagWrapper.appendChild(el);
                }
            }
        }
        // filtre des medias correspondants à l'artiste
        var filteredMedias = medias.filter((item) => {
            if (getId == item.photographerId) {
                return item
            }
        });

        // renvoi des médias vers un array puis tri dans ordre décroissant de Popularité
        var filterDefault = [];
        filteredMedias.forEach(element => {filterDefault.push(element)});
        filterDefault.sort(function (a, b) {return b.likes - a.likes});

        function lightboxtri () {
            let currentImage = 0 ;
            for(let item = 0 ; imgs.length > item ; item++){
                imgs[item].onclick=() => {
                    lightbox.style.display = "flex";
                    contenu.src = imgs[item].src ;
                    contenu.classList.add('active');
                    while (lightboxMedia.firstChild) {
                        lightboxMedia.removeChild(lightboxMedia.firstChild)
                        }
                    lightboxMedia.appendChild(contenu);
                }
            }
            nextButton.onclick=()=>{contenu.src=imgs[(currentImage++)%imgs.length].src}
            prevButton.onclick=()=>{
                if(currentImage === 0){currentImage === imgs.length}
                contenu.src=imgs[(currentImage--)%imgs.length].src
            }
        }
        /* fonction qui vérifie les éléments contenus dans les tableaux et les transmets à la factory pour qu'elle créé des éléments correspondants au type */
        function affichageMedias(array) {
            array.forEach(element => {
                    let elt = factory.create(element);
                    elt.affich(element.image?element.image:element.video);
                    elt.showPrice(element.price);
                    elt.showLikes(element.likes);
            });
            lightboxtri();
        }
        // impression de la page défaut (= par Popularité)
        affichageMedias(filterDefault);

        // Détection de changement de selection et affichage en fonction de la valeur
        select.onchange = () => {
            mediaContainer.innerHTML = "";
            if (select.value === "Popularité") {
                affichageMedias(filterDefault)

            }
            if (select.value === "Date") {
                var filterByDate = filteredMedias.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                affichageMedias(filterByDate)
            }
            if (select.value === "Titre"){
                let alphabetic = filteredMedias.reverse()
                affichageMedias(alphabetic)

            }
        }
        let likesTotaux = els.map(el=>el.textContent).reduce((a,b)=>parseInt(a)+parseInt(b));
        spanLike.textContent = likesTotaux

    }).catch(function (error) {
        console.error('erreur');
        console.error(error);
    });