/* Code goes here */
//import './styles/app.scss';

//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b9ffbd74f90f37df094b59bd2915ff37&tags=car&format=json&nojsoncallback=1

let searchTerm = $("#searchBar").val();


let flickrAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=";
let flickrKey = "b9ffbd74f90f37df094b59bd2915ff37";
let flickrParams = "&tags='" + searchTerm + "'&format=json&nojsoncallback=1";


$("#searchButton").on("click", function() {
  $('#images').empty();
  let searchTerm = $("#searchBar").val();
  var flickrUrl = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&tags='" + searchTerm + "'";
  $.getJSON( flickrUrl, { format: "json" } )
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        //let searchTerm = null;
        $( "<img>" ).attr( "src", item.media.m).appendTo( "#results" );
        if ( i === 4 ) {
          return false;
        }
      });
    });
})();

$("#searchButton").on("click", function() {
  $('#images').empty();
  let searchTerm = $("#searchBar").val();
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&tags='" + searchTerm + "'";
  $.getJSON( flickerAPI, {
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        //let searchTerm = null;
        $( "<a href>" ).attr( "src", item.media.m).appendTo( "#images" );
        if ( i === 4 ) {
          return false;
        }
      });
    });
})();




/*
class Mashed {
  constructor(element) {
    this.root = element;

    this.fetchFlickrPhotos();
    this.fetchWordlabWords('detest');
  }

  $.("#searchButton")fetchFlickrPhotos() {
    let resourceUrl =

      'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
    let flickrAPIkey = '2bfdce80f8de8d01a3c0b1e43843e961'

    let flickrQueryParams =
      '&text=space' +
      '&extras=url_q&format=json&nojsoncallback=1'
    let flickrUrl = resourceUrl + flickrAPIkey + flickrQueryParams

    fetch(flickrUrl)
      .then(res => res.json())
      .then(res => {
        console.log('Got response from FlickR!')
        console.log(res)
      })
      .catch(err => console.error(err))
  }

  fetchWordlabWords(query) {
    let wordLabAPIkey = '9d30c37acd6d49022f294eeff979f914'
    let wordLabUrl = `http://words.bighugelabs.com/api/2/${wordLabAPIkey}/${query}/json`

    fetch(wordLabUrl)
      .then(res => res.json())
      .then(res => {
        console.log('Got response from BigHugeLabs!')
        console.log(res)
      })
      .catch(err => console.error(err))
  }
}

(function() {
  new Mashed(document.querySelector('#mashed'))
})();*/