document.addEventListener("DOMContentLoaded", function() {
  const modelsContainer = document.getElementById('models-container');
  const searchInput = document.getElementById("searchInput");

  // Fetch models from server
  fetch('http://localhost:3000/Models')
    .then(response => response.json())
    .then(models => {
      let index = 0;
      // Create HTML for each model
      models.forEach(model => {
        const card = document.createElement('div');
        const cardImage = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const cardCategory = document.createElement("p");
        const cardAvailability = document.createElement("p");
        const cardButton1 = document.createElement("button");
        const cardButton2 = document.createElement("button");
        const cardButton3 = document.createElement("button");
        const cardButton4 = document.createElement("button");
        const cardLikes = document.createElement("span");
        const cardButton5 = document.createElement("button");

        cardTitle.innerText = model.name;
        cardImage.src = model.poster;
        cardCategory.innerText = `Category: ${model.category}`;
        cardAvailability.innerText = `Availability: ${model.availability}`;
        cardButton1.innerText = "MODEL DETAILS";
        cardButton2.innerText = "BOOK MODEL";
        cardButton3.innerText = "👍";
        cardButton4.innerText = "DELETE MODEL";
        cardButton5.innerText = "UPDATE DETAILS";

        cardButton1.setAttribute("class", "btn btn-primary mr-3");
        cardButton2.setAttribute("class", "btn btn-primary book-btn");      
        cardButton3.setAttribute("class", "btn btn-primary like-btn");     
        cardButton4.setAttribute("class", "btn btn-danger delete-btn");
        cardButton5.setAttribute("class", "btn btn-warning update-btn");
        card.setAttribute("class", "card");
        cardBody.setAttribute("class", "card-body");
        cardLikes.setAttribute("class", "likes");


        card.setAttribute("class", "card");
        cardBody.setAttribute("class", "card-body");


        cardButton1.addEventListener("click", () => { 
          const cardDetails = document.createElement("div");
          const cardGender = document.createElement("p");
          const cardAge = document.createElement("p");
          const cardHeight = document.createElement("p");
          const cardSize = document.createElement("p");
          const cardAvailability = document.createElement("p");
          const cardDescription = document.createElement("p");

          cardGender.innerText = `Gender: ${model.gender}`; 
          cardAge.innerText = `Age: ${model.age}`; 
          cardHeight.innerText = `Height: ${model.height} cm`; 
          cardSize.innerText = `Size: ${model.size}`;
          cardAvailability.innerText=`Availability: ${model.availability}`;
          cardDescription.innerText = `Description: ${model.description}`;

          cardDetails.appendChild(cardGender);
          cardDetails.appendChild(cardAge);
          cardDetails.appendChild(cardHeight);
          cardDetails.appendChild(cardSize);
          cardDetails.appendChild(cardAvailability);
          cardDetails.appendChild(cardDescription);

          cardBody.appendChild(cardDetails);

        });


        cardButton4.addEventListener("click", () => {
          if(confirm("delete model?")) {
            fetch(`http://localhost:3000/Models/${model.id}`,{
              method: 'DELETE',
              headers:{ 
                'Content-Type':'application/json'
              },
              body: JSON.stringify(model)
            })
            .then(response => response.json())
            .then( data => {
              card.remove();
            })
            .catch(error => console.error(error));
          }
        })

        cardButton2.addEventListener('click', () => {
          fetch(`http://localhost:3000/Models/${model.id}`, {
            method: 'PATCH',
            headers:{
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({availability: 'unavailable'}),
          }).then((response) => response.json())
          .then((data) =>{
            cardAvailability.innerText=`Availability: ${data.availability}`;
            cardButton2.classList.toggle('booked');
            cardButton2.disabled = true;
            cardButton2.innerText = 'Booked';
          })  
        });
        
        const likeCount = document.createElement('span');

        likeCount.innerText = '0';
        likeCount.setAttribute('id', 'likeCount');
        cardBody.appendChild(likeCount);
        cardButton3.addEventListener('click', () => {
          let likes = parseInt(likeCount.innerText);
          likes++;
          likeCount.innerText = likes.toString();
        })

        cardButton5.addEventListener("click", () => {
          const cardDetails = document.createElement("div");
          const cardNameInput = document.createElement("input");
          const cardPosterInput = document.createElement("input");
          const cardCategoryInput = document.createElement("input");
          const cardAvailabilityInput = document.createElement("input");
          const cardGenderInput = document.createElement("input");
          const cardAgeInput = document.createElement("input");
          const cardHeightInput = document.createElement("input");
          const cardSizeInput = document.createElement("input");
          const cardDescriptionInput = document.createElement("input");
          const cardSaveButton = document.createElement("button");
        
          cardNameInput.value = model.name;
          cardPosterInput.value = model.poster;
          cardCategoryInput.value = model.category;
          cardAvailabilityInput.value = model.availability;
          cardGenderInput.value = model.gender;
          cardAgeInput.value = model.age;
          cardHeightInput.value = model.height;
          cardSizeInput.value = model.size;
          cardDescriptionInput.value = model.description;
          cardSaveButton.innerText = "Save Changes";
        
          cardDetails.appendChild(cardNameInput);
          cardDetails.appendChild(cardPosterInput);
          cardDetails.appendChild(cardCategoryInput);
          cardDetails.appendChild(cardAvailabilityInput);
          cardDetails.appendChild(cardGenderInput);
          cardDetails.appendChild(cardAgeInput);
          cardDetails.appendChild(cardHeightInput);
          cardDetails.appendChild(cardSizeInput);
          cardDetails.appendChild(cardDescriptionInput);
          cardDetails.appendChild(cardSaveButton);

          cardBody.appendChild(cardDetails);

          cardSaveButton.addEventListener("click", () => {
            const updatedModel = {
              id: model.id,
              name: cardNameInput.value,
              poster: cardPosterInput.value,
              category: cardCategoryInput.value,
              availability: cardAvailabilityInput.value,
              gender: cardGenderInput.value,
              age: cardAgeInput.value,
              height: cardHeightInput.value,
              size: cardSizeInput.value,
              description: cardDescriptionInput.value,
            };
        
            fetch(`http://localhost:3000/Models/${model.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedModel),
            })
              .then((response) => response.json())
              .then((data) => {
                // Update the model object in the `models` array
                models[index] = data;
        
                // Update the card with the new data
                cardTitle.innerText = data.name;
                cardImage.src = data.poster;
                cardCategory.innerText = `Category: ${data.category}`;
                cardAvailability.innerText = `Availability: ${data.availability}`;
        
                // Remove the update inputs
                cardDetails.remove();
              })
              .catch((error) => console.error(error));
          });
        });


        cardBody.appendChild(cardButton5);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardCategory);
        cardBody.appendChild(cardAvailability);
        cardBody.appendChild(cardButton1);
        cardBody.appendChild(cardButton2);
        cardBody.appendChild(cardButton3);
        cardBody.appendChild(cardButton4);
        cardBody.appendChild(cardButton5);

        card.appendChild(cardImage);
        card.appendChild(cardBody);

        // Create a form for adding new models
const form = document.createElement("form");
form.innerHTML = `
  <div class="form">
    <label for="name">Name:</label>
    <input type="text" class="form-control" id="name" required>
  </div>
  <div class="form">
    <label for="poster">Poster:</label>
    <input type="text" class="form-control" id="poster" required>
  </div>
  <div class="form">
    <label for="category">Category:</label>
    <input type="text" class="form-control" id="category" required>
  </div>
  <div class="form">
    <label for="gender">Gender:</label>
    <input type="text" class="form-control" id="gender" required>
  </div>
  <div class="form">
    <label for="age">Age:</label>
    <input type="text" class="form-control" id="age" required>
  </div>
  <div class="form">
    <label for="height">Height:</label>
    <input type="text" class="form-control" id="height" required>
  </div>
  <div class="form">
    <label for="size">Size:</label>
    <input type="text" class="form-control" id="size" required>
  </div>
  <div class="form">
    <label for="description">Description:</label>
    <textarea class="form-control" id="description" rows="3" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Add Model</button>
`;
modelsContainer.insertBefore(form, modelsContainer.firstChild);

// Add event listener for submitting the form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the form data
  const formData = {
    name: document.getElementById("name").value,
    poster: document.getElementById("poster").value,
    category: document.getElementById("category").value,
    gender: document.getElementById("gender").value,
    age: document.getElementById("age").value,
    height: document.getElementById("height").value,
    size: document.getElementById("size").value,
    description: document.getElementById("description").value,
    availability: "available",
  };

  // Send a POST request to the server with the new model data
  fetch("http://localhost:3000/Models", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Create a new card for the new model and add it to the HTML
      /*const newCard = createCard(data);
      modelsContainer.appendChild(newCard);*/

      // Reset the form
      form.reset();
    })
    .catch((error) => console.error(error));
});

        modelsContainer.appendChild(card);

        index++;
      });
    })
});
