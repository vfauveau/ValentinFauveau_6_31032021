let modal = document.getElementById('modalForm');
let contact = document.getElementById('contactMe');
let closeForm = document.getElementById('closeForm');
let modalArtistName = document.querySelector('.photographersName')
let divUser = document.getElementById('user')
function openModal(){
    modal.style.display="block"
}
function closeModal(){
    modal.style.display="none"
}

contact.addEventListener('click' , openModal);
closeForm.addEventListener('click' , closeModal);

const myRequest = new Request ('data.json')
fetch(myRequest)
    .then((response) => {
        return response.json();
  }).then(function(data){
      const medias = data.media ;
      
}).catch(function(error){
    console.error('erreur');
    console.error(error);
});
modalArtistName.textContent="Mimi Keel";