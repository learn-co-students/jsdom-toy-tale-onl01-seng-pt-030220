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

const toyCollection = document.getElementById('toy-collection');
// let toyCollection = document.querySelector('#toy-collection');

// fetch the toys GET
function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    console.log(json);
    for (const element of json){
      console.log(element);
      newToyCard(element);
    }
  });
};

// Create cards for each toy in "toy-collection" <div class="card">
function newToyCard(obj){
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  // name: <h2>
  const title = document.createElement('h2');
  title.innerText = obj.name;
  card.appendChild(title);

  // image: <img src= class="toy-avatar">
  const img = document.createElement('img');
  img.setAttribute('src', obj.image);
  img.setAttribute('class', 'toy-avatar');
  card.appendChild(img);

  // likes: <p>
  const likes = document.createElement('p');
  likes.innerText = `${obj.likes} Likes`;
  card.appendChild(likes)

  // Like Button <button class="like-btn">
  const likeBtn = document.createElement('button');
  likeBtn.setAttribute('class', 'like-btn');
  likeBtn.innerText = 'Like <3';
  card.appendChild(likeBtn)

  //Like Button function on click
  likeBtn.addEventListener('click', function(event) {
    event.preventDefault;
    addLike(obj);
    likes.innerText = `${obj.likes + 1} Likes`;
  });

  toyCollection.appendChild(card);
};

// Add a New Toy to Andy's Toy Collection POST http://localhost:3000/toys 
function makeNewToy(){
  const newToyObj = {
    name: document.querySelector('input[name="name"]').value,
    image: document.querySelector('input[name="image"]').value,
    likes: 0
  };
  const postToyObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  };
  fetch("http://localhost:3000/toys", postToyObj)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log(json);
    })
    .catch(function(error){
      console.log(error.message);
    })
}
const submitButton = document.querySelector('input[name="submit"]');
submitButton.addEventListener('click', function(event){
  event.preventDefault;
  makeNewToy();
})

// Add a Like to Toy http://localhost:3000/toys/:id
function addLike(obj){
  const likeObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': obj.name,
      'image': obj.image,
      'likes': obj.likes ++
    })
  }

  return fetch(`http://localhost:3000/toys/${obj.id}`, likeObj)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      console.log(json)
    })
    .catch(function(error){
      console.log(error.message);
    });
};

fetchToys();