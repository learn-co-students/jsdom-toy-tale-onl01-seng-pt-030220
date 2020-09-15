let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let toyCollection = document.querySelector("#toy-collection")
  const addToyForm = toyFormContainer.firstElementChild
  //let likeButton = document.querySelectorAll(".like-btn")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

//fetch to get initial toys
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => createToys(data))

    //let likeButtons = document.querySelectorAll(".like-btn")
    //console.log(likeButtons)

//create new tosy from array
  function createToys(data) {
    for(let i = 0; i < data.length; i++) {
      newToy(data[i])
    }
  }

//render a specific toy
  function newToy(data) {
  let div = document.createElement("div")
  //console.log(data)
  div.class = "card"
  div.innerHTML = 
  `<h2> ${data.name} </h2> 
  <img src= ${data.image} class="toy-avatar" /> 
  <p id="likes">${data.likes} </p> 
  <button id="like-btn-${data.id}">Like <3</button>`

  toyCollection.appendChild(div)
  let likeBtn = document.querySelector(`#like-btn-${data.id}`)

  if(likeBtn) {
  likeBtn.addEventListener("click", (e) => {
    let likes = parseInt(e.target.parentElement.querySelector("#likes").innerText,10) 
    e.target.parentElement.querySelector("#likes").innerText = likes += 1
    //likes = likesNum + 1
  })}

  
  }
  
  //add Toy from form
  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = e.target.name.value
    let image = e.target.image.value
    addToytoDb(name, image)
    addToyForm.reset()
  })

  //add toy to DB

  function addToytoDb(name, image){
    let formData = {
      name: name,
      image: image,
      likes: 0,
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/toys", configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(object){
        newToy(object)
      })
  }

  //this is wrong, need to update !!!!!!
  // likeButton.addEventListener("click", (e) =>{
  //   console.log(e.target)
  // })
});
