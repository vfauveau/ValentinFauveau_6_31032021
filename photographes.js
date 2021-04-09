
const container = document.getElementById('container');
const stockage = [];

// on récupère la base de données
const myRequest = new Request ('data.json')
fetch(myRequest)
    .then((response) => {
        return response.json();
  }).then(function (data){
//data = totalité du contenu json // data.photographers = array qui contient les objets photographes
// pour chaque photographe du array data.photographers on créé une div
// photographe = nombre de photographes
      const photographes = data.photographers;
      for(photographe in photographes){
        stockage.push(document.createElement("div"));
        stockage[stockage.length-1].classList.add("photographe-wrapper");
        for(let i = 0 ; i < photographe.length ; i++){

          let image = document.createElement("img");
          image.textContent=photographes[photographe].portrait;
          stockage[stockage.length-1].appendChild(image);

          let name = document.createElement("h1");
          name.textContent=photographes[photographe].name ;
          stockage[stockage.length-1].appendChild(name);

          let endroit = document.createElement("p");
          endroit.textContent=photographes[photographe].city + "," + " " + photographes[photographe].country ;
          endroit.classList.add("location");
          stockage[stockage.length-1].appendChild(endroit);

          let tagline = document.createElement("p");
          tagline.textContent=photographes[photographe].tagline ;
          tagline.classList.add("tagline");
          stockage[stockage.length-1].appendChild(tagline);

          let price = document.createElement("p");
          price.textContent=photographes[photographe].price+"€" ;
          price.classList.add("price");
          stockage[stockage.length-1].appendChild(price);

          let tagWrapper = document.createElement("span");
          tagWrapper.classList.add('tagsWrapper');
          stockage[stockage.length-1].appendChild(tagWrapper);
          for(let tag of photographes[photographe].tags){
            let el = document.createElement("button");
            el.textContent="#"+tag;
            el.classList.add("tagButton")
            tagWrapper.appendChild(el);
          }
        }container.appendChild(stockage[stockage.length-1]);
      }
  }).catch(function(error){
      console.error('erreur');
      console.error(error);
  })


/* Création d'objets pour chaque image contenue dans le dossier de l'artiste 
une figure contenant l'image puis une figcaption contenant name = "" ; prix = "" ; like = onclick incr ++*/