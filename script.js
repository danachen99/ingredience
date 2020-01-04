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
    $("#landing").animate({
      // opacity: 0,
      bottom: "+=900",
    }, 600 );
    // $("#landing").hide();
    // $("#options").show();
  });
  

   });     
// var queryUrl2 = "https://api.spoonacular.com/food/jokes/random"

// $.ajax({
//   url: queryUrl2 + "&apiKey=" + apiKey,
//   method: "GET"
// }).then(function(response){
//   console.log(response);
// })


  