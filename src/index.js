let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
document.addEventListener("DOMContentLoaded", () => {

    //console.log("Dom is loaded")
    fetch("http://localhost:3000/toys")
        .then(function(response) {
            return response.json()
        })
        .then(function(object) {
            card(object)
        })
        .catch(function(error) {

            console.log(error.message)
        });


    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
        } else {
            toyFormContainer.style.display = "none";
        }
    })


    toyFormContainer.addEventListener("submit", function(e) {
        e.preventDefault()
        const name = e.target.name.value
        const image = e.target.image.value
        const dataObj = {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "image": image,
                "likes": 9
            })



        }

        fetch("http://localhost:3000/toys", dataObj)
            .then(resposne => response.json())
            .then(function(toy) {
                card(toys)
            })

    })



    const toy_collect = document.querySelector("#toy-collection")

    function card(toys) {
        for (const toy of toys) {
            const toyTag = `<div class="card">
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
            <p>${toy.likes} Likes </p>
            <button id="${toy.id}" class="like-btn">Like <3</button>
          </div>`;
            toy_collect.innerHTML += toyTag
        }

    }

    const like_btn = document.querySelector(".like-btn")
    const cardlike = document.querySelector(".card")
    toy_collect.addEventListener("click", function(e) {

        if (e.target.className == "like-btn") {

            let currentlike = parseInt(e.target.previousElementSibling.innerText)
            let newlike = currentlike + 1
            e.target.previousElementSibling.innerText = `${newlike} likes`

            fetch("http://localhost:3000/toys/${e.target.id}", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({

                    "likes": newlike
                })
            })

            .then(res => res.json())
                .then(function(res) { res.likes })

        }

    })

});