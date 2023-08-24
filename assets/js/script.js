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

});