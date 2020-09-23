const fetchToysUrl = 'http://localhost:3000/toys'
let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitToy = document.querySelector(".submit");

 

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });



  function fetchToys(){
    fetch(fetchToysUrl)
    .then(resp => resp.json())
    .then(json => json.forEach(toy=>renderToys(toy)))
    .catch(function(error){
      console.log(error)
    })
  };

  function renderToys(toy){
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const pTag = document.createElement('p');
    const button = document.createElement('button');

    document.body.appendChild(div)
    div.className = "card"

    h2.innerHTML = toy.name
    div.appendChild(h2)

    img.src = toy.image
    img.className = "toy-avatar"
    div.appendChild(img)

    pTag.innerHTML = toy.likes
    div.appendChild(pTag)

    button.className = "like-btn"
    button.innerHTML = "Like <3"
    button.setAttribute("id", toy.id)
    div.appendChild(button)

    button.addEventListener('click', (event)=>{
      pTag.innerHTML = toy.likes++
      console.log(event)
      addLikeToToy(event)
    })
  };


  function addLikeToToy(event,){
    event.preventDefault()
    const addLike = parseInt(event.target.previousElementSibling.innerText) + 1

    return fetch(`${fetchToysUrl}/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: addLike
      })
    })
    .then((resp)=> {
      return resp.json()
    })
  };


  function addNewToy(toyName, toyImage){
    let fetchToyObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    }

    return fetch(fetchToysUrl, fetchToyObject)
    .then(resp=>resp.json())
    .then(json=> json)
    .catch(error=>console.log(error))
  };


  submitToy.addEventListener('click', (e)=>{
    const newName = document.querySelector('[name="name"]').value
    const newImage = document.querySelector('[name="image"]').value

    addNewToy(newName, newImage);
  });
  fetchToys();
});
