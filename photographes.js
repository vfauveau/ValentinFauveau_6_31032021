
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
      const photographes = data.photographers
      for(photograph in photographes){
        stockage.push(document.createElement("div"));

        for(let i = 0 ; photographes.length > i ; i++){

            let titre = document.createElement('h1'); // creation elt html h1
            titre.textContent = photographes[i].name; // on ajoute le contenu du texte
            stockage[stockage.length-1].appendChild(titre); // on append les titres à la div photographerUser[]

            let location = document.createElement('p');
            location.textContent = photographes[i].city + "," + " " + photographes[i].country ;
            stockage[stockage.length-1].appendChild(location);

            let tagline = document.createElement('p');
            tagline.classList.add("tagline")
            tagline.textContent = photographes[i].tagline ;
            stockage[stockage.length-1].appendChild(tagline);

            let price = document.createElement('p');
            price.textContent = photographes[i].price + "€" ;
            stockage[stockage.length-1].appendChild(price);

            let spanStockage = document.createElement('span');
            stockage[stockage.length-1].appendChild(spanStockage);
        }
      }container.appendChild(stockage[stockage.length-1]);
  }).catch(function(error){
      console.error('erreur');
      console.error(error);
  })

    //boucle for pour chaque image dans json créé un élément associéé dans lhtml avec tous la meme classe et contenu dans un bloc avec affichage flex ou grid

    /* boucle pour chaque photographe ;
        créé une div avec une photo,
        un h1 (photographers.name),
        un <p>avec (city +","+ country)</p>,
        un <p> avec photographers.tagline.</p>,
        un <small>avec price. + "€/jour"</small> +
        un span ou une div contenant des éléments tags créés chacun leur tour en fonction du nombre de tags dans l'array tags[]

        il faut que chaque élément soit append et possède le meme style (classe css)
        créér des éléments + style + append */