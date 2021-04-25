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
let spanPrice = document.getElementById('total-photographer-price');
let spanLike = document.getElementById('total-likes');
let tagWrapper = document.querySelector('.tagWrapper');
let getId = localStorage.getItem("idphot");
let mediaContainer = document.getElementById('mediaContainer');
let select = document.getElementById('select');

const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('closeLightbox');
const showMedia = document.querySelectorAll('.thumb-photographie');

// ouverture et fermeture du formulaire
contact.onclick = () => modalWrapper.style.display = "block";
closeForm.onclick = () => modalWrapper.style.display = "none";
closeLightbox.onclick = () => lightbox.style.display = "none";

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
        this._el.onclick = () => { lightbox.style.display = "block" }
    }
    affich(content) {
        this._el.src = content;
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption);
        mediaContainer.appendChild(this._fig);
    }
}

class videoFactory {
    constructor() {
        this._fig = document.createElement('figure');
        this._caption = document.createElement('figcaption');
        this._el = document.createElement("video");
        this._el.classList.add('thumb-video')
        this._el.appendChild(document.createElement("source"));
    }
    getEl() {
        return this._el;
    }
    affich(content) {
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption);
        this._el.children[0].src = content;
        this._el.src = content;
        mediaContainer.appendChild(this._fig);
    }
}
let vid1 = factory.create("video");
let im1 = factory.create("image");

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
        function printing(array) {
            array.forEach(element => {
                if (element.image === undefined) {
                    let vid1 = factory.create("video");
                    vid1.affich("Sample Photos/" + element.video)
                }
                else {
                    let im1 = factory.create("image");
                    im1.affich("Sample Photos/" + element.image)
                }
            });
        }
        // impression de la page défaut (= par Popularité)

        printing(filterDefault);

        // Détection de changement de selection et affichage en fonction
        select.onchange = () => {
            mediaContainer.innerHTML = "";
            if (select.value === "Popularité") {
                printing(filterDefault)

            }
            if (select.value === "Date") {
                var filterByDate = filteredMedias.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                printing(filterByDate)
            }
            if (select.value === "Titre") {

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
