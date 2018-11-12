$(document).ready(function() {
  var arrayAnimals = [
    "Horses swimming",
    "Giraffes swimming",
    "Dogs swimming",
    "Pig swimming",
    "Cats swimming",
    "Raccoons swimming"
  ];

  function URLify(string) {
    return string.trim().replace(/\s/g, "%20");
  }

  $(document).on("click", ".distinguishButtons", function() {
    var type = $(this).attr("button-identifier");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=LxO9omCo4QKE54pT9mzT3DDCRp8VnCSi";

    queryURL = URLify(queryURL);

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
      crossOrigin: null
    }).then(function(response) {
      var resultGifs = response.data;

      var gifDiv = $("#gifsDiv");

      gifDiv.empty();

      for (var i = 0; i < resultGifs.length; i++) {
        var rating = resultGifs[i].rating;
        var newP = $("<p>").text("Rating: " + rating);
        var animated = resultGifs[i].images.fixed_height.url;
        var still = resultGifs[i].images.fixed_height_still.url;
        var newImage = $("<img>");
        newImage.attr("src", still);
        newImage.attr("data-still", still);
        newImage.attr("data-animate", animated);
        newImage.attr("data-state", "still");

        newImage.addClass("mygifs");

        gifDiv.append(newP);
        gifDiv.append(newImage);
      }
      console.log(resultGifs);
    });

    //console.log($(this).attr("button-identifier") + " Clicked!");
  });

  $(document).on("click", ".mygifs", function() {
    console.log("gifClicked!");
    let currentState = $(this).attr("data-state");
    if (currentState === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#animalButton").click(function() {
    event.preventDefault();
    var userInput = $("#animalInput")
      .val()
      .trim();

    /// grabs our userInput and pushes it onto the array
    arrayAnimals.push(userInput);
    // calling displaybuttons will remove all buttons from the screen and display all of them again
    // including the new button
    displayButtons();
  });
  // make new function to display buttons from array
  function displayButtons() {
    clearButtons();
    var grabButton = $("#buttons");
    for (var y = 0; y < arrayAnimals.length; y++) {
      var newButton = $("<button>");
      newButton.text(arrayAnimals[y]);
      newButton.attr("type", "button");
      newButton.addClass("btn btn-secondary mr-2 distinguishButtons");
      newButton.attr("button-identifier", arrayAnimals[y]);
      grabButton.append(newButton);
      console.log("newButton Added! " + arrayAnimals[y]);
    }
  }

  // function displayNewButton(buttonText) {
  //   var grabButton = $("#buttons");
  //   var newButton = $("<button>");
  //   grabButton.append(newButton);
  //   console.log("newButton Added! " + buttonText);
  // }

  function clearButtons() {
    console.log("All buttons removed!");
    var grabButton = $("#buttons");
    grabButton.empty();
  }

  // $("#clearButton").click(function() {
  //   clearButtons();
  // });

  displayButtons();
});
