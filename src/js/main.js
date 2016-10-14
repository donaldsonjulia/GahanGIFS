// JULIA PROJECT




function searchGIF(queryString) {

var query = encodeURI(queryString);

var searchURL = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';

var searchAjax = $.ajax({
    url: searchURL,
    method: 'GET'
});

console.log(searchURL);

searchAjax.then(function(dataObj) {
    console.log(dataObj);
    var gifArray = dataObj.data;
    console.log(gifArray);

    for (var index in gifArray) {
        var img_url = gifArray[index].images.fixed_height_small.url;

        var $image = $('<img>');
        $($image).attr('src', img_url);
        $('.content').append($image);
    }
}).fail(function(error) {
    console.log('OH NO: ' + error);
});
}

searchGIF('dave gahan depeche mode');
