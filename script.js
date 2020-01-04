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

  $( "#startbutton" ).click(function() {
    // Scroll landing page out of the way
    $("#landing").animate({
      opacity: 0,
      bottom: "+=900",
    }, 600 );
    // Reveal options page and scroll into view
    $("#options").show();
    $("#options").animate({
      bottom: "+=700",
    }, 600);
    })

    $( "#nextbutton" ).click(function() {
      // Scroll landing page out of the way
      // Reveal options page and scroll into view
      $("#options").animate({
        opacity: 0,
        bottom: "+=700",
      }, 600);
      })
  });

