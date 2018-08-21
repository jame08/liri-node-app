

var request = require("request");
var keys = require ("./keys.js");
require("dotenv").config();

//OMDB Request

var movie = inputString.slice(1); //variable that takes all the argv elements but positions 0 and 1.
var inputString = process.argv.slice(2); //variable that takes all the argv elements but positions 0, 1,2

if (inputString[0] === "movie-this"){

//if the the array movie has no element the if will excecute.
if(!movie.length){
movie= "Mr. Nobody";
omdbRequest(movie);
}
else {

    omdbRequest(movie);
}

}

// function for the OMDB request.
function omdbRequest(movie){

request("http://www.omdbapi.com/?t="+movie+"&plot=short&apikey=trilogy", function(error, response, body) {
   
  if (!error && response.statusCode === 200) {
    
    console.log("***************************************************");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Cast: " + JSON.parse(body).Actors);
    console.log("***************************************************");
  }

  
});
}

// OMDB Request end.