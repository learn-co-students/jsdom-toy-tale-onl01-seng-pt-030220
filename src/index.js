let addToy = false;

function getAllToys(){
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
     return response.json();
   })
   .then(function(object) {
     console.log(object);
     let characters = object 
     let collection = document.querySelector('toy-collection')
     
     characters.forEach(character =>{ 
      console.log(character)
      let div = document.createElement('div');
      div.className = "card"
    //  div.append(object.name)
     }) 
    //  document.body.innerHTML = object.id
   })

}


document.addEventListener("DOMContentLoaded", () => {
  getAllToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
