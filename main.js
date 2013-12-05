$(document).ready(function() {

	//Add an event listener to the button
	$('#get_film_button').on('click', function(e) {
		e.preventDefault();
		getFilms();
	});

	//A function that calls an ajax request to get the film
	function getFilms() {
		//generate a random number
		var randomNum = Math.floor((Math.random() * 1000000));

		//Log the randomNum to the console
		console.log(randomNum);
		
		//Create the film id by creating a string using the letters tt and the randomNum.
		var filmId = "tt" + randomNum;

		//Create the API url that will be used for the ajax  request
		var requestUrl = "http://mymovieapi.com/?type=json&id="+ filmId +"&release=full&plot=full";

		//Perform an Ajax request to retrieve the data about the random film
		$.ajax({
			url: requestUrl,
			dataType: 'json',
			beforeSend: function() {
				$('#output').html("Loading");
			},
			success: function(data) {
				//Retrieve the required data from the request
				if(data.title === undefined || data.type !== "M") {
					getFilms();
				}
				else {
					var title = data.title;
					var year = data.year;
					var plot = data.plot;
					var genre = data.genres;
					var id = data.imdb_id;
					var rating = data.rating;

					var outputString = "";
					outputString += "<p>" + "Film Name: " + title + "</p>";
					outputString += "<p>" + "Release Year: " + year + "</p>";
					outputString += "<p>" + "Genre's: " + genre + "</p>";
					outputString += "<p>" + "Id: " + id + "</p>";
					outputString += "<p>" + "Rating: " + rating + "</p>";
					outputString += "<p>" + "Film Plot: " + plot + "</p>";
					//Change the inner html for the output div
					$('#output').html(outputString);
				}
			}
		});
	}
});