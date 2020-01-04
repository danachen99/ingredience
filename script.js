
        var searchedItems = [];

        var inputItem;
        $("#inputBtn").on("click", function (event) {
            event.preventDefault();
            /*
            clearField();
            */
            console.log(event.target);
            var inputItem = $("#inputSearch").val().trim().toLowerCase();
            //console.log(inputItem);
            searchedItems.unshift(inputItem);
            console.log(searchedItems);
            Ajax();
            //AJAX2();
        });

        function Ajax() {
            var inputItem = $("#inputSearch").val().trim().toLowerCase();
            var ingredientDomainName = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
            var queryUrl = ingredientDomainName + searchedItems[0] + "instructionsRequired=true" + "&number=5";
            var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
            /*
             var queryUrl = ingredientDomainName + "chicken" + "instructionsRequired=true" + "&number=10";
             //"apples,+flour,+sugar" 
            */
        /*
            /*
            var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
            */
      
            $.ajax({
                url: queryUrl + "&apiKey=" + apiKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                for (var i = 0; ; i++) {
                    console.log(response[i].title);
                }
            });
        }

 /*
        function AJAX2() {
            var mealPlanDomainName = "https://api.spoonacular.com/recipes/mealplans/generate";
            var mealPlanUrl = "https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=day&diet=paleo";
            var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";

            $.ajax({
                url: mealPlanUrl + "&apiKey=" + apiKey,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            });
        }
*/
        function clearField() {
            $("#results").empty();
        }
        $("#clear").on("click", clearField);

// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer?q=How%20much%20vitamin%20c%20is%20in%202%20apples%253F",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "a24fa84bbda24ba5a81304ccf4121858"
// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

// $.ajax({
//   url: "https://api.spoonacular.com/food/products/search?query=yogurt&apiKey=a24fa84bbda24ba5a81304ccf4121858",
//   method: "GET"
// }).then(function(response){
//   console.log(response);
// })

// var queryUrl = "https://api.spoonacular.com/food/products/search?query=yogurt"
// var apiKey = "a24fa84bbda24ba5a81304ccf4121858";

// $.ajax({
//   url: queryUrl + "&apiKey=" + apiKey,
//   method: "GET"
// }).then(function(response){
//   console.log(response);
// })

$("document").ready(function() {            

  $( "#button" ).click(function() {
    // Scroll landing page out of the way
    $("#landing").animate({
      bottom: "+=900",
    }, 600 );
    // Reveal options page and scroll into view
    $("#options").show();
    $("#options").animate({
      bottom: "+=800",
    }, 600);
    })
  });

var intolerances = "";

function checkIntolerances() {
    event.preventDefault();
    $('input[type="checkbox"]').on('change', function() {
        var shellfish = $('#check0').prop('checked');
        var gluten = $('#check1').prop('checked');
        var dairy = $('#check2').prop('checked');
        var peanuts = $('#check3').prop('checked');
        //$("#inputSearch").val()
        //var checkMe = [shellfish, gluten, dairy, peanuts];
        // for (var i = 0; i < 5; i++) {
        // console.log(checkMe[i]);
        // }
        if (!shellfish && !gluten && !dairy && !peanuts) {
            intolerances = '';
        } else if (shellfish && gluten && dairy && peanuts) {
            intolerances = "shellfish,eggs,gluten,dairy,peanuts";
        } else if ((shellfish && gluten && dairy) && !peanuts) {
            intolerances = "shellfish,gluten,dairy";
        } else if ((shellfish && gluten) && !dairy && !peanuts) {
            intolerances = "shellfish,gluten";
        } else if (shellfish) {
            intolerances = "shellfish"
        } else if (gluten) {
            intolerances = "gluten";
        } else if (dairy) {
            intolerances = "dairy";
        } else if (peanuts) {
            intolerances = "peanuts";
        } else if (!shellfish && gluten && dairy && !peanuts) {
            intolerances = "gluten,dairy"
        } else if (!shellfish && gluten && dairy && peanuts) {
            intolerances = "gluten,dairy,peanuts"
        }
        console.log("..." + intolerances);
    });
}
$("#search").on("click", function() {
    checkIntolerances();
    var queryUrl = "https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert";
    var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
    //var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
    $.ajax({
        url: queryUrl + "&apiKey=" + apiKey,
        method: "GET"
    }).then(function(response) {
        //console.log(response.recipes[0]);
    });
});

