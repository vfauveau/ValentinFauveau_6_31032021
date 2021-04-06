
const container = document.getElementById('container');
const photographersUser = [];

// on récupère la base de données
const myRequest = new Request ('data.json')
fetch(myRequest)
    .then((response) => {
        return response.json();
  }).then(function (data){
      for(const photograph of data.photographers){
        photographersUser.push(document.createElement("div"));

        for(let i = 0 ; i < photograph.length ; i++){
            let titre = document.createElement('h1');
            titre.textContent = photograph[i].name; // on ajoute le contenu du texte
            photographersUser[photographersUser.length-1].appendChild(titre); // on append les titres à la div photographerUser[]
        }
      }container.appendChild(photographersUser[photographersUser.length-1]);
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