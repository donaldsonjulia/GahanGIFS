// JULIA PROJECT

var query = encodeURI('dave gahan');

console.log(query);


$.ajax({
        url: 'http://api.giphy.com/v1/gifs/search?q=dave+gahan&api_key=dc6zaTOxFJmzC',
        method: 'GET'

    })
    .done(function(dataObj) {
        console.log(dataObj);
        var gifArray = dataObj.data;
        console.log(gifArray);
        // return gifArray;
        var img_url = gifArray[0].images.downsized.url;
        console.log(img_url);
        var $image = $('<img>');
        $($image).attr('src', img_url);
        $('.content').append($image);
    })
    .fail(function(err) {
        console.log(err);
    });
