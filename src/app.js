import './app.scss';

/*
let searchTerm = $("#searchBar").val();
let flickrAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";
let flickrKey = "b9ffbd74f90f37df094b59bd2915ff37";
let flickrParams = "&tags='" + searchTerm + "'&format=json&nojsoncallback=1";
let wordKey = "1efdcf3985947128f17dd03002a9f10e";
*/

function flickr(searchTerm) { //add words funtion here?
  $('#results').empty();
  var flickrUrl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&tags='" + searchTerm + "'";
  $.getJSON( flickrUrl, { format: "json" } )
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        $("#results").append(String("<a href='" + item.link + "'><img src='" + item.media.m + "'></a>"));
        if ( i > 3 ) {
          return false;
        }
      });
    });
};

function words(searchTerm) {
  $('#related').empty();
  var flickrUrl = "http://words.bighugelabs.com/api/2/1efdcf3985947128f17dd03002a9f10e/" + searchTerm + "/json";
  $.getJSON( flickrUrl, { format: "json" } )
    .done(function( data ) {
      $.each( data, function( i, word ) {
        $.each(word, function(y, words){
          $("#related").append(String("<button class='singleWord' value=" + words[0] + ">" + words[0] + "</button>").replace(",", " "));
        });
      });
    });
};


$("body").on("click", ".singleWord", function() {
  let searchTerm = this.value;
  flickr(searchTerm);
  words(searchTerm);
});

$( "#searchButton" ).click(function() {
  let searchTerm = $("#searchBar").val();
  flickr(searchTerm);
  words(searchTerm);
});

$( "#clearSearch" ).click(function() {
  $("#related").empty();
  $("#results").empty();
  $("#searchBar").val(null);
});

