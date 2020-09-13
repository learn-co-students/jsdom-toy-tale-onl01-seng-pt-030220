let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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


const toysUrl = "http://localhost:3000/toys"

function getToys(){
  return fetch(toysUrl)
  .then(function(response){
    return response.json()
  })
  .then(json => {
    let toys = json 
    toys.forEach((toy) => displayToys(toy)); 
  })
}

function displayToys(toy){
  const toyCollection = document.getElementById("toy-collection")
  const displayCart = document.createElement("div")
  displayCart.className = "card"
  toyCollection.appendChild(displayCart)
  let name = document.createElement("h2")
  name.innerHTML = toy.name 
  displayCart.appendChild(name)
  let image = document.createElement("img") 
  image.className = "toy-avatar"
  image.src = toy.image
  displayCart.appendChild(image)
  const likesNum = document.createElement("p") 
  likesNum.innerText = `${toy.likes} Likes`
  document.createElement("button")
  let likes = document.createElement("button")
  likes.className = "like-btn"
  likes.setAttribute("id", toy.id)
  displayCart.appendChild(likesNum)
  displayCart.appendChild(likes)

  likes.addEventListener("click", function(e){
    likeToy(e)
    likesNum.innerText = `${++(toy.likes)} Likes`

  })
}; 

function likeToy(e){
  e.preventDefault() 
  let newLike = parseInt(e.target.previousElementSibling.innerText) +1 
   let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLike  
    })
  };

  return fetch(`${toysUrl}/${e.target.id}`, configObj)
    .then(function(response){
      return response.json();
    })
}

let toyForm = document.querySelector('.container')

function submitToyForm(){
    toyForm.addEventListener("submit", function(e){
    e.preventDefault() 
    let toyName = document.querySelector('input[name = "name"]')
    let toyImage = document.querySelector('input[name = "image"]')
    getNewToy(toyName.value, toyImage.value)
  })
}; 


function getNewToy(name, image, likes = 0 ){
  let configObject = {
    method: "POST", 
    headers :{ 
      "Content-Type" : "application/json", 
      Accept : "application/json"
    },
    body :JSON.stringify({
      name, 
      image, 
      likes
    })
   } 
   return fetch(toysUrl,configObject)
   .then(function(response){
     return response.json();
   })
   .then(function(object){
     displayToys(object) 
   })
}

submitToyForm()

document.addEventListener("DOMContentLoaded", function(){
  console.log("Hello from DOM Content Loader")
  getToys()
  displayToys()
})

