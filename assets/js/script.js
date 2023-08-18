
$(document).ready(function () {
    // Pagination Controls
    const paginationButtons = $("#pagination-buttons");

    // Define a function to display recipes based on the provided data, page, and limit
    function displayRecipes(data, page, limit) {
        const resultsDiv = $("#results");
        resultsDiv.empty();

        const start = (page - 1) * limit;
        const end = start + limit;

        for (let i = start; i < end && i < data.data.recipes.length; i++) {
            const recipe = data.data.recipes[i];
            const recipeDiv = $("<div>").addClass("col-md-4 mb-4");
            const card = $("<div>").addClass("card");
            const cardBody = $("<div>").addClass("card-body");
            const title = $("<h5>").addClass("card-title").text(recipe.title);
            const image = $("<img>").addClass("card-img-top").attr("src", recipe.image_url);

            cardBody.append(title);
            card.append(image);
            card.append(cardBody);
            recipeDiv.append(card);
            resultsDiv.append(recipeDiv);
        }
    }

    $("#searchButton").click(function () {
        const searchQuery = $("#searchInput").val();

        if ($.trim(searchQuery) !== "") {
            const limit = 6;
            const apiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(searchQuery)}&number=${limit}`;

            $.getJSON(apiUrl)
                .done(function (data) {
                    const totalPages = Math.ceil(data.data.recipes.length / limit);
                    paginationButtons.empty();

                    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                        const pageButton = $("<button>")
                            .addClass("page-button")
                            .text(pageNum)
                            .data("page", pageNum);
                        paginationButtons.append(pageButton);
                    }

                    // Handle Pagination Button Clicks
                    $(".page-button").click(function () {
                        const page = $(this).data("page");
                        displayRecipes(data, page, limit);
                    });

                    // Display initial results on page load
                    displayRecipes(data, 1, limit);
                });
        }
    });

    // Perform an initial search on page load
    const initialSearchQuery = "initial"; // Use a placeholder search query for initial display
    const initialLimit = 6;
    const initialApiUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${encodeURIComponent(initialSearchQuery)}&number=${initialLimit}`;

    $.getJSON(initialApiUrl)
        .done(function (data) {
            displayRecipes(data, 1, initialLimit);
        });
});
