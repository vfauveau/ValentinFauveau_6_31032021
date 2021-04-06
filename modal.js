let modal = document.getElementById('modalForm');
let contact = document.getElementById('contactMe');
let closeForm = document.getElementById('closeForm');
function openModal(){
    modal.style.display="block"
}
function closeModal(){
    modal.style.display="none"
}

contact.addEventListener('click' , openModal);
closeForm.addEventListener('click' , closeModal);