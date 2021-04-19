//formulaire DOM
let modal = document.getElementById('modalForm');
let contact = document.getElementById('contactMe');
let submit = document.querySelector('.submit-button');
let closeForm = document.getElementById('closeForm');
// form inputs.value

let modalArtistName = document.querySelector('.photographersName');
let nameTitle = document.querySelector(".photographer-name");
let endroit = document.querySelector(".photographer-location");
let tagline = document.querySelector(".photographer-tagline");
let imageProfil = document.querySelector('.thumb-photographer-picture');
let tagWrapper = document.querySelector('.tagWrapper');
let getId = localStorage.getItem("idphot");

let container = document.getElementById('container');
function openModal() {
    modal.style.display = "block"
}
function closeModal() {
    modal.style.display = "none"
}

contact.addEventListener('click', openModal);
closeForm.addEventListener('click', closeModal);

class factory {
    static create(type = "img") {
        if (type == "img") return new imageFactory();
        if (type == "video") return new videoFactory();
    }
}

class imageFactory {
    constructor() {
        this.el = document.createElement('img');
        this.el.classList.add('photographie');
    }
    affich(content) {
        this.el.src = content;
        figure.appendChild(this.el)
    }
}

class videoFactory {
    constructor() {
        this.el = document.createElement("video");
        this.el.appendChild(document.createElement("source"));
    }
    affich(content) {
        this._el.children[0].src = content;
        return document.body.appendChild(this._el);
    }
}


const myRequest = new Request('data.json')
fetch(myRequest)
    .then((response) => {
        return response.json();
    }).then(function (data) {
        const photographes = data.photographers;
        const medias = data.media;
        for (let photographe in photographes) {
            if (getId == photographes[photographe].id) {
                nameTitle.textContent = photographes[photographe].name
                endroit.textContent = photographes[photographe].city + ", " + photographes[photographe].country
                tagline.textContent = photographes[photographe].tagline
                imageProfil.src = "Sample Photos/Photographers ID Photos/" + photographes[photographe].portrait;
                for (let tag of photographes[photographe].tags) { // pour chaque tag de chaque [tags] de chaque photographe du tableau photographes
                    let el = document.createElement("button");
                    el.textContent = "#" + tag;
                    el.classList.add("tagButton");
                    tagWrapper.appendChild(el);
                }
                for (media in medias) {
                    if (medias[media].photographerId == getId) {
                        let figure = document.createElement('figure');
                        let figcaption = document.createElement('figcaption');
                        figure.appendChild(figcaption);
                        container.appendChild(figure);
                        let im1 = factory.create('img');
                        im1.affich("Sample Photos/")
                    }
                }
            }
        }
    }).catch(function (error) {
        console.error('erreur');
        console.error(error);
    });




    for (let tag in photographes[photographe].tags) {
        let el = document.createElement("button");
        let tags = photographes[photographe].tags[tag]; // chaque tag individuel de chaque photographe
        el.textContent = "#" + tags;
        el.classList.add("tagButton");
        tagWrapper.appendChild(el);
        el.addEventListener('click', () => {
          localStorage.setItem('filtre', el.textContent);
          var test = localStorage.getItem('filtre');
          for(photographe in photographes[photographe]){
          if(!"#"+photographes[photographe].tags.includes(test)){
              console.log(photographes[photographe].tags)
              console.log(test)
              stockage[photographe].style.display="none"
            }
          }
        })
        arrayTag.push(el.textContent);
        // push tous les tags dans un tableau les regroupant
      }