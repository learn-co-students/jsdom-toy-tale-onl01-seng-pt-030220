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
      collection.appendChild(div)

      let h2 = document.createElement('h2')
      h2.innerText = character.name

      div.appendChild(h2)
      let img = document.createElement('img')
      img.className = "toy-avatar"
      img.src = character.image
      div.appendChild(img)


      let p = document.createElement('p')
      p.innerText = `${character.likes} Likes`
      div.appendChild(p)
      let likeBtn = document.createElement('button')
      likeBtn.className = "like-btn"
      likeBtn.innerText = "Like <3"
      likeBtn.setAttribute('id', character.id)
      likeBtn.addEventListener('click', function(e) {
        like(e),
        p.innerText = `${++(character.likes)} Likes`
      })
      // .addEventListener("click", (e) => like(e))
       div.appendChild(likeBtn)
      // div.innerHTML = `<h2>${character.name}</h2><br>
      // <img src=${character.image} class="toy-avatar" /><br>`
      // let p = document.createElement('p');
      // p.innerHTML = `Likes: ${character.likes}`
      // let btn = document.createElement('button');
      // btn.className = "like-btn"
      // btn.addEventListener("click", (e) => like(e))
      // btn.innerHTML = `Like <3`
      // <button class="like-btn">Like <3</button><br>`
      // console.log(collection, "this is collection")
      // collection.appendChild(div).appendChild(p).appendChild(btn)
    //  div.append(object.name)
     }) 
    //  document.body.innerHTML = object.id

   })

}


function like(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  console.log(e.target.previousElementSibling.innerText, "this more")
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

// function like(){
// const likeBtn = document.querySelector("button.like-btn");
// // console.log(likeBtn)
// likeBtn.addEventListener("click", (e) => {
//     let configObj = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify("likes": 1)
//     };
    
//   return fetch("http://localhost:3000/toys", configObj)
//   .then(function(response) {
//       return response.json();
//     })
//     .then(function(object) {
//       console.log(object);
//       getAllToys(object)
//       // document.body.innerHTML = object.id
//     })
//     .catch(function(error) {
//       alert("Bad things! Ragnarők!");
//       console.log(error.message);
//     });
// })
// }

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
    e.preventDefault()
    let input = document.querySelector('input.input-text')
    let image = document.querySelector('input.input-text-image')
    // let input = document.querySelector('input.input-text')
    // console.log(input.value, "this is input")
    // console.log(e.currentTarget.value, "this is event")
    submitData(input.value, image.value)
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
