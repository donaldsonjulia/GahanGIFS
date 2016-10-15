// JULIA PROJECT






function searchGIF(queryString) {


    var query = encodeURI(queryString);

    var searchURL = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';

    var searchAjax = $.ajax({
        url: searchURL,
        method: 'GET'
    });

    // console.log(searchURL);

    searchAjax.then(function(dataObj) {
        // console.log(dataObj);

        var gifArray = dataObj.data;

        var imageSize = 'fixed_height_small';

        console.log(gifArray);

        for (var index in gifArray) {

            createTemplate(createGifContext(gifArray[index], imageSize));

        }
    }).fail(function(error) {
        console.log('MAJOR BUMMER: ' + error);
    });
}


/**
* Creates the context of each image to be passed to our html template
* @function createGifContext
* @param {object} gifData - the returned data for an individual gif from Giphy API
* @param {string} imageSize - select image size in order to specify  correct image URL. gifData image object includes the following options (to see more extensive options, inspect object):
* "downsized" (height and width depend on which image)
* "downsized-large" (height and width depend on which image)
* "downsized-medium" (height and width depend on which image)
* "fixed_height" (height: 200px)
* "fixed_height_downsampled" (height: 200px)
* "fixed_height_small" (height: 100px)
* "fixed_width" (width: 200px)
* "fixed_width_downsampled" (width: 200px)
* "fixed_width_small" (width: 100px)
* "original" (height and width depend on which image)
* @returns {object} gifContext
*/

function createGifContext(gifData, imageSize) {
    return {
        gif_url: gifData.images[imageSize].url
    };
}


/**
*Creates html elements for each image using Handlebars template
*@function createTemplate
*@param {object} gifContext - the context object for an individual gif that includes image URL
*/
function createTemplate(gifContext) {
    var source = $('#gif').html();
    var template = Handlebars.compile(source);
    var context = gifContext;
    var html = template(context);
    $(html).prependTo('.content').fadeIn();
}

/**
* Removes an individual image from content container when user clicks delete button
*/
$('.content').on('click', '.delete_button', function(event) {
  $(this).parents('.gif-container').fadeOut(function() {
    this.remove();
  });
});

/**
* Initiates @function searchGIF upon search form submit
*/
$('.search-form').on('click', '.search-button', function(event) {
  event.preventDefault();
  var searchString = this.value;
  console.log('in');
  });



searchGIF('dave gahan depeche mode');
