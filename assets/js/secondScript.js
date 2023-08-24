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
});
