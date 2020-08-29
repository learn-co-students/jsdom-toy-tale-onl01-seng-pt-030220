let addToy = false;


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

const toysUrl = "http://localhost:3000/toys" 

function fetchToys(){
  return fetch(toysUrl)
  .then(resp => resp.json())
  .then(json => {
    let toys = json
    toys.forEach ( (toy) => renderToys(toy));
  })
}

function renderToys(toy) {
  const toyCollection = document.getElementById("toy-collection")
  let cardDiv = document.createElement('div')
  cardDiv.className = "card"
  toyCollection.appendChild(cardDiv)
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  cardDiv.appendChild(h2)
  let img = document.createElement('img')
  img.className = "toy-avatar"
  img.src = toy.image
  cardDiv.appendChild(img)
  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  cardDiv.appendChild(p)
  let likeBtn = document.createElement('button')
  likeBtn.className = "like-btn"
  likeBtn.innerText = "Like <3"
  likeBtn.setAttribute('id', toy.id)
  cardDiv.appendChild(likeBtn)
  likeBtn.addEventListener('click', function(e) {
    likeToy(e),
    p.innerText = `${++(toy.likes)} Likes`
  })
}

function likeToy(e) {
  e.preventDefault()
 
  let newLike = parseInt(e.target.previousElementSibling.innerText) + 1
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newLike
    })
  };

  return fetch(`${toysUrl}/${e.target.id}`, configObj)
    .then(function(response){
      return response.json();
    })
}

fetchToys();

let toyForm = document.querySelector('.container')

function addNewToy() {
  toyForm.addEventListener("submit", function(e) {
    e.preventDefault()
    let toyName = document.querySelector("input[name='name']")
    let toyImg = document.querySelector("input[name='image']")
    newToy(toyName.value, toyImg.value)
  })
};

function newToy(name, image, likes = 0){

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      likes
    })
  };

  return fetch(toysUrl, configObj)
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      renderToys(object)
    })

};

addNewToy();