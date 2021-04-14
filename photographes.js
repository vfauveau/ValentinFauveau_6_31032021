
const container = document.getElementById('container');
let stockage = [];
let header = document.querySelector('.main__header');
let arrayTag = [];


// on récupère la base de données
const myRequest = new Request('data.json')
fetch(myRequest)
  .then((response) => {
    return response.json();
  }).then(function (data) {
    //data = totalité du body json // data.photographers = array qui contient les objets photographes
    // pour chaque photographe du array data.photographers on créé une div
    // photographe = nombre de photographes(0,1,2,3,4,5)
    const photographes = data.photographers;
    for (let photographe in photographes) {
      stockage.push(document.createElement("div"));
      stockage[stockage.length - 1].classList.add("photographe-wrapper");
      var lienImage = document.createElement('a');
      lienImage.addEventListener("click", () => {
        localStorage.setItem("idphot", photographes[photographe].id);
        location.href = "photographer-page.html"
      }); // écouteur d'évenement clique sur le lien contenant l'image ;
      // envoi la valeur de l'id correspondant au photographe selectionné dans le localstorage

      let image = document.createElement("img");
      image.classList.add('thumb-photographer-picture');
      image.src = "Sample Photos/Photographers ID Photos/" + photographes[photographe].portrait;
      lienImage.appendChild(image);
      stockage[stockage.length - 1].appendChild(lienImage);

      let name = document.createElement("h1"); // creation d'element HTML
      name.classList.add('thumb-photographer-name'); // ajout d'une classe
      name.textContent = photographes[photographe].name; // ajout du contenu
      stockage[stockage.length - 1].appendChild(name); // ajout de l'élément à la div
      // repeat
      let endroit = document.createElement("p");
      endroit.textContent = photographes[photographe].city + ", " + photographes[photographe].country;
      endroit.classList.add('thumb-photographer-location');
      stockage[stockage.length - 1].appendChild(endroit);

      let tagline = document.createElement("p");
      tagline.textContent = photographes[photographe].tagline;
      tagline.classList.add("thumb-photographer-tagline");
      stockage[stockage.length - 1].appendChild(tagline);

      let price = document.createElement("p");
      price.textContent = photographes[photographe].price + "€";
      price.classList.add("thumb-photographer-price");
      stockage[stockage.length - 1].appendChild(price);

      let tagWrapper = document.createElement("span");
      tagWrapper.classList.add('tagsWrapper');
      stockage[stockage.length - 1].appendChild(tagWrapper);
      for (var tag of photographes[photographe].tags) {
        // pour chaque tag de chaque [tags] de chaque photographe du tableau photographes
        let el = document.createElement("button");
        el.textContent = "#" + tag;
        el.classList.add("tagButton");
        tagWrapper.appendChild(el);
        arrayTag.push(el.textContent);// vérifier que les strings ne sont pas en double puis les ajouter a un span dans le header
      }
      container.appendChild(stockage[stockage.length - 1]); // ajout du container plein au container principal de la page
    } //SORTIE DE BOUCLE (photographe in photographes)
    removeDuplicates(arrayTag);// fonction qui tri l'array et enlève les tags en double
    arrayTag.splice(8, 8); // efface la variable sport car sports existe
    headerTag(); // fonction de remplissage du header par des tags
  }).catch(function (error) {
    console.error('erreur');
    console.error(error);
  })

/*quand evenement clic sur photo artist ou sur tag // si id artist = id phtotgraphe dans medias => créé {
  une image ou une figure
  un nom
  un prix
  un nombre de like
  un span ou une figcaption qui contiendra tout ça
---
Listener sur chaque btn tags / conversion de HTMLCollection en array ?
prend le textContent du btn cliqué => le cherche dans les spans contenants les tags des artistes
si oui = artiste ne change pas / sinon la div qui contient l'artiste devient un display : none ;
}


EventListener sur les liens / quand clic envoi l'id de l'artiste en localStorage
autre page get l'id de l'artiste ==> si id artist = idphotographer(media)

quand evenement clic sur photo artist ou sur tag // si id artist = id phtotgraphe dans medias => créé {
  une image ou une figure
  un nom
  un prix
  un nombre de like
  un span ou une figcaption
}
et rempli la div du haut en changeant le texte content en fonction de l'id du photographe. boucle qui vérifie l'id des photographes et si id == id
*/


function removeDuplicates(arrayTag) {
  let unique = {};
  arrayTag.forEach(function (i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

function headerTag() {
  let tagWrapper = document.createElement("span");
  tagWrapper.classList.add('header-tagWrapper')
  for (element of arrayTag) {
    let elt = document.createElement('button');
    elt.textContent = element;
    elt.classList.add('tagButton');
    tagWrapper.appendChild(elt);
  } header.appendChild(tagWrapper);
}


