

require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var fs = require('fs');
var Spotify = require("node-spotify-api");
var Twitter = require('twitter')
var twitter = new Twitter({
  consumer_key: '4gdTAMMK5ILA8ndDM0n9KjY6E',
  consumer_secret: 'x00kvGhWHR7jeF84XTnY0kWrlTqOkNr1AA5KJNmoxbH8geGqM0',
  access_token_key: '1031503856390340608-TgkMr9uTxEBKFp3zbDEWdVqvJbGLd3',
  access_token_secret: 'LtfgF7sVYAhz37iP9wUMBmroV4IejvopESUF6y2TPxei7'

});
var spotify = new Spotify({id: 'a35780cbd84244e3a9062959d405d16a',secret: 'd0857ad1c53641b280bb566b073c1a29'});
// var spotify = new Spotify({id: keys.spotify.id, secret: keys.spotify.secret});


var divider ="\n------------------------------------------------------------\n";

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
  if(!inputString.length){

    spotifyRequest("The sign");
    }
    
    else {
    
      spotifyRequest(inputString);
    }

}else if (term === 'my-tweets'){

fetchTweets(inputString);
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
   saveLogs('OMDB',movie);
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

  var songObj = {
    "URL: " : response.tracks.items[0].external_urls.spotify,
    "Song name: " : response.tracks.items[0].name,
    "Artist name: " : response.tracks.items[0].artists[0].name,
    "Album name: " : response.tracks.items[0].album.name,

}
  saveLogs('Spotify',userString);
  console.log(songObj);
})
.catch(function(err) {
  console.log(err);
});

}
// Spotify request ^

//Twitter Request.


function fetchTweets(username){

  params= {screen_name: username};

  twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("___________________________________________")
        console.log("                                           ")
        for (var i = 0; i < tweets.length; i++) {
            console.log(i + 1 + ". " + tweets[i].text);
    }
  }
  });
}

// Twitter Request ^


//log function.

function saveLogs(apiname,search){

  function timestamp() {
    return 'API Called to ' + apiname + ' was made at ' + '[' + new Date().toLocaleString("en-US", {timeZone: "America/New_York"}) + ']' + ' searching for ' + search;
  }

  var time = timestamp();

  fs.appendFile("logs.txt", divider + time + divider, function(err) {
    if (err) throw err;

  });

}