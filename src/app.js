import './app.scss';

//flickr api search
function flickr(searchTerm) {
  $('#results').empty();
  var flickrUrl = "http://api.flickr.com/services/feeds/photos_public.gne?&safe_search=3&safe_search=3&jsoncallback=?&tags='" + searchTerm + "'";
  $.getJSON( flickrUrl, { format: "json", async: true } ).then(function( data ) {
      $.each( data.items, function( i, image ) {
        $("#results").append(String("<a href='" + image.link + "'><img src='" + image.media.m + "'></a>"));
        return "done";
      });
    });
};

//bighugelabs words api search
function words(searchTerm) {
  $('#related').empty();
  var flickrUrl = "http://words.bighugelabs.com/api/2/1efdcf3985947128f17dd03002a9f10e/" + searchTerm + "/json";
  $.getJSON( flickrUrl, { format: "json", async: true } ).then(function( data ) {
      $.each( data, function( i, word ) {
        $.each(word, function( i, word ){
          $("#related").append(String("<button class='relatedWord' value=" + word[0] + ">" + word[0] + "</button>").replace(",", " "));
        }); 
      });
    });
};

//related words button
$("body").on("click", ".relatedWord", function() {
  let searchTerm = this.value;
  $("#searchBar").val(this.value);
  flickr(searchTerm);
  words(searchTerm);
});

//search bar button
$( "#searchButton" ).click(function() {
  let searchTerm = $("#searchBar").val();
  flickr(searchTerm);
  words(searchTerm);
});

//clear search button
$( "#clearSearch" ).click(function() {
  $("#related").empty();
  $("#results").empty();
  $("#searchBar").val(null);
});