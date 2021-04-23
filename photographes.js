let header = document.querySelector('.main__header');
const container = document.getElementById('container');
let stockage = [];
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

      function headerTag(array) {
        let tagWrapper = document.createElement("span");
        tagWrapper.classList.add('header-tagWrapper')
        for (element of array) {
          let elt = document.createElement('button');
          elt.textContent = element;
          elt.classList.add('tagButton');
          tagWrapper.appendChild(elt);
          elt.addEventListener('click', () => {
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
        }
        header.appendChild(tagWrapper);
      }


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

      var wrapper = document.createElement("span");
      wrapper.classList.add('tagsWrapper');
      stockage[stockage.length - 1].appendChild(wrapper);

      for (let tag in photographes[photographe].tags) {
        let btn = document.createElement('button');
        btn.classList.add('tagButton');
        btn.textContent = "#" + photographes[photographe].tags[tag];
        wrapper.appendChild(btn);
        arrayTag.push(btn.textContent);
      }

      container.appendChild(stockage[stockage.length - 1]); // ajout du container plein au container principal de la page
    }
    //SORTIE DE BOUCLE (photographe in photographes)
    var unique = arrayTag.filter(onlyUnique);

    // tri tous les tags en double et les supprime
    headerTag(unique);

    // fonction de remplissage du header par des tags
  }).catch(function (error) {
    console.error('erreur');
    console.error(error);
  })


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
