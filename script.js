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
        getUserChips();
        //checkIntolerances(); moved down 
    });

    $(document).on("click", ".modal-trigger", function() {
        debugger;
        var recipeID = $(this).attr("id");
        // alert($(this).text);
        // alert(event.target.textContent);
        $("#modalheader").text($(this)[0].text);
        getIngredients(recipeID);
        getInstructions(recipeID);
    })

    $(".chips").chips();
    $('.modal').modal();

    // Takes response from getRecipe() and creates a card for carousel for each item
    function generateCarousel(recipes) {
        var recipeIdArray = [];
        var recipeImgArray = [];
        for (var i = 0; i < recipes.results.length; i++) {
            $(".carousel").append("<div class='caritemwrapper'><a href='#modal' class='carousel-item modal-trigger' id='" + recipes.results[i].id + "'></div>");
            recipeImgArray.push("https://spoonacular.com/recipeImages/" + recipes.results[i].image);
            recipeIdArray.push(recipes.results[i].id);
            console.log(recipeIdArray);
        }
        for (var i = 0; i < recipes.results.length; i++) {
            $("#" + recipes.results[i].id).append("<p class='recipecardhead'>" + recipes.results[i].title + "</p><img src=" + recipeImgArray[i] + ">");
        }
        // Materialize.css initialize carousel
        $(".carousel.carousel-slider").carousel({
            fullWidth: true
        });
    }

    /*
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
    function checkIntolerances(ingredients) {
        var inputs = $('input[type="checkbox"]');
        var intolerances = "";
        var updatedIntolerances = "";
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === "checkbox" && inputs[i].checked === true) {
                intolerances =
                    intolerances + inputs[i].nextElementSibling.textContent + ",";
                updatedIntolerances = intolerances.slice(0, -1);
            }
        }
        updatedIntolerances = updatedIntolerances.toLowerCase();
        checkDietOptions(ingredients, updatedIntolerances);
    }


    function checkDietOptions(ingredients, updatedIntolerances) {
        var options = $('input[type="radio"]');
        var dietOptions = "";
        for (var i = 0; i < options.length; i++) {
            if (options[i].checked) {
                dietOptions = options[i].nextElementSibling.textContent
                console.log(dietOptions);
            }
        }
        getRecipes(ingredients, updatedIntolerances, dietOptions); // This will probably move somewhere later, when all pieces are coded properly we'll have to figure out best way to chain these
    }


    //search input
    function getRecipes(ingredients, updatedIntolerances, dietOptions) {
        var queryUrl = "https://api.spoonacular.com/recipes/search?query=" + ingredients + "&number=2&intolerances=" + updatedIntolerances + "&diet=" + dietOptions;
        //var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        //var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
        var apiKey = "7884711d9e63490ba357787dbc3eb1fe";
        //var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
        //var searchedId = [];
        $.ajax({
            url: queryUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
            console.log(this.url);
            //console.log(response.results[0].id)
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var recipeId = response[i].id;
                console.log(recipeId);
                //searchedId.unshift(recipeId);
                //console.log(searchedId);
            }
            if (response.length == 0) {
                alert('nada');
            } else {
                generateCarousel(response);
            }
        });
    }

    function getInstructions(clickedId) {
        var recipeUrl = "https://api.spoonacular.com/recipes/" + clickedId + "/analyzedInstructions?";
        // var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
        var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        $.ajax({
            url: recipeUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
            $(".instructions-list").empty();
            for (var i = 0; response[0].steps.length; i++) {
                var steps = response[0].steps[i]["step"];
                $(".instructions-list").append(`<li> ${steps} </li>`);
            }
        });
    }

    function getIngredients(clickedId) {
        var ingredientsUrl = "https://api.spoonacular.com/recipes/" + clickedId + "/ingredientWidget.json?";
        var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        // var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
        $.ajax({
            url: ingredientsUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
            $(".ingredients-list").empty();
            for (var i = 0; i < response.ingredients.length; i++) {
                var results = response.ingredients[i];
                var ingredientValue = results.amount.us.value;
                var ingredientUnit = results.amount.us.unit;
                var ingredientName = results.name;
                $(".ingredients-list").append("<div>" + ingredientValue + ' ' + ingredientUnit + ' ' + ingredientName + "</div>");
            }
        });
    }

    function getUserChips() {
        var instance = M.Chips.getInstance($(".chips"));
        var inpt = $(".chips");
        inpt.value = null;
        for (var i = 0; i < instance.chipsData.length; i++) {
            if (inpt.value == null)
                inpt.value = instance.chipsData[i].tag;
            else {
                inpt.value += ',' + instance.chipsData[i].tag;
            }
            //console.log(instance.chipsData[i].tag);
        }
        var ingredients = inpt.value;
        checkIntolerances(ingredients);
    }
});