let header = document.querySelector(".main__header");
const container = document.getElementById("container");
// stockage = tableau qui contient les divs avec les informations de chaque photographe
let stockage = [];
let arrayTag = [];
// Apparition du lien de redirection vers le container sur un évènement onscroll
let redirectLink = document.getElementById("linkMain");
// enlève le lien qui amène vers le container des médias si la résolution de l"écran est inférieure à 700px
if (window.matchMedia("(max-width: 700px)").matches) {
  document.body.removeChild(redirectLink)
}
// on récupère la base de données
const myRequest = new Request("data.json")
fetch(myRequest)
  .then((response) => {
    return response.json();
  }).then(function (data) {
    //data = totalité du body json // data.photographers = array qui contient les objets photographes
    // pour chaque photographe du array data.photographers on créé une div
    // photographe = index du tableau contenant l"ensemble des photographes
    const photographes = data.photographers;

    for (let photographe in photographes) {

      stockage.push(document.createElement("div"));
      stockage[stockage.length - 1].classList.add("photographe-wrapper");
      var lienImage = document.createElement("a");
      lienImage.classList.add("photograph-link");
      lienImage.setAttribute("tabindex", "0");
      lienImage.addEventListener("click", () => {
        localStorage.setItem("idphot", photographes[photographe].id);
        location.href = "photographer-page.html"
      });
      lienImage.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13){
        localStorage.setItem("idphot", photographes[photographe].id);
        location.href = "photographer-page.html"
        }})
      // écouteur d"évenement clique sur le lien contenant l"image ;
      // envoi la valeur de l"id correspondant au photographe selectionné dans le localstorage
      let image = document.createElement("img");
      image.classList.add("thumb-photographer-picture");
      image.src = "Sample Photos/Photographers ID Photos/" + photographes[photographe].portrait;
      lienImage.appendChild(image);
      image.setAttribute("alt", photographes[photographe].name)
      let name = document.createElement("h2"); // creation d"element HTML
      name.classList.add("thumb-photographer-name"); // ajout d"une classe
      name.textContent = photographes[photographe].name; // ajout du contenu
      lienImage.appendChild(name);
      stockage[stockage.length - 1].appendChild(lienImage);

      // repeat
      let endroit = document.createElement("p");
      endroit.textContent = photographes[photographe].city + ", " + photographes[photographe].country;
      endroit.classList.add("thumb-photographer-location");
      stockage[stockage.length - 1].appendChild(endroit);

      let tagline = document.createElement("p");
      tagline.textContent = photographes[photographe].tagline;
      tagline.classList.add("thumb-photographer-tagline");
      stockage[stockage.length - 1].appendChild(tagline);

      let price = document.createElement("p");
      price.textContent = photographes[photographe].price + "€";
      price.classList.add("thumb-photographer-price");
      stockage[stockage.length - 1].appendChild(price);

      var wrapper = document.createElement("span");
      wrapper.classList.add("tagsWrapper");
      stockage[stockage.length - 1].appendChild(wrapper);

      for (let tag in photographes[photographe].tags) {
        let btn = document.createElement("button");
        btn.classList.add("tagButton");
        btn.textContent = "#" + photographes[photographe].tags[tag];
        btn.setAttribute("aria-label", "tag")
        // filtre et liens vers photographes taggés
        btn.addEventListener("click", () => {
          for (let x = 0; x < stockage.length; x++) {
            stockage[x].style.display = "flex";
          }
          let filtre = btn.textContent.substring(1);
          for (let i = 0; photographes.length > i; i++) {
            if (!photographes[i].tags.includes(filtre)) {
              stockage[i].style.display = "none";
            }
          }
        })
        // append de tout les éléments boutons, creation d'un array de tags
        wrapper.appendChild(btn);
        arrayTag.push(btn.textContent);
      }
      container.appendChild(stockage[stockage.length - 1]); // ajout du container plein au container principal de la page
    }
    //SORTIE DE BOUCLE (photographe in photographes)
    // Filtre du caractères unique des tags, afin de ne pas créér des tags similaires dans la barre de navigation
    var unique = arrayTag.filter(onlyUnique);
    let tagWrapper = document.querySelector(".header-tagWrapper")
    // filtre et liens vers photographes taggés
    for (let element of unique) {
      let elt = document.createElement("button");
      elt.textContent = element;
      elt.classList.add("tagButton");
      tagWrapper.appendChild(elt);
      // event listener 
      elt.addEventListener("click", () => {
        for (let x = 0; x < stockage.length; x++) {
          stockage[x].style.display = "flex";
        }
        let filtre = elt.textContent.substring(1);
        for (let i = 0; photographes.length > i; i++) {
          if (!photographes[i].tags.includes(filtre)) {
            stockage[i].style.display = "none";
          }
        }
      })
      // Remplissage du nav-header par le span contenant les boutons tags
      header.appendChild(tagWrapper);
    }
    // listener sur tous les boutons pour déclencher l'apparition du bouton "passer au contenu"
    let allBoutons = document.getElementsByTagName("button");
    for (let i of allBoutons) {
      i.addEventListener("click", () => {
        redirectLink.style.display = "block"
      })

      //gestion du bouton "passer au contenu"
      redirectLink.onclick = () => {
        for (let i in stockage) {
          stockage[i].style.display = "flex";
        }
        redirectLink.style.display = "none";
      }
    }
  }).catch(function (error) {
    console.error("erreur");
    console.error(error);
  })
// fonction qui supprime les doublons dans un array
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

