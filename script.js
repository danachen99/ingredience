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

