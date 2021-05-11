// header du photographe
let nameTitle = document.querySelector(".photographer-name");
let endroit = document.querySelector(".photographer-location");
let tagline = document.querySelector(".photographer-tagline");
let imageProfil = document.querySelector(".thumb-photographer-picture");
let tagWrapper = document.querySelector(".tagWrapper");
let mediaContainer = document.getElementById("mediaContainer");
let select = document.getElementById("select");
let getId = localStorage.getItem("idphot");
// lightbox
const lightboxP = document.querySelector(".lightbox");
const closeLightbox = document.querySelector(".lightbox-close");
const lightboxMedia = document.getElementById("lightbox-content");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");
let contenu ;
let mediaTitle = document.createElement("span");
// bottom-right-corner text-box
let spanPrice = document.getElementById("total-photographer-price");
let spanLike = document.getElementById("total-likes");
//formulaire DOM
let modal = document.getElementById("modalForm");
let contact = document.getElementById("contactMe");
let closeForm = document.querySelector(".close");
let contactForm = document.querySelector(".contactForm");
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputEmail = document.getElementById("email");
let inputYourMessage = document.getElementById("yourMessageTextbox");
let modalArtistName = document.getElementById("photographer-nameModal");

// ouverture et fermeture du formulaire / de la lightbox
let cover = document.getElementById("cover");
contact.onclick = () => {
    modal.style.display = "block";
    cover.style.display = "block";
}
closeForm.onclick = (e) => {
    e.preventDefault();
    modal.style.display = "none";
    cover.style.display = "none";
}
closeLightbox.onclick = () => lightboxP.style.display = "none";
let imgs = document.getElementsByClassName("thumb-photographie");
let els = [];

// envoi du formulaire
contactForm.onsubmit = () => console.log(inputFirstName.value, inputLastName.value, inputEmail.value, inputYourMessage.value);

class factory {
    static create(type = {}) {
        if (type.image) return new imageFactory(type.image);
        if (type.video) return new videoFactory(type.video);
    }
}

class imageFactory {
    constructor(content) {
        this._fig = document.createElement("figure");
        this._caption = document.createElement("figcaption");
        this._captionTitle = document.createElement("p");
        this._el = document.createElement("img");
        this._el.classList.add("thumb-photographie");
        this.init(content);
    }
    init(content) {
        this._el.src = "Sample Photos/" + content;
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption);
        this._caption.appendChild(this._captionTitle)
        let captionTitle = content.replace("Sample Photos/", " "); captionTitle = captionTitle.replace(".jpg", " "); captionTitle = captionTitle.replaceAll("_", " ");
        this._captionTitle.textContent = captionTitle;
        this._el.setAttribute("alt", captionTitle);
    }
    showPrice(price) {
        let priceText = document.createElement("strong");
        priceText.textContent = price + " €"
        this._caption.appendChild(priceText);
    }
    showLikes(likes) {
        let likesText = document.createElement("strong");
        let likeButton = document.createElement("button");
        likesText.textContent = likes;
        likeButton.addEventListener('click', function likeClic() {
            likeButton.removeEventListener('click', likeClic);
            likes = parseInt(likesText.textContent) + 1;
            likesText.textContent = likes;
            spanLike.textContent = parseInt(spanLike.textContent) + 1
        })
        likeButton.setAttribute("aria-label", "likes");
        likeButton.classList.add("likeButton"); likesText.classList.add("likes");
        this._caption.appendChild(likesText);
        this._caption.appendChild(likeButton);
        els.push(likesText);
    }
    affich() {
        mediaContainer.appendChild(this._fig);
    }
}

class videoFactory {
    constructor(content) {
        this._fig = document.createElement("figure");
        this._caption = document.createElement("figcaption");
        this._captionTitle = document.createElement("p");
        this._el = document.createElement("video");
        this._el.classList.add("thumb-video");
        this.init(content)
    }
    init(content) {
        this._el.src = "Sample Photos/" + content;
        this._fig.appendChild(this._el);
        this._fig.appendChild(this._caption);
        this._caption.appendChild(this._captionTitle)
        let captionTitle = content.replace("Sample Photos/", " "); captionTitle = captionTitle.replace(".mp4", " "); captionTitle = captionTitle.replaceAll("_", " ");
        this._captionTitle.textContent = captionTitle;
        this._el.setAttribute("alt", captionTitle);
    }
    affich() {
        mediaContainer.appendChild(this._fig);
    }
    showPrice(price) {
        let priceText = document.createElement("strong");
        priceText.textContent = price + " €"
        this._caption.appendChild(priceText);
    }
    showLikes(likes) {
        let likesText = document.createElement("strong");
        let likeButton = document.createElement("button");
        likeButton.setAttribute("aria-label", "likes");
        likeButton.textContent
        likeButton.classList.add("likeButton"); likesText.classList.add("likes");
        likesText.textContent = likes;
        likeButton.addEventListener('click', function likeClic() {
            likeButton.removeEventListener('click', likeClic);
            likes = parseInt(likesText.textContent) + 1;
            likesText.textContent = likes;
            spanLike.textContent = parseInt(spanLike.textContent) + 1;
        })
        this._caption.appendChild(likesText);
        this._caption.appendChild(likeButton);
        els.push(likesText);
    }
}

const myRequest = new Request("data.json")
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
                modalArtistName.textContent = "Contactez-moi " +photographes[photographe].name;
                endroit.textContent = photographes[photographe].city + ", " + photographes[photographe].country;
                tagline.textContent = photographes[photographe].tagline;
                imageProfil.src = "Sample Photos/Photographers ID Photos/" + photographes[photographe].portrait; imageProfil.setAttribute("alt", photographes[photographe].name);
                spanPrice.textContent = photographes[photographe].price + "€ / Jour";
                for (let tag of photographes[photographe].tags) {
                    let el = document.createElement("button");
                    el.textContent = "#" + tag;
                    el.classList.add("tagButton"); el.classList.add("profile-tagButton");
                    tagWrapper.appendChild(el);
                }
            }
        }
        // filtre des medias correspondants à l"artiste
        var filteredMedias = medias.filter((item) => {
            if (getId == item.photographerId) { return item }
        });
        // renvoi des médias vers un array puis tri dans ordre décroissant de Popularité
        var filterDefault = [];
        filteredMedias.forEach(element => { filterDefault.push(element) });
        filterDefault.sort(function (a, b) { return b.likes - a.likes });
        /* fonction qui vérifie les éléments contenus dans les tableaux et les transmets à la factory pour qu"elle créé des éléments correspondants au type */
        function affichageMedias(array) {
            array.forEach(element => {
                let elt = factory.create(element);
                elt.affich(element.image ? element.image : element.video);
                elt.showPrice(element.price);
                elt.showLikes(element.likes);
            });
            lightbox();
        }
        // impression de la page défaut (= par Popularité)
        affichageMedias(filterDefault);
        // Détection de changement de selection et affichage en fonction de la valeur.
        select.onchange = () => {
            mediaContainer.innerHTML = "";
            if (select.value === "Popularité") {
                affichageMedias(filterDefault);
            }
            if (select.value === "Date") {
                var filterByDate = filteredMedias.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                affichageMedias(filterByDate)
            }
            if (select.value === "Titre") {
                let alphabetic = filteredMedias.reverse()
                affichageMedias(alphabetic)
            }
        }

        /* mediaSrc est un array qui contient les diverses sources des medias utilisés dans la lightbox
        // on écoute chaque media, si il y a un clic on récupère sa position dans le array.
        Cette position est utilisée pour passer d"un média/titre à un autre avec les boutons prev/next
        */
        function lightbox() {
            let position = 0
            let mediaSrc = []
            for (let i = 0; i < imgs.length; i++) {
                mediaSrc.push(imgs[i].src)
                imgs[i].addEventListener("click", () => {
                    lightboxP.style.display = "flex";
                    contenu = document.createElement("img");
                    contenu.src = mediaSrc[i];
                    contenu.alt = imgs[position].alt
                    position = i ; 
                    contenu.classList.add("active")
                    mediaTitle.style.textAlign="center"
                    mediaTitle.textContent = imgs[position].alt // titre de l'image = alt de celle-ci
                    // boucle pour empecher la multiplication d'élément HTML en cas de fermeture puis réouverture de la lightbox
                    while(lightboxMedia.firstChild){
                        lightboxMedia.removeChild(lightboxMedia.firstChild)
                    }
                    lightboxMedia.appendChild(contenu)
                    lightboxMedia.appendChild(mediaTitle)
                })
            }
            const moveRight = () => {

                if (position >= mediaSrc.length - 1) {
                    position = 0 ;
                    contenu.src = mediaSrc[position];
                    mediaTitle.textContent = imgs[position].alt
                    return;
                }
                contenu.src = mediaSrc[position + 1];
                mediaTitle.textContent = imgs[position + 1].alt
                position++;
            }
            const moveLeft = () => {
                if (position < 1) {
                    position = mediaSrc.length - 1
                    contenu.src = mediaSrc[position]
                    mediaTitle.textContent = imgs[position].alt
                    return
                }
                contenu.src = mediaSrc[position - 1]
                mediaTitle.textContent = imgs[position - 1].alt
                position--
            }
            function logKey(e) {
                switch (e.code) {
                    case "ArrowLeft":
                        moveLeft();
                        break;
                    case "ArrowRight":
                        moveRight();
                        break;
                    case "Escape" :
                        lightboxP.style.display="none"
                        break;
                }
            }
            // listener click & keydown qui utilise les fonctions moveLeft et moveRight en fonction
            nextButton.addEventListener("click", moveRight);
            prevButton.addEventListener("click", moveLeft);
            document.onkeydown = logKey;
        }
        //somme des likes
        let likesTotaux = els.map(el => el.textContent).reduce((a, b) => parseInt(a) + parseInt(b));
        spanLike.textContent = likesTotaux

    }).catch(function (error) {
        console.error("erreur");
        console.error(error);
    });
