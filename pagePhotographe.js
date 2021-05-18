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
let contenu = [];
let mediaTitle = document.createElement("span");
let cover = document.getElementById("cover");
// boite de texte au bas-droit de l'écran
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
let submitButton = document.getElementById("submit-button");
let inputYourMessage = document.getElementById("yourMessageTextbox");
let modalArtistName = document.getElementById("photographer-nameModal");

// ouverture et fermeture du formulaire / de la lightbox / de la div grise qui recouvre la page
contact.onclick = () => {
    modal.style.display = "block";
    inputFirstName.focus();
    cover.style.display = "block";
}
closeForm.onclick = (e) => {
    e.preventDefault();
    modal.style.display = "none";
    cover.style.display = "none";
}
closeLightbox.onclick = () => lightboxP.style.display = "none";
let els = [];
let mediasThumb = [];
// envoi du formulaire
contactForm.onsubmit = () => {
    console.log(inputFirstName.value, inputLastName.value, inputEmail.value, inputYourMessage.value);
    submitButton.style.display = "none"
}
// factory qui recoit un type d'élément et qui créé un objet en fonction
class factory {
    static create(type = {}) {
        if (type.image) return new imageFactory(type.image);
        if (type.video) return new videoFactory(type.video);
    }
}
/*
    factory comprenant un constructor avec une figure composée d'une figcaption, d'un paragraphe et d'une image.
    init est déclarée dans la factory puis appelée au sein du constructor, les éléments sont append entre entre eux.
    De même que le contenu de la légende de l'image est défini, en écourtant le chemin de l'image et en remplaçant les charactères en trop.

    showPrice et showlikes servent à ajouter les prix et likes dans la figcaption.

    showLikes créé des boutons et des éléments strong contenant le nombre de likes du média
    les boutons contiennent un event listener qui incrémente le nombre de likes de l'objet et le nombre de total de likes affiché sur la page, l'écouteur est retiré quand il a été activé.
 */
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
        this._el.setAttribute("tabindex", "0");
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
        let boxContent = document.createElement("img");
        boxContent.src = this._el.src;
        boxContent.setAttribute("alt", this._captionTitle.textContent)
        contenu.push(boxContent);
        mediasThumb.push(this._el);
        mediaContainer.appendChild(this._fig);
    }
}

class videoFactory {
    constructor(content) {
        this._fig = document.createElement("figure");
        this._caption = document.createElement("figcaption");
        this._captionTitle = document.createElement("p");
        this._el = document.createElement("video");
        this._el.setAttribute("controls", "")
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
        this._el.setAttribute("title", captionTitle);
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
    affich() {
        mediaContainer.appendChild(this._fig)
        mediasThumb.push(this._el)
        let boxContent = document.createElement("video")
        boxContent.src = this._el.src
        boxContent.setAttribute("title", this._captionTitle.textContent)
        boxContent.setAttribute("controls", "");
        contenu.push(boxContent)
    }
}

// mediasThumb = éléments affiché sur la page, possèdant un event listener click pour ouvrir la lightbox
const myRequest = new Request("data.json")
fetch(myRequest)
    .then((response) => {
        return response.json();
    }).then(function (data) {
        // récupération des arrays from .json
        const photographes = data.photographers;
        const medias = data.media;
        // remplissage des zones de texte définie en HTML en fonction de la valeur (ID) reçue en localStorage
        for (let photographe in photographes) {
            if (getId == photographes[photographe].id) {
                nameTitle.textContent = photographes[photographe].name;
                modalArtistName.textContent = "Contactez-moi " + photographes[photographe].name;
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
        filterDefault.sort(function (a, b) {return b.likes - a.likes });
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
        // impression de la page défaut (= par Popularité).
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
                let alphabetic = filteredMedias.sort()
                alphabetic.reverse()
                affichageMedias(alphabetic)
            }
        }
        // fonction qui supprime le 1st child de la lightbox
        function emptyLightbox() {
            while (lightboxMedia.firstChild) {
                lightboxMedia.removeChild(lightboxMedia.firstChild)
            }
        }
        /*
        on écoute chaque miniature de média, si il y a un clic on récupère sa position dans le array et l'affiche dans la lightbox
        Cette position est utilisée pour passer d"un média/titre à un autre avec les boutons prev/next.
        ajout des fonctions sur les évènements au clavier.
        contenu = media affiché dans la lightbox.
        position = position dans le array de média.

        Pour chaque média et évènement on appelle la fonction qui vide la lightbox, puis on append le media en fonction de l'évolution de la position.
        */
        function lightbox() {
            let position = 0
            for (let i = 0; i < mediasThumb.length; i++) {
                // on donne la classe active à tous les éléments contenus dans le array
                contenu[i].classList.add("active");
                mediasThumb[i].addEventListener("click", () => {
                    lightboxP.style.display = "flex";
                    position = i;
                    mediaTitle.textContent = contenu[position].alt || contenu[position].title
                    // titre de l'image = alt de celle-ci
                    emptyLightbox();
                    lightboxMedia.appendChild(contenu[position])
                    lightboxP.appendChild(mediaTitle)

                })
            }
            const moveRight = () => {
                if (position >= contenu.length - 1) {
                    position = 0;
                    emptyLightbox();
                    lightboxMedia.appendChild(contenu[position])
                    mediaTitle.textContent = contenu[position].alt || contenu[position].title
                    return;
                }
                emptyLightbox();
                lightboxMedia.appendChild(contenu[position + 1])
                mediaTitle.textContent = contenu[position + 1].alt || contenu[position + 1].title
                position++;
            }
            const moveLeft = () => {
                if (position < 1) {
                    emptyLightbox();
                    position = contenu.length - 1
                    lightboxMedia.appendChild(contenu[position])
                    mediaTitle.textContent = contenu[position].alt || contenu[position].title
                    return
                }
                emptyLightbox();
                lightboxMedia.appendChild(contenu[position - 1])
                mediaTitle.textContent = contenu[position - 1].alt || contenu[position - 1].title
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
                    case "Escape":
                        lightboxP.style.display = "none"
                        cover.style.display = "none"
                        modal.style.display = "none"
                        break;
                }
            }
            // listener click & keydown qui utilise les fonctions moveLeft et moveRight en fonction de la touche appuyée
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