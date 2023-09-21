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

     
     function openModal(
        title,image, source,cuisineType,totalTime,ingredientLines,totalNutrients, body) {
        // Create an <img> element and set its src attribute to the image URL
        const imageElement = $("<img>").addClass("modal-image").attr("src", image);
        imageid.empty(); // Clear any existing content
        imageid.append(imageElement);

      
        modalTitle.text(title);
        sourceid.text(source);
        cuisineT.text(cuisineType);
        totalT.text(totalTime + " mins")

        // Clear any existing content in ingredientL and totalNuts
    ingredientL.empty();
    totalNuts.empty();

    // Create an unordered list for ingredients
    const ingredientList = $("<ul>");

    // Loop through ingredientLines and create list items
    ingredientLines.forEach((ingredient) => {
        const listItem = $("<li>").text(ingredient);
        ingredientList.append(listItem);
    });

     // Append the ingredientList to the ingredientLines div
     $("#ingredientLines").empty().append(ingredientList);



    const caNutrient = totalNutrients.CA; // Access the "CA" nutrient object
    const carbNutrient = totalNutrients.CHOCDF;
    const fatNutrient = totalNutrients.FAT;
    const sugarNutrient = totalNutrients.SUGAR;
    const proteinNutrient = totalNutrients.PROCNT;
    const ironNutrient = totalNutrients.FE;

    // Define an array of nutrient objects
    const nutrients = [
        caNutrient,
        carbNutrient,
        fatNutrient,
        sugarNutrient,
        proteinNutrient,
        ironNutrient
    ];

        nutrients.forEach(nutrient => {
        const nutrientLabelText = nutrient.label;
        const nutrientQuantity = parseFloat(nutrient.quantity);
        const nutrientQuantityText = nutrientQuantity.toFixed(2) + " " + nutrient.unit;

        const nutrientName = $("<div>").addClass("nutrition-name").text(nutrientLabelText);
        const nutrientValue = $("<div>").addClass("nutrition-value").text(nutrientQuantityText);

        const listItem = $("<li>");
        listItem.append(nutrientName, nutrientValue);

        // Append the list item to the existing ul element with the ID "totalNutrients"
        $("#totalNutrients").append(listItem);
    });
 
        modalBody.html(body);
        recipeModal.css("display", "block");
        modalBackdrop.css("display", "block");
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

    function openCocktailModal(title, instructions, ingredient1, ingredient2, ingredient3, ingredient4, alcoholic, glass, image) {
       
    
        comodalTitle.text(title);
        instruct.text(instructions);
        ingr1.text(ingredient1);
        ingr2.text(ingredient2);
        ingr3.text(ingredient3);
        ingr4.text(ingredient4);
        alco.text(alcoholic);
        gla.text(glass);
        
    
        // Clear any existing content in modalBody
        modalBody.empty();
    
        // Create an <img> element and set its src attribute to the image URL
        const imageElement = $("<img>").addClass("modal-image").attr("src", image);
        //modalBody.append(imageElement);
   
        cocktailid.empty(); // Clear any existing content
        cocktailid.append(imageElement);
        
    
  
    
        // Display the modal
        cocktailModal.css("display", "block");
        modalBackdrop.css("display", "block");
    }

    $(".close").click(function () {
        cocktailModal.css("display", "none");
         recipeModal.css("display", "none");
         modalBackdrop.css("display", "none"); 
     });

    function fetchAndDisplayRecipes(searchQuery, page) {
        const appId = "";
         const appKey = "";
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
        const apiKey = "";
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

    
     // Random search queries for initial random recipes
     const initialSearchQueries = [
        "chicken",
        "pasta",
        "vegetarian",
        "dessert",
        "soup",
        "breakfast"
    ];

    // Pick a random query from the list
    const randomIndex = Math.floor(Math.random() * initialSearchQueries.length);
    const initialSearchQuery = initialSearchQueries[randomIndex];
    

    fetchAndDisplayRecipes(initialSearchQuery, currentPage);

// Fetch a random recipe image and display it
function displayRandomRecipeImage() {
    const appId = "";
    const appKey = "";
    const randomRecipeApiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(
        initialSearchQuery
    )}&app_id=${appId}&app_key=${appKey}&to=6`;

    $.ajax({
        url: randomRecipeApiUrl,
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.hits.length > 0) {
                const randomRecipe = data.hits[0].recipe;
                // Update the entire recipe card with the new random recipe
                displayRecipe(randomRecipe);
            }
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.status, textStatus, errorThrown);
        },
    });
}

    // Call the function to display a random recipe image
    displayRandomRecipeImage();
     // Initial search
    //  const initialSearchQuery = "initial";
    //  fetchAndDisplayRecipes(initialSearchQuery, currentPage);
      

});