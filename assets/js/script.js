$(document).ready(function () {

    const resultsDiv = $("#results");
    const cocktailsDiv = $("#cocktails"); 
    const recipeModal = $("#recipeModal");
    const cocktailModal = $("#cocktailModal")
    const modalTitle = $("#modalTitle");
    const cuisineT = $("#cuisineType");
    const totalT = $("#totalTime");
    const ingredientL = $("#ingredientLines");
    const totalNuts = $("#totalNutrients");
    const sourceid = $("#source");
    const imageid = $("#image");

    const comodalTitle = $("#comodalTitle");
    const cocktailid = $("#cocktailid");
    const instruct = $("#instructions");
    const ingr1 = $("#ingredient1") ;
    const ingr2 = $("#ingredient2");
    const ingr3 = $("#ingredient3");
    const ingr4 = $("#ingredient4");
    const alco = $("#alcoholic") 
    const gla = $("#glass");

    const modalBody = $("#modalBody");
    const modalBackdrop = $("#modalBackdrop"); 
    const nextButton = $("#nextButton");
    const prevButton = $("#prevButton");

    
    let currentPage = 1;
    const limit = 6;

    function displayRecipe(recipe) {
        const card = $("<div>").addClass("card");
        // if ($("#searchInput").val().trim() !== "") {
        //     const image = $("<img>").addClass("card-img-top").attr("src", recipe.image);
        //     card.append(image);
        // }
        // Create an <img> element and set its src attribute to the recipe image URL
        const image = $("<img>").addClass("card-img-top").attr("src", recipe.image);
        card.append(image);

         const recipeDiv = $("<div>").addClass("col-md-4 mb-4");
        
         const cardBody = $("<div>").addClass("card-body");
         
         const label = $("<h5>")
             .addClass("card-title")
             .text(recipe.label)
             .css("cursor", "pointer"); 
             label.click(function () {
             openModal(
                recipe.label,
                 recipe.image,
                  recipe.source,
                  recipe.cuisineType,
                  recipe.totalTime,
                  recipe.ingredientLines,
                  recipe.totalNutrients,
                  recipe.totalNutrients.fat);
         });

         cardBody.append(label);
         card.append(cardBody);
         recipeDiv.append(card);
         resultsDiv.append(recipeDiv);
     }



     function displayCocktail(cocktail) {
        const cocktailDiv = $("<div>").addClass("col-md-4 mb-4");
        const card = $("<div>").addClass("card");
        const cardBody = $("<div>").addClass("card-body");
        const title = $("<h5>")
            .addClass("card-title")
            .text(cocktail.strDrink)
            .css("cursor", "pointer"); 
        title.click(function () {
           openCocktailModal(
               cocktail.strDrink,
           cocktail.strInstructions,
           cocktail.strIngredient1,
           cocktail.strIngredient2,
           cocktail.strIngredient3,
           cocktail.strIngredient4,
           cocktail.strAlcoholic,
           cocktail.strGlass,
           cocktail.strDrinkThumb
           );
        });

        const image = $("<img>").addClass("card-img-top").attr("src", cocktail.strDrinkThumb);

        cardBody.append(title);
        card.append(image);
        card.append(cardBody);
        cocktailDiv.append(card);
        cocktailsDiv.append(cocktailDiv);
    }


    function fetchAndDisplayRecipes(searchQuery, page) {
        const appId = "cc6b699e";
         const appKey = "1eaf8f14d98462c07aa870b1e3e0ffa2";
         const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(searchQuery)}&app_id=${appId}&app_key=${appKey}&from=${(page - 1) * limit}&to=${page * limit}`;
         $.ajax({   
         url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);

            if (page === 1) {
                prevButton.prop("disabled", true);
            } else {
                prevButton.prop("disabled", false);
            }
        
            if (data.hits.length < limit) {
                nextButton.prop("disabled", true);
            } else {
                nextButton.prop("disabled", false);
            }
            if (data.hits.length === 0) {
                resultsDiv.empty();
                resultsDiv.text("Sorry, we didn't find any recipes!")
                .css({
                    "color": "#d98e43",       
                    "font-weight": "bold",
                    "font-size": "2em" 
                });
               
            } else {
                resultsDiv.empty();
                data.hits.forEach((hit) => {
                    const recipe = hit.recipe;
                    displayRecipe(recipe);
                });
               
            }

            nextButton.click(function () {
                const searchQuery = $("#searchInput").val();
                currentPage++;
                if ($.trim(searchQuery) !== "") {
                    fetchAndDisplayRecipes(searchQuery, currentPage);
                }
            });
            
            prevButton.click(function () {
                if (currentPage > 1) {
                    const searchQuery = $("#searchInput").val();
                    currentPage--;
                    if ($.trim(searchQuery) !== "") {
                        fetchAndDisplayRecipes(searchQuery, currentPage);
                    }
                }
            });
        },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.error(jqXHR.status, textStatus, errorThrown);
             },
         });
     }


     function fetchAndDisplayCocktails(searchQuery) {
        const apiKey = "6fc6862a34msh0a6b9d463a6e54ep1fcdb9jsn6c012689b6b1";
        const apiUrl = "https://the-cocktail-db.p.rapidapi.com/search.php";

        $.ajax({
            url: apiUrl,
            headers: {
                "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                "X-RapidAPI-Key": apiKey,
            },
            data: {
                s: searchQuery,
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);

              if (!data.drinks || data.drinks.length === 0) {
                cocktailsDiv.empty();
                cocktailsDiv.text("Sorry, we didn't find any cocktail!")
                .css({
                   "color": "#d98e43",       
                   "font-weight": "bold",
                   "font-size": "2em" 
               });
            } else {
                cocktailsDiv.empty();
                data.drinks.forEach((cocktail) => {
                    displayCocktail(cocktail);
                });
            }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR.status, textStatus, errorThrown);
            },
        });
    }

     $("#searchButton").click(function () {
        const searchQuery = $("#searchInput").val();

        if ($.trim(searchQuery) !== "") {
            resultsDiv.empty();
            currentPage = 1;
            fetchAndDisplayRecipes(searchQuery, currentPage);
            cocktailsDiv.empty();
            fetchAndDisplayCocktails(searchQuery);
            $("#nextButton").show();
            $("#prevButton").show();
        }
    });

});