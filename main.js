$(document).ready(function() {

  $("#rand-button").on("click",function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  // The next bit of code handles the behavior of the search button and text input bar. Using jQuery, we can define what to do on a press of the search-button- it takes the text inputted into the search bar and sends that as input for the Wikipedia API call. Action on the search-bar itself is similar, but uses regular Javascript to recognize a form submit action (click of enter) which will trigger the Wikipedia search. 13 is the keycode for "enter"
  var searchAPIURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=1&srsearch=";

  $("#search-button").on("click", function(){
    var searchTerm = $(".search-input").val();
    wikiSearch(searchTerm);
  });        //End of search button function

  $(".search-input").keydown(function (e){
    if (e.keyCode == 13) {
      var searchTerm = $(".search-input").val();
      wikiSearch(searchTerm);
    }
  });        //End of input bar function


  function wikiSearch(userInput) {
    $.ajax({
      url: searchAPIURL+userInput+"&format=json&callback=?",
      async: false,
      dataType: "json",
      success: function(res){
        var counter = 0;
        //To get rid of old search results before displaying any new ones
        $(".search-results").children().html("");

        if (res.query.search.length == 0) {
          $(".search-results").append("<p>No search results! Try again.</p>");
        } else {
          $(".search-results").children().each(function() {
            var pageName = res.query.search[counter].title;
            var blurb = res.query.search[counter].snippet;
            $(this).html("<a href = \"https://en.wikipedia.org/wiki/"+ pageName + "\" class=\"page-name\">" + pageName + "</a><p class=\"blurb\">" + blurb + "...</p>")
            counter ++;
          });
        };
      }
    });     // End of wikiSearch function
  }



/*
  function wikiSearch(userInput) {
    $.ajax({
      url: searchAPIURL+userInput+"&format=json&callback=?",
      async: false,
      dataType: "json",
      success: function(res){
        //To get rid of old search results before displaying any new ones
        $(".search-results").children().html("");

        // Handling cases for which the API returns no results
        if (res.query.search.length == 0) {
          $(".search-results").append("<p>No search results! Try again.<\p>");
        } else {
          for (var i = 0; i < res.query.search.length; i++) {
            // We create the list of search results by appending list elements to the "search-results" unordered list on the webpage
            var pageName = res.query.search[i].title;
            var blurb = res.query.search[i].snippet;
            $(".search-results").children().html("<a href = \"https://en.wikipedia.org/wiki/"+ pageName + "\" class=\"page-name\">" + pageName + "</a><p class=\"blurb\">" + blurb + "...</p>");
          };
        };
      }
    });     // End of wikiSearch function
  }
*/

});
