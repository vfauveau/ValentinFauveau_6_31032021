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
let modal = document.getElementById('modalWrapper');
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
contact.onclick = () => modalWrapper.style.display = "block";
closeForm.onclick = () => modalWrapper.style.display = "none";
closeLightbox.onclick = () => lightbox.style.display= "none";


// envoi du formulaire
contactForm.onsubmit = () => console.log(inputFirstName.value, inputLastName.value, inputEmail.value, inputYourMessage.value)

class factory {
    static create(type = "image") {
        if (type == "image") return new imageFactory();
        if (type == "video") return new videoFactory();
    }
}

class imageFactory {
    constructor() {
        this._fig = document.createElement('figure');
        this._caption = document.createElement('figcaption');
        this._el = document.createElement('img');
        this._el.classList.add('thumb-photographie');
        this._el.onclick = () => {
            lightbox.style.display = "flex";
            let contenu = document.createElement('img') ;
            contenu.src = this._el.src ;
            contenu.classList.add('active');
            while (lightboxMedia.firstChild) {
                lightboxMedia.removeChild(lightboxMedia.firstChild)
                }
            lightboxMedia.appendChild(contenu);
            }
        }
    affich(content) {
        this._el.src = content;
        let captionTitle = content.replace("Sample Photos/", " ");
        captionTitle = captionTitle.replace(".jpg", " ");
        captionTitle = captionTitle.replaceAll("_", " ");
        this._caption.textContent = captionTitle;
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption);
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
        this._caption.appendChild(likesText)
    }
}

class videoFactory {
    constructor() {
        this._fig = document.createElement('figure');
        this._caption = document.createElement('figcaption');
        this._el = document.createElement("video");
        this._el.classList.add('thumb-photographie');
        this._el.appendChild(document.createElement("source"));
        this._el.onclick = () => {
            lightbox.style.display = "flex";
            let contenu = document.createElement('video') ;
            contenu.src = this._el.src ;
            contenu.classList.add('active');
            while (lightboxMedia.firstChild) {
                lightboxMedia.removeChild(lightboxMedia.firstChild)
                }
            lightboxMedia.appendChild(contenu);
            contenu.play();
            }
        }
    affich(content) {
        let captionTitle = content.replace("Sample Photos/", " ");
        captionTitle = captionTitle.replaceAll("_", " ");
        captionTitle = captionTitle.replace(".mp4", "");
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption).textContent=captionTitle;
        this._el.children[0].src = content;
        this._el.src = content;
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
                imageProfil.src = "Sample Photos/Photographers ID Photos/" + photographes[photographe].portrait;
                imageProfil.setAttribute('alt', photographes[photographe].name)
                spanPrice.textContent = photographes[photographe].price + "€ / Jour";
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
        var filteredMedias = medias.filter((item) => {
            if (getId == item.photographerId) {
                return item
            }
        });

        // renvoi des médias vers un array puis tri dans ordre décroissant de Popularité
        var filterDefault = [];
        filteredMedias.forEach(element => {
            filterDefault.push(element)
        });
        filterDefault.sort(function (a, b) { return b.likes - a.likes });
        /* fonction qui vérifie les éléments contenus dans les tableaux et les transmets à la factory pour qu'elle créé des éléments correspondants au type */
        function affichageMedias(array) {
            array.forEach(element => {
                if (element.image === undefined) {
                    let vid1 = factory.create("video");
                    vid1.affich("Sample Photos/" + element.video);
                    vid1.showPrice(element.price);
                    vid1.showLikes(element.likes);
                }
                else {
                    let im1 = factory.create("image");
                    im1.affich("Sample Photos/" + element.image);
                    im1.showPrice(element.price);
                    im1.showLikes(element.likes);
                }
            });
        }
        // impression de la page défaut (= par Popularité)
        affichageMedias(filterDefault);

        // Détection de changement de selection et affichage en fonction
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

            }
            
        }

        let totalLikes = 0;
        for (media in filteredMedias) {
            totalLikes += filteredMedias[media].likes;
        }
        spanLike.textContent = totalLikes;

    }).catch(function (error) {
        console.error('erreur');
        console.error(error);
    });

