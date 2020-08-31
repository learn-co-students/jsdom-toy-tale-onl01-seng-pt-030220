let addToy = false;

function getAllToys(){
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
     return response.json();
   })
   .then(function(object) {
    //  console.log(object);
     const characters = object
     characters.forEach(character =>{ 
      const collection = document.querySelector('#toy-collection')  
      // console.log(character)
      let div = document.createElement('div');
      div.className = "card"
      div.innerHTML = `<h1>${character.name}</h1><br>
      <img src=${character.image} style="width:200px;height:200px;"><br><p>Likes: ${character.likes}</p><br>`
      console.log(collection, "this is collection")
      collection.appendChild(div)
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
