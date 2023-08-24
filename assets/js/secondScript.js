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
  //   -----------------Fetch data from API ------------
  async function fetchAPI(selectedValue) {
    const baseURL = `https://api.edamam.com/search?q=${selectedValue}&app_id=${appId}&app_key=${apiKey}&from=0&to=6`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateCards(data.hits);
    console.log(data);
  }

  //   --------------Function for generating cards --------
  var searchResult = $(".searchResult"); // targets HTML area were cards will be displayed
  function generateCards(results) {
    searchResult.empty();

    let rowContainer;
  }
});
