import './app.scss';

/*
let searchTerm = $("#searchBar").val();
let flickrAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";
let flickrKey = "b9ffbd74f90f37df094b59bd2915ff37";
let flickrParams = "&tags='" + searchTerm + "'&format=json&nojsoncallback=1";
let wordKey = "1efdcf3985947128f17dd03002a9f10e";
*/

//flickr api search

/*
function flickr(searchTerm) {
    //var flickrUrl = "http://api.flickr.com/services/feeds/photos_public.gne?&safe_search=&jsoncallback=?&tags='" + searchTerm + "'";
    let flickrAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";
    let flickrKey = "b9ffbd74f90f37df094b59bd2915ff37";
    let flickrParams = "&tags='" + searchTerm + "'&format=json&nojsoncallback=1";
    let flickrUrl = flickrAPI + flickrKey + flickrParams;

    $.ajax({
      url: flickrUrl,
      type: 'GET',
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      async: false,
      success: function(data, status, jqXHR) {
        console.log(data);
      } 

    })
    .done(function( data ) {
      console.log("done");
      
    })
    .fail(function( data ) {
      console.log("fail");
    })
};*/




function flickr(searchTerm) {
  $('#results').empty();
  var flickrUrl = "http://api.flickr.com/services/feeds/photos_public.gne?&safe_search=&jsoncallback=?&tags='" + searchTerm + "'";
  $.getJSON( flickrUrl, { format: "json", async: true } ).done(function( data ) {
      $.each( data.items, function( i, image ) {
        $("#results").append(String("<a href='" + image.link + "'><img src='" + image.media.m + "'></a>"));
        //if ( i > 3 ) {
        //  return false;
        //}
      });
    });
};

//bighugelabs words api search

function words(searchTerm) {
  $('#related').empty();
  var flickrUrl = "http://words.bighugelabs.com/api/2/1efdcf3985947128f17dd03002a9f10e/" + searchTerm + "/json";
  $.getJSON( flickrUrl, { format: "json", async: true } ).done(function( data ) {
      $.each( data, function( i, word ) {
        $.each(word, function(i, word){
          $("#related").append(String("<button class='relatedWord' value=" + word[0] + ">" + word[0] + "</button>").replace(",", " "));
          console.log("data is loaded");
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

