

require("dotenv").config();
var keys = require ("./keys.js");
var request = require("request");
var fs = require('fs');
var logs = require('log-timestamp');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


var divider ="\n------------------------------------------------------------\n\n";

//User Input
var cliInput = process.argv.slice(2);
var inputString =cliInput.slice(1).join(" "); //variable that takes all the argv elements but positions 0, 1
var term = cliInput[0] //variable that takes all the argv elements but positions 0.
//User Input ^

//App Logic
if (term === "movie-this"){

//if the the array movie has no element the if will excecute.
if(!inputString.length){

omdbRequest("Mr. Nobody");
}
else {

omdbRequest(inputString);
}

} else if (term === "spotify-this-song"){

spotifyRequest(inputString);
}
//App Logic ^




// function for the OMDB request.
function omdbRequest(movie){

request("http://www.omdbapi.com/?t="+movie+"&plot=short&apikey=trilogy", function(error, response, body) {
   
  if (!error && response.statusCode === 200) {
    
    var showData = [
      "Title: " + JSON.parse(body).Title,
      "Year: " + JSON.parse(body).Year,
      "IMDB Ranting: " + JSON.parse(body).imdbRating,
      "Country: " + JSON.parse(body).Country,
      "Language: " + JSON.parse(body).Language,
      "Plot: " + JSON.parse(body).Plot,
      "Cast: " + JSON.parse(body).Actors
    ].join("\n\n");
   saveLogs(showData,'OMDB',movie);
    console.log(divider + showData + divider)
  }

  
});
}



// OMDB Request ^


//Spotify Request.

function spotifyRequest(userString) 
{
spotify.search({ type: 'track', query: userString })
.then(function(response) {
  console.log(response);
})
.catch(function(err) {
  console.log(err);
});

}


// Spotify request ^

function saveLogs(showData,apiname,search){

  function timestamp() {
    return 'API Called to ' + apiname + ' was made at ' + '[' + new Date().toISOString() + ']' + ' searching for ' + search;
  }

  var time = timestamp();

  fs.appendFile("logs.txt", divider + time + divider, function(err) {
    if (err) throw err;

    console.log(showData);
  });

}