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
      div.innerHTML = `<h2>${character.name}</h2><br>
      <img src=${character.image} class="toy-avatar" /><br><p>Likes: ${character.likes}</p><button class="like-btn">Like <3</button><br>`
      // console.log(collection, "this is collection")
      collection.appendChild(div)
    //  div.append(object.name)
     }) 
    //  document.body.innerHTML = object.id
   })

}

function submitData(name, image){

  let formData = {
      name: name,
      image: image,
      likes: 0
    };

  let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        };
         
       return fetch("http://localhost:3000/toys", configObj)
       .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          console.log(object);
          getAllToys(object)
          // document.body.innerHTML = object.id
        })
        .catch(function(error) {
          alert("Bad things! Ragnarők!");
          console.log(error.message);
        });

}


document.addEventListener("DOMContentLoaded", () => {
  getAllToys();
  const form = document.querySelector("form.add-toy-form");
  const addBtn = document.querySelector("#new-toy-btn");
  form.addEventListener("submit", (e) => {
    event.preventDefault()
    let input = document.querySelector('input.input-text')
    let input = document.querySelector('input.input-text')
    console.log(input.value, "this is input")
    console.log(e.currentTarget.value, "this is event")
    // submitData(name, image)
  });
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
