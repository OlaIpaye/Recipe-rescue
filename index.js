$(document).ready(function () {
    const loadMoreButton = $("#loadMoreButton");
     const resultsDiv = $("#results");
     const cocktailsDiv = $("#cocktails"); // New div for cocktails
     const recipeModal = $("#recipeModal");
     const modalTitle = $("#modalTitle");
     const modalBody = $("#modalBody");
     const modalBackdrop = $("#modalBackdrop"); 
 
     let currentPage = 1;
     const limit = 6;
 
     function displayRecipe(recipe) {
        const card = $("<div>").addClass("card");
​
        if ($("#searchInput").val().trim() !== "") {
            const image = $("<img>").addClass("card-img-top").attr("src", recipe.image);
            card.append(image);
        }
         const recipeDiv = $("<div>").addClass("col-md-4 mb-4");
        
         const cardBody = $("<div>").addClass("card-body");
         const label = $("<h5>")
             .addClass("card-title")
             .text(recipe.label)
             .css("cursor", "pointer"); 
             label.click(function () {
             openModal(recipe.label, recipe.instructions);
         });
 
         
        
         cardBody.append(label);
       
         card.append(cardBody);
         recipeDiv.append(card);
         resultsDiv.append(recipeDiv);
     }
 
    //  function displayCocktail(cocktail) {
    //      const cocktailDiv = $("<div>").addClass("col-md-4 mb-4");
    //      const card = $("<div>").addClass("card");
    //      const cardBody = $("<div>").addClass("card-body");
    //      const title = $("<h5>")
    //          .addClass("card-title")
    //          .text(cocktail.strDrink)
    //          .css("cursor", "pointer"); 
    //      title.click(function () {
    //          openModal(cocktail.strDrink, cocktail.strInstructions);
    //      });
 
    //      const image = $("<img>").addClass("card-img-top").attr("src", cocktail.strDrinkThumb);
 
    //      cardBody.append(title);
    //      card.append(image);
    //      card.append(cardBody);
    //      cocktailDiv.append(card);
    //      cocktailsDiv.append(cocktailDiv);
    //  }
 
     function openModal(title, body) {
         modalTitle.text(title);
         modalBody.html(body);
         recipeModal.css("display", "block");
         modalBackdrop.css("display", "block");
     }
 
     $(".close").click(function () {
         recipeModal.css("display", "none");
         modalBackdrop.css("display", "none"); 
     });
 
     function fetchAndDisplayRecipes(searchQuery, page) {
        const appId = "";
         const appKey = "";
        //  const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(searchQuery)}&number=${limit}&offset=${(page - 1) * limit}`;
        const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(searchQuery)}&app_id=${appId}&app_key=${appKey}&from=${(page - 1) * limit}&to=${page * limit}`;
         $.ajax({
            //  url: apiUrl,
            // //  params: {ids: '456,987,321'},
            //  headers: {
            //      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            //      "X-RapidAPI-Key": apiKey,
            //  },
            //  method: "GET",
            //  dataType: "json",
            //  success: function (data) {
            //      console.log(data);
                 
            //      if (data.results.length === 0) {
            //          resultsDiv.empty();
            //          resultsDiv.text("Sorry, we didn't find any meal!");
            //          loadMoreButton.hide();
            //      } else {
            //          resultsDiv.empty();
            //          data.results.forEach((recipe) => {
            //              displayRecipe(recipe);
            //          });
            //          loadMoreButton.show();
            //      }
            //  },
​
            url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
​
            if (data.hits.length === 0) {
                resultsDiv.empty();
                resultsDiv.text("Sorry, we didn't find any recipes!");
                loadMoreButton.hide();
            } else {
                resultsDiv.empty();
                data.hits.forEach((hit) => {
                    const recipe = hit.recipe;
                    displayRecipe(recipe);
                });
                loadMoreButton.show();
            }
        },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.error(jqXHR.status, textStatus, errorThrown);
             },
         });
     }
 
    //  function fetchAndDisplayCocktails(searchQuery) {
    //      const apiKey = "6fc6862a34msh0a6b9d463a6e54ep1fcdb9jsn6c012689b6b1";
    //      const apiUrl = "https://the-cocktail-db.p.rapidapi.com/search.php";
 
    //      $.ajax({
    //          url: apiUrl,
    //          headers: {
    //              "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    //              "X-RapidAPI-Key": apiKey,
    //          },
    //          data: {
    //              s: searchQuery,
    //          },
    //          method: "GET",
    //          dataType: "json",
    //          success: function (data) {
    //              console.log(data);
 
    //            if (!data.drinks || data.drinks.length === 0) {
    //              cocktailsDiv.empty();
    //              cocktailsDiv.text("Sorry, we didn't find any cocktail!");
    //          } else {
    //              cocktailsDiv.empty();
    //              data.drinks.forEach((cocktail) => {
    //                  displayCocktail(cocktail);
    //              });
    //          }
    //          },
    //          error: function (jqXHR, textStatus, errorThrown) {
    //              console.error(jqXHR.status, textStatus, errorThrown);
    //          },
    //      });
    //  }
 
     $("#searchButton").click(function () {
         const searchQuery = $("#searchInput").val();
 
         if ($.trim(searchQuery) !== "") {
             resultsDiv.empty();
             currentPage = 1;
             fetchAndDisplayRecipes(searchQuery, currentPage);
             cocktailsDiv.empty();
            //  fetchAndDisplayCocktails(searchQuery);
         }
     });
 
     loadMoreButton.click(function () {
         const searchQuery = $("#searchInput").val();
         currentPage++;
 
         if ($.trim(searchQuery) !== "") {
             fetchAndDisplayRecipes(searchQuery, currentPage);
         }
     });
 
    //  // Initial search
    //  const initialSearchQuery = "initial";
    //  fetchAndDisplayRecipes(initialSearchQuery, currentPage);
 });
 function displayRecipe(recipe) {
        const card = $("<div>").addClass("card");
        if ($("#searchInput").val().trim() !== "") {
            const image = $("<img>").addClass("card-img-top").attr("src", recipe.image);
            card.append(image);
        }
         const recipeDiv = $("<div>").addClass("col-md-4 mb-4");
         const cardBody = $("<div>").addClass("card-body");
         const label = $("<h5>")
             .addClass("card-title")
             .text(recipe.label)
             .css("cursor", "pointer");
             label.click(function () {
             openModal(
                recipe.label, recipe.source);
         });
         cardBody.append(label);
         card.append(cardBody);
         recipeDiv.append(card);
         resultsDiv.append(recipeDiv);
     }
     function openModal(title, source, body) {
        modalTitle.text(title);
        modalBody.html(`<p><strong>Source:</strong> ${source}</p>${body}`);
        modalBody.html(body);
        recipeModal.css("display", "block");
        modalBackdrop.css("display", "block");
    }