var searchedItems = [];

        var inputItem;
        $("#inputBtn").on("click", function (event) {
            event.preventDefault();
            /*
            clearField();
            */
            var inputItem = $("#inputSearch").val().trim().toLowerCase();
            searchedItems.unshift(inputItem);
            Ajax();
            //AJAX2();
        });

        function Ajax() {
            var inputItem = $("#inputSearch").val().trim().toLowerCase();
            var ingredientDomainName = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=";
            var queryUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchedItems[0] + "&number=2";
            //ingredientDomainName + searchedItems[0] + "instructionsRequired=true" + "&number=2";
            //var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
            //var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
            var apiKey = "7884711d9e63490ba357787dbc3eb1fe";
            //var apiKey = "3ecef2433f5d402daccaccdf1550dabe";

            var searchedId = [];
            $.ajax({
                url: queryUrl + "&apiKey=" + apiKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    var recipeId = response[i].id;
                    console.log(recipeId);
                    searchedId.unshift(recipeId);
                    console.log(searchedId);
                    var responseName = response[i].title;
                    var newDiv = $("<div class='foodItemDiv' data-id='" + recipeId + "'>" + "<span id='idDisp'>" + recipeId + "</span>" + "</div>");
                    console.log(newDiv);
                    var newP = $("<p>");
                    var hr = $("<hr>");
                    newP.text(responseName);
                    newDiv.append(newP);
                    newDiv.append(hr);
                    $(".resultsDisplayDiv").prepend(newDiv);
                }
            });
        }

        /* Putting Data Attributes into "newDiv" statement: 
        "var newDiv = $("<div class='foodItemDiv'>" + "<span>" + recipeId + "</span>" + "</div>");" 
        "var newDiv = $("<div class='foodItemDiv' data-id='" + recipeId + "'>" + "<span>" + recipeId + "</span>" + "</div>");"
    */
        var clickedId;
        function AJAX2() {
            var clickedId = $(this).attr("data-id");
            console.log(clickedId);  // Displays undefined
            var recipeUrl = "https://api.spoonacular.com/recipes/" + clickedId + "/analyzedInstructions?";
            var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
            $.ajax({
                url: recipeUrl + "&apiKey=" + apiKey,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; ; i++) {
                    console.log(response[0].steps[i]["step"]);
                }
            });
        }

        $(document).on("click", ".foodItemDiv", showSteps);

        function showSteps() {
            $(this).css("background", "blue");
            console.log($(this).text());
            console.log($(this).attr("data-id"));
            var clickedId = $(this).attr("data-id");
            console.log(clickedId);
            AJAX2();
        }


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