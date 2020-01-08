var searchedItems = [];

var inputItem;
$("#inputBtn").on("click", function(event) {
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
    }).then(function(response) {
        console.log(response);
        for (var i = 0;; i++) {
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



$("document").ready(function() {

    $("#button").click(function() {
        // Scroll landing page out of the way
        $("#landing").animate({
            bottom: "+=900",
        }, 600);
        // Reveal options page and scroll into view
        $("#options").show();
        $("#options").animate({
            bottom: "+=800",
        }, 600);
    })
});



var intolerances = "";
var updatedIntolerances = "";
checkIntolerances();

function checkIntolerances() {
    var inputs = $('input[type="checkbox"]');
    //var checkMe = $("#checkme");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'checkbox') {
            inputs[i].onclick = function() {
                // if (checkMe.checked === true) {
                //     console.log("ADD")
                // } else {
                //     console.log("REMOVE")
                // }
                intolerances = intolerances + this.value + ",";
                updatedIntolerances = intolerances.slice(0, -1);
                console.log(updatedIntolerances);
                //return intolerances;
                //getRecipeWithIntolerances();
            }
        }
    }
}

//get random recipe
/*
$("#button").on("click", function() {
    checkIntolerances();
    var queryUrl = "https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert";
    var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
    //var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
    $.ajax({
        url: queryUrl + "&apiKey=" + apiKey,
        method: "GET"
    }).then(function(response) {
        //console.log(response.recipes[0]);
        var total = response.recipes[0].analyzedInstructions[0].steps.length;
        for (var i = 0; i < total; i++) {
            //console.log(response.recipes[0].analyzedInstructions[0].steps[i].step);
        }
    });
});*/

$("#button1").on("click", getRecipeWithIntolerances);

function getRecipeWithIntolerances() {
    var queryUrl = "https://api.spoonacular.com/recipes/search?query=pepper&number=2&intolerances=" + updatedIntolerances;
    var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
    //var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
    $.ajax({
        url: queryUrl + "&apiKey=" + apiKey,
        method: "GET"
    }).then(function(response) {
        console.log(this.url);
        console.log(response);

    });
}