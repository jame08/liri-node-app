
var inputString = process.argv;
var request = require("request");
var Keys = require ("./keys.js");
require("dotenv").config();



// var spotify = new Spotify(keys.spotify);
// var twitter = new Twitter(keys.twitter)

if (inputString[2] === "movie-this"){
    var movie = inputString[3].trim();

request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

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