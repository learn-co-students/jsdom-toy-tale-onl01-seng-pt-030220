let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const divCollection = document.querySelector('#toy-collection')

  function getToys() {
    return fetch('http://localhost:3000/toys')
      .then(res => res.json())
  }

  function postToy(toy_data) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollection.append(new_toy)
    })
  }

  function renderToys(toy) {
   
    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let button = document.createElement('button')
    button.setAttribute('class', 'like-btn')
    button.setAttribute('id', toy.id)
    button.innerText = "like"
    button.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    })

    let div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.append(h2, img, p, button)
    divCollection.append(div)
  }

  function likes(e) {
    e.preventDefault()
    let more = parseInt(e.target.previousElementSibling.innerText) +1

    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(response => response.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })

});
