$(document).ready(function() {

	//Initial array of gif 'emotion' buttons
	var emotions = ["Happy", "Angry", "Sad", "Indifferent", "Melancholy", "Tired", "Exhausted", "Over It", "Fake Laughing", "Could Care Less"];

	function displayEmotionGifs() {
        var emotion = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific 'emotion' button being selected
        $.ajax({
          url: queryURL,
          method: "GET"

        }).done(function(response) {
        	var results = response.data;

        	//clears div that holds gifs so gifs aren't stacked on top of each other
        	$("#emotionsDisplayed").empty();

          for (var i = 0; i < results.length; i++) {

            var rating = "<div class='ratings'> Rating:  " + (results[i].rating) + " </div>";
            var image = rating + '<img src= " ' + results[i].images.fixed_height_still.url +
              '" data-still=" ' + results[i].images.fixed_height_still.url +
              ' " data-animate=" ' + results[i].images.fixed_height.url + '" data-state="still" class="gifImage" style= "height: 200px;">';

          image = '<div class="col-xs-12 col-sm-6 col-md-4">' + image + "</div>";
          $('#emotionsDisplayed').append(image);

            //test for bugs.
            console.log(response);
        	}

        //makes gif animated or still upon click
        $('.gifImage').on('click', function() {
        var state = $(this).attr('data-state');

        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

          //test for bugs on gif-click.
          console.log("on-click is working");
        });//on-click end.

        });//response function end.

  }//displayEmotionGifs function end.



	//Function for displaying buttons
	function renderButtons() {
        // Deleting the 'emotions' prior to adding new ones
        $("#emotionButtons").empty();
        // Looping through the array of emotions
        for (var i = 0; i < emotions.length; i++) {

          var a = $("<button>");

          a.addClass("emotionButton");

          a.attr("data-name", emotions[i]);

          a.text(emotions[i]);

          $("#emotionButtons").append(a);
        }
      }

      // This function handles events where an emotion button is clicked
      $("#addEmotion").on("click", function(event) {
        event.preventDefault();

        //grabs the input from the textbox
        var emotion = $("#emotion-input").val().trim();

        emotions.push(emotion);

        renderButtons();
      });

   // Adding a click event listener to all elements with a class of "emotion"
      $(document).on("click", ".emotionButton", displayEmotionGifs);

	renderButtons();

}); 