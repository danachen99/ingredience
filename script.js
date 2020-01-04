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