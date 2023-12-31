const signUpButton = $("#signUpFooterButton");
const emailInput = $("#SignUpFooter");
const storedEmail = $("#storedEmail");

$(document).ready(function () {
  // ----------Declared Variables--------
  const searchButton = $("#searchBarButton");
  const appId = "39493a96";
  const apiKey = "5ab9dc34c074ab5086a207e32c79a563";
  const headerSection = $(".container-fluid.row.d-flex.justify-content-center");
  const headerButtons = $(".headerButton");

  //   ------------hide content and display it function-------
  headerButtons.on("click", function () {
    const target = $(this).data("target");
    const selectedValue = $(this).data("value");
    headerSection.addClass("d-none");
    $("#" + target).removeClass("d-none");
    // searchQuery = $(this).data("value");
    fetchAPI(selectedValue);
  });
  // targets the search input area and click event on search code
  searchButton.on("click", (e) => {
    e.preventDefault();
    searchQuery = $("#searchInputArea").val();
  });

  // -----------function generating random numbers
  // var firstNumber;
  // var secondNumber;
  // function RandomNumbers() {
  //   var diference = Math.floor(Math.random() * (8 - 6 + 1)) + 6;
  //   firstNumber = Math.floor(Math.random() * (100 - diference + 1));
  //   secondNumber = firstNumber + diference;
  //   return [firstNumber, secondNumber];
  // }
  // RandomNumbers();

  //   -----------------Fetch data from API ------------
  async function fetchAPI(selectedValue) {
    const [firstNumber, secondNumber] = RandomNumbers();
    const baseURL = `https://api.edamam.com/search?q=${selectedValue}&app_id=${appId}&app_key=${apiKey}&from=${firstNumber}&to=${secondNumber}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateCards(data.hits);
    // console.log(data);
  }
  function RandomNumbers() {
    var diference = Math.floor(Math.random() * (8 - 6 + 1)) + 6;
    firstNumber = Math.floor(Math.random() * (100 - diference + 1));
    secondNumber = firstNumber + diference;
    return [firstNumber, secondNumber];
  }
  //   --------------Function for generating cards --------
  var searchResult = $(".searchResult"); // targets HTML area were cards will be displayed
  function generateCards(results) {
    searchResult.empty();

    let rowContainer;

    results.forEach((result, i) => {
      if (i % 3 === 0) {
        // Starts a new row after every 3 cards
        rowContainer = $("<div class='row'></div>");
        searchResult.append(rowContainer); //append container to the search result area
      }
      //cards structure
      const cardHTML = `
      <div class="col-md-4 my-2">
        <div class="card card-hover" >
        <div class="position-relative">
          <img src="${
            result.recipe.image
          }" class="card-img-top" alt="cardImage">
        <a href="#">  <span class="save-icon" data-index="${i}">&#10084;</span></a>
          </div>
          <div class="card-body">
            <h5 class="card-title">${result.recipe.label}</h5>
            <p class="card-text"> Cuisine type: ${
              result.recipe.cuisineType
            } </p>
            <p class="card-text"> Meal type: ${
              result.recipe.mealType
            } </p>             <p class="card-text"> Calories ${result.recipe.calories.toFixed(
        2
      )}</p>
              <p class="card-text"> Cooking time: ${result.recipe.totalTime} min
              </p>
            <div class="row d-flex justify-content-end">
            <a href="${
              result.recipe.url
            }" class="btn btn-secondary">View Recipe</a>

          </div>
        </div>
      </div>
    `;

      rowContainer.append(cardHTML); //apend to the conainer
    });
  }
  //   --------------------------------End-----------
});

$(".save-icon").on("click", function () {
  const dataIndex = $(this).data("index");
  const selectedRecipe = results[dataIndex].recipe; //grabs recipe detail by data-index created in regenerated cards
  const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  //if statement to save recipe is condition are meet and push it to the array
  if (!savedRecipes.some((recipe) => recipe.label === selectedRecipe.label)) {
    savedRecipes.push(selectedRecipe);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    alert("Recipe saved!");
  } else {
    alert("Recipe already saved!");
  }
});

//gets the data recipe from local storage and parse it back from string in array
function getSavedRecipes() {
  return JSON.parse(localStorage.getItem("savedRecipes")) || [];
}

//event listener storing the data from sign up section
signUpButton.click(function () {
  const email = emailInput.val();

  if ($.trim(email) !== "") {
    localStorage.setItem("userEmail", email);

    emailInput.val("");

    showSubscribtionMessage();
  }
});
// ----------function to inform user that we have his/her email in our data base after checking data from local storage
function showSubscribtionMessage() {
  const Email1 = localStorage.getItem("userEmail");
  if (Email1) {
    storedEmail.text("Thank you for your subscription: " + Email1);
  }

  setTimeout(function () {
    storedEmail.text("");
  }, 1000);
}
