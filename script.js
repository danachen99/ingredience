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
    });

    $(document).on("click", ".modal-trigger", function() {
        // $(this).empty();
        var recipeID = $(this).attr("id");
        $("#modalheader").text($(this)[0].text);
        getIngredients(recipeID);
        getInstructions(recipeID);
    })

    $("#startoverbtn").on("click", function(){
        window.location.reload();
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
            
        }
        for (var i = 0; i < recipes.results.length; i++) {
            $("#" + recipes.results[i].id).append("<p class='recipecardhead'>" + recipes.results[i].title + "</p><img src=" + recipeImgArray[i] + ">");
        }
        // Materialize.css initialize carousel
        $(".carousel.carousel-slider").carousel({
            fullWidth: true
        });
    }

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
                dietOptions = options[i].nextElementSibling.textContent;

            }
        }
        dietOptions = dietOptions.toLowerCase();
        getRecipes(ingredients, updatedIntolerances, dietOptions); 
    }


    //search input
    function getRecipes(ingredients, updatedIntolerances, dietOptions) {
        var queryUrl = "https://api.spoonacular.com/recipes/search?query=" + ingredients + "&number=20&intolerances=" + updatedIntolerances + "&diet=" + dietOptions + "&instructionsRequired=true";
        //var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        //var apiKey = "a24fa84bbda24ba5a81304ccf4121858";
        // var apiKey = "7884711d9e63490ba357787dbc3eb1fe";
        var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
        $.ajax({
            url: queryUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
            for (var i = 0; i < response.length; i++) {
                var recipeId = response[i].id;              ;
            }
            if (response.length == 0) {
                $("#carouseldiv").append('<h1>No results found, please try again.</h1>');
            } else {
                generateCarousel(response);
            }
        });
    }

    $(".modal-close").on('close', function(){
        (".modal-content").empty();
    })

    function getInstructions(recipeID) {
        var recipeUrl = "https://api.spoonacular.com/recipes/" + recipeID + "/analyzedInstructions?";
        var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
        // var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        $.ajax({
            url: recipeUrl + "&apiKey=" + apiKey,
            method: "GET"
        }).then(function(response) {
            $(".instructions-list").empty();
            console.log(response.length);
            if (response.length != 0) {
                for (var i = 0; i < response[0].steps.length; i++) {
                    var steps = response[0].steps[i]["step"];
                    $(".instructions-list").append(`<li> ${steps} </li>`);
                }
            } else {
                console.log("Recipe has no instructions");
            }
        });
    }

    function getIngredients(recipeID) {
        var ingredientsUrl = "https://api.spoonacular.com/recipes/" + recipeID + "/ingredientWidget.json?";
        // var apiKey = "256cd3ee2e0548e59e4990ad44a8ec31";
        var apiKey = "3ecef2433f5d402daccaccdf1550dabe";
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
        }
        var ingredients = inpt.value;
        checkIntolerances(ingredients);
    }
