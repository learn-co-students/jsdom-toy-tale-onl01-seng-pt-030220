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

  function addToy(obj) {
    const toys = document.getElementById("toy-collection")
    const card = document.createElement("div")
    card.id = "card"
    const name = document.createElement("h2")
    name.innerHTML = obj["name"]
    card.appendChild(name)
    const img = document.createElement("img")
    img.src = obj["image"]
    img.class = "toy-avatar"
    img.width = 100
    img.height = 100
    card.appendChild(img)
    const likes = document.createElement("p")
    likes.innerHTML = obj["likes"] + " Likes"
    card.appendChild(likes)
    const button = document.createElement("button")
    button.class = "like-btn"
    button.innerText = "Like"
    button.id = obj["id"]
    card.appendChild(button)
    toys.appendChild(card)
    button.addEventListener("click", function(e) {
      const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: parseInt(likes.innerHTML) + 1,
          id: button.id
        })
      }

      fetch(`http://localhost:3000/toys/${button.id}`, configObj)
      .then(function(response) {
        return response.json()
      })
      .then(function(obj) {
        likes.innerHTML = obj["likes"] + " Likes"
      })
    })
  }

  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function(objects) {
    for (const obj of objects) {
      addToy(obj)
    }
  })

  const submit = document.querySelector("input.submit")
  submit.addEventListener("click", function(e) {
    e.preventDefault()
    const formObj = {
      name: document.querySelector("form")["name"].value,
      image: document.querySelector("form")["image"].value,
      likes: 0
    }
    console.log(formObj)
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formObj)
    }
    fetch("http://localhost:3000/toys", configObj)
    .then(function(response){
      return response.json()
    })
    .then(function(obj) {
      const toys = document.getElementById("toy-collection")
      const card = document.createElement("div")
      card.id = "card"
      const name = document.createElement("h2")
      name.innerHTML = obj["name"]
      card.appendChild(name)
      const img = document.createElement("img")
      img.src = obj["image"]
      img.class = "toy-avatar"
      img.width = 100
      img.height = 100
      card.appendChild(img)
      const likes = document.createElement("p")
      likes.innerHTML = obj["likes"] + " Likes"
      card.appendChild(likes)
      const button = document.createElement("button")
      button.class = "like-btn"
      button.innerText = "Like"
      button.id = obj["id"]
      card.appendChild(button)
      toys.appendChild(card)
      button.addEventListener("click", function(e) {
        const configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: parseInt(likes.innerHTML) + 1,
            id: button.id
          })
        }
  
        fetch(`http://localhost:3000/toys/${button.id}`, configObj)
        .then(function(response) {
          return response.json()
        })
        .then(function(obj) {
          likes.innerHTML = obj["likes"] + " Likes"
        })
      })
    })
  })


});
