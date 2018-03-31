require("dotenv").config();

var fs = require('fs');
var request = require('request');
var keys = require("./keys.js");

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];

switch(userCommand) {
	case "my-tweets":
		twitterCommand();
		break;
	case "spotify-this-song":
        spotifyCommand();
		break;
	case "movie-this":
        movieCommand();
		break;
	case "do-what-it-says":
        log();
		break;
	default:
		console.log('Sorry, I cannot read that commnd. Please try a different one!');
};

// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function twitterCommand () {
    var params = {screen_name: 'projectproject4'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (i=0; i<20 && i<tweets.length; i++){
            console.log("-----------------------------------------------");
            console.log("Tweet #" + (i+1));
            console.log("Tweeted at: " + tweets[i].created_at);
            console.log(tweets[i].text);
        };
      }
    });

};

// This will show the following information about the song in your terminal/bash window
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.
function spotifyCommand () {
    var trackName;
    // If the user does not type a search value, default to ace of base - the sign.
    if(process.argv[3] === undefined){
        trackName = "the sign"
    } else {
        trackName = process.argv[3];
    };

    var params ={ type: 'track', query: trackName }
    spotify.search(params, function(err, data) {
        if (err) {
        return console.log("Error occurred: "+ err); 
        }
        
        console.log(data); 
        
    });
};

// This will output the following information to your terminal/bash window:
        //    * Title of the movie.
        //    * Year the movie came out.
        //    * IMDB Rating of the movie.
        //    * Rotten Tomatoes Rating of the movie.
        //    * Country where the movie was produced.
        //    * Language of the movie.
        //    * Plot of the movie.
        //    * Actors in the movie.

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function movieCommand () {

};

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
function log (){

}