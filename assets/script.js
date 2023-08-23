// fetchData(); // Call the async function

// $(document).ready(function () {
//   var apiKey = "";
//   var id = "5ed6604691c37cdc054bd0d0"; // Replace with the actual endpoint you want to use
//   var queryURL = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;

//   fetch(queryURL)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Process the fetched data
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Fetch error:", error);
//     });
// });
// $(document).ready(function () {
//   $("#searchButton").click(function () {
//     const searchQuery = $("#searchInput").val();
//     if ($.trim(searchQuery) !== "") {
//       const apiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(
//         searchQuery
//       )}`;
//       $.getJSON(apiUrl)
//         .done(function (data) {
//           console.log(data);
//           const resultsDiv = $("#results");
//           resultsDiv.empty();

//           data.data.recipes.forEach((recipe) => {
//             const recipeDiv = $("<div>").text(recipe.image_url);
//             resultsDiv.append(recipeDiv);
//           });
//         })
//         .fail(function (error) {
//           console.error("Fetch error:", error);
//         });
//     }
//   });   5ab9dc34c074ab5086a207e32c79a563
// });   39493a96
// ----------Event Listeners for Headers------

$(document).ready(function () {
  // -------------function for hiden and show content
  const searchButton = $("#searchBarButton");
  let searchQuery = "";
  const appId = "";
  const apiKey = "";
  var search = $("#searchInputArea").val();
  const headerSection = $(".container-fluid.row.d-flex.justify-content-center");
  const headerButtons = $(".headerButton");
  // -----------------hide content and display it function
  headerButtons.on("click", function () {
    const target = $(this).data("target");
    const selectedValue = $(this).data("value");
    headerSection.addClass("d-none");
    $("#" + target).removeClass("d-none");
    // searchQuery = $(this).data("value");
    fetchAPI(selectedValue);
  });
  // searchButton.on("click", (e) => {
  //   e.preventDefault();
  //   searchQuery = $("#searchInputArea").val();

  // });
  async function fetchAPI(selectedValue) {
    const baseURL = `https://api.edamam.com/search?q=${selectedValue}&app_id=${appId}&app_key=${apiKey}&from=0&to=6`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateCards(data.hits);
    console.log(data);
  }

  var searchResult = $(".searchResult");
  function generateCards(results) {
    searchResult.empty();

    let rowContainer;

    results.forEach((result, i) => {
      if (i % 3 === 0) {
        // Starts a new row after every 3 cards
        rowContainer = $("<div class='row'></div>");
        searchResult.append(rowContainer);
      }
      //cards structure
      const cardHTML = `
      <div class="col-md-4 my-2">
        <div class="card card-hover" style="width: 18rem; ">
        <div class="position-relative">
          <img src="${result.recipe.image}" class="card-img-top" alt="...">
        <a href="#">  <span class="save-icon">&#10084;</span></a>
          </div>
          <div class="card-body">
            <h5 class="card-title">${result.recipe.label}</h5>
            <p class="card-text"> Cuisine type: ${
              result.recipe.cuisineType
            } </p>
            <p class="card-text"> Meal type: ${result.recipe.mealType} </p>
            <p class="card-text"> Calories ${result.recipe.calories.toFixed(
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

      rowContainer.append(cardHTML);
      //if result.length is not equal devided by 3 still will make sure to display the cards
      // if (i === results.length - 1 && rowContainer) {
      //   searchResult.append(rowContainer);
      // }
    });
  }
});
