//formulaire DOM
let modal = document.getElementById('modalForm');
let contact = document.getElementById('contactMe');
let submit = document.querySelector('.submit-button');
let closeForm = document.getElementById('closeForm');
// form inputs.value
let firstNameInput = document.getElementById('firstName').value;
let lastNameInput = document.getElementById('lastName').value;
let emailInput = document.getElementById('email').value;
let yourMessageInput = document.getElementById('yourMessage').value;

let modalArtistName = document.querySelector('.photographersName');
let nameTitle = document.querySelector(".photographer-name");
let endroit = document.querySelector(".photographer-location");
let tagline = document.querySelector(".photographer-tagline");
let imageProfil = document.querySelector('.thumb-photographer-picture');
let tagWrapper = document.querySelector('.tagWrapper');
let divUser = document.getElementById('user');
let getId = localStorage.getItem("idphot");


function openModal() {
    modal.style.display = "block"
}
function closeModal() {
    modal.style.display = "none"
}

contact.addEventListener('click', openModal);
closeForm.addEventListener('click', closeModal);

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
            }
        }
    }).catch(function (error) {
        console.error('erreur');
        console.error(error);
    });

