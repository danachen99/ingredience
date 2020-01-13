// ! CREATE STARTOVER AND GETMORERECIPES FUNCTIONS
var currentPage = 0;

$("document").ready(function() {
  
function moveForward() {
    currentPage++;
    if (currentPage == 1) {
      $("#landing").addClass("animated fadeOutUp faster");
      $("#landing").on("animationend", function() {
        $("#landing").hide();
        $("#landing").removeClass("animated fadeOutUp faster");
      });
      setTimeout(function() {
        $("#options")
          .show()
          .addClass("animated fadeInUp faster");
      }, 500);
      return
    } else if (currentPage == 2) {
      $("#options").addClass("animated fadeOutUp");
      $("#options").on("animationend", function() {
        $("#options").hide();
        $("#options").removeClass("animated fadeOutUp faster");
      });
      setTimeout(function() {
        $("#restrictionspage")
          .show()
          .addClass("animated fadeInUp faster");
      }, 500);
      return
    } else if (currentPage == 3) {
      $("#restrictionspage").addClass("animated fadeOutUp");
      $("#restrictionspage").on("animationend", function() {
        $("#restrictionspage").hide();
        $("#restrictionspage").removeClass("animated fadeOutUp faster");
      });
      setTimeout(function() {
        $("#ingredientspage")
          .show()
          .addClass("animated fadeInUp faster");
      }, 500);
      return
    }
  }

  //   Page movement event handlers
  $("#startbutton").on("click", function() {
    moveForward();
  });

  $(".nextbutton").click(function() {
    moveForward();
  });

  $("#submitingredients").click(function() {
    $("#ingredientspage")
      .show()
      .addClass("animated fadeOutUp faster");
    setTimeout(function() {
      $("#ingredientspage").hide();
    }, 300);
    setTimeout(function() {
      $("#carousel")
        .show()
        .addClass("animated fadeInUp faster");
      }, 500);
    checkIntolerances();
  });

  $(document).on("click", ".modal-trigger", function(){
    debugger;
    var recipeID = $(this).attr("id");
    $("#modalheader").text($(this)[0].text);
    ingredientsAJAX(recipeID);
    getInstructions(recipeID);
   
  })
  



$(".chips").chips();
$('.modal').modal();

// Takes response from getRecipeWithIntolerances() and creates a card for carousel for each item
function generateCarousel(recipes) {

  var recipeIdArray = [];
  var recipeImgArray = [];
  for (var i = 0; i < recipes.results.length; i++) {
    $(".carousel").append("<div class='caritemwrapper'><a href='#modal' class='carousel-item modal-trigger' id='" + recipes.results[i].id +"'></div>");  
    recipeImgArray.push("https://spoonacular.com/recipeImages/" + recipes.results[i].image);
    recipeIdArray.push(recipes.results[i].id);
    console.log(recipeIdArray);
  }

  for (var i = 0; i< recipes.results.length; i++){
    $("#" + recipes.results[i].id).append("<p class='recipecardhead'>" + recipes.results[i].title + "</p><img src=" + recipeImgArray[i] + ">");
  }

  // Materialize.css initialize carousel
  $(".carousel.carousel-slider").carousel({
    fullWidth: true
  });
}


    var intolerances = "";
    var updatedIntolerances = "";

    /* ======should we use this one or the one below? ======
    function checkIntolerances() {
        $('input[type="checkbox"]').on('change', function() {
            if (this.checked) {
                intolerances = intolerances + this.value + ",";
            }
            updatedIntolerances = intolerances.slice(0, -1);
            console.log(updatedIntolerances);
        });
    }
    */
    function checkIntolerances() {
        var inputs = $('input[type="checkbox"]');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "checkbox" && inputs[i].checked === true) {
                intolerances =
                    intolerances + inputs[i].nextElementSibling.textContent + ",";
                updatedIntolerances = intolerances.slice(0, -1);
            }
        }
        getRecipeWithIntolerances(); // This will probably move somewhere later, when all pieces are coded properly we'll have to figure out best way to chain these
    }

    function getRecipeWithIntolerances() {
        var queryUrl =
            "https://api.spoonacular.com/recipes/search?query=pepper&number=5&intolerances=" +
            updatedIntolerances;
        var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
        // var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        // var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
        $.ajax({
            url: queryUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
            console.log(this.url);
            console.log(response);
            console.log(response.results[0].id)
            if (response.length == 0) {
                alert('nada');
            } else {
                generateCarousel(response);
            }
        });

    }

    var searchedItems = [];

    var inputItem;
    $("#inputBtn").on("click", function(event) {
        event.preventDefault();
        var inputItem = $("#inputSearch").val().trim().toLowerCase();
        searchedItems.unshift(inputItem);
        getRecipes();
    });

    //search input
    function getRecipes() {
        var inputItem = $("#submitingingredients").val().trim().toLowerCase();
        var queryUrl = "https://api.spoonacular.com/recipes/search?query=" + searchedItems[0] + "&number=50&intolerances=" + updatedIntolerances;
        // var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
        // var apiKey = "7884711d9e63490ba357787dbc3eb1fe";
        // var apiKey = "3ecef2433f5d402daccaccdf1550dabe";

        //var searchedId = [];
        $.ajax({
            url: queryUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var recipeId = response[i].id;
                //searchedId.unshift(recipeId);
                //console.log(searchedId);
                var responseName = response[i].title;
                var newDiv = $("<div class='foodItemDiv' data-id='" + recipeId + "'>" + "<span id='idDisp'>" + recipeId + "</span>" + "</div>");
                var newP = $("<p>");
                var hr = $("<hr>");
                newP.text(responseName);
                newDiv.append(newP);
                newDiv.append(hr);
                //James pls create a div or area to output recipes
                $(".resultsDisplayDiv").prepend(newDiv);
            }
        });
    }

  //   $(document).on("click", ".foodItemDiv", showSteps);
  //   function showSteps() {
  //     console.log($(this).text());
  //     //console.log($(this).attr("data-id"));
  //     var clickedId = $(this).attr("data-id");
  //     console.log(clickedId);
  //     getInstructions(clickedId);
  //     ingredientsAJAX(clickedId);
  // }

    function getInstructions(clickedId) {
        // $("#steps").empty(); -- doesn't exist, can probably be deleted
        var recipeUrl = "https://api.spoonacular.com/recipes/" + clickedId + "/analyzedInstructions?";
        // var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
        // var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
        $.ajax({
            url: recipeUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
          $(".instructions-list").empty();
            for (var i = 0; response[0].steps.length; i++) {
                var steps = response[0].steps[i]["step"];
                // ("#instructions").append(`<div>`, `${step}`);
                $(".instructions-list").append(`<li> ${steps} </li>`); 
            }
        });
    }

function ingredientsAJAX(clickedId) {
  var ingredientsUrl = "https://api.spoonacular.com/recipes/" + clickedId + "/ingredientWidget.json?";
  // var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
  // var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
  var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
  $.ajax({
      url: ingredientsUrl + "&apiKey=" + apiKey,
      method: "GET"
  }).then(function (response) {
    $(".ingredients-list").empty();
      for (var i = 0; i < response.ingredients.length; i++) {
          var results = response.ingredients[i];
          var ingredientValue = results.amount.us.value;
          var ingredientUnit = results.amount.us.unit;
          var ingredientName = results.name; 
          // $("#ingredients").prepend(`<div>`,`${ingredientValue} `, `${ingredientUnit} `, `${ingredientName} &nbsp;`);
          $(".ingredients-list").append("<div>" + ingredientValue + ' ' + ingredientUnit + ' ' + ingredientName + "</div>"); 
      }
  });
}});