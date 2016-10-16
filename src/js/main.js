// JULIA PROJECT

var lastQuery = null;
var alreadySeen = 0;
var resultsLimit = null;
var gifContentPageCreated = false;
var moreButtonExists = false;

/**
 *
 * Searches and connects to Giphy API for related gif images based on search terms
 * Initiates createGifContext and createTemplate functions
 * @function searchGIF
 * @param {string} queryString - search terms provided by user input
 * @param {number} alreadySeen - current count of search results that have already been displayed
 *
 */
function searchGIF(queryString, alreadySeen) {

    lastQuery = queryString;
    var query = encodeURI(queryString);


    var searchURL = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&limit=' + resultsLimit + '&offset=' + alreadySeen + '&api_key=dc6zaTOxFJmzC';

    var searchAjax = $.ajax({
        url: searchURL,
        method: 'GET'
    });

    searchAjax.then(function(dataObj) {
        console.log(dataObj);

      if (moreButtonExists === false) {
        createMoreButtonTemplate();
        moreButtonExists = true;
      }

      if (moreButtonExists === true) {
        $(".more-button").html("MORE " + lastQuery.toUpperCase());
      }

        var gifArray = dataObj.data;
        console.log(gifArray);

        var imageSize = 'fixed_height_small';

        for (var index in gifArray) {
            createGifTemplate(createGifContext(gifArray[index], imageSize));
        }
    }).fail(function(error) {
        console.log('MAJOR BUMMER: ' + error);
    });
}

/**
 *
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
 *
 */
function createGifContext(gifData, imageSize) {
    return {
        gif_url: gifData.images[imageSize].url
    };
}


/**
 *
 *Creates html elements for each image using Handlebars template
 *@function createTemplate
 *@param {object} gifContext - the context object for an individual gif that includes image URL
 *
 */
function createGifTemplate(gifContext) {
    var source = $('#gif').html();
    var template = Handlebars.compile(source);
    var context = gifContext;
    var html = template(context);
    $(html).fadeIn('slow').prependTo('.content');
}


/**
 *
 *Creates button that allows user to load more results of previous query
 *@function createMoreButtonTemplate
 *@param {object} buttonContext - the context object for the button's text
 *
 */
function createMoreButtonTemplate() {
  var buttonContext = {
    button_text: 'GET MORE ' + lastQuery.toUpperCase()
  };
  var source = $('#more-gifs').html();
  var template = Handlebars.compile(source);
  var context  = buttonContext;
  var html = template(context);
  $(html).fadeIn('slow').prependTo('main')
;}


/**
 *
 *Creates html elements for each page using Handlebars template
 * @function createTemplate
 * @param {string} pageSource - the script id for desired page template
 * @param {object} pageContext - the context object for page template, created separately depending on page script id
 *
 */
function createPage(pageSource, pageContext) {
    var source = $(pageSource).html();
    var template = Handlebars.compile(source);
    var context = pageContext;
    var html = template(context);
    $(html).slideDown('slow', function() {$(this).appendTo('main');});
}

/**
 *
 * @event Removes an individual image from content container when user clicks delete button
 */
$('main').on('click', '.delete_button', function(event) {
    $(this).parents('.gif-container').remove();
    });

/**
 *
 * @event Initiates @function searchGIF upon search form submit
 * @param {string} searchString is the current value of the search field input
 * @param {number} alreadySeen is set back to 0 each time a new search is initiated
 */
$('.search-form').on('click', '.search-button', function(event) {
    event.preventDefault();
    var searchString = $('.search-field').val();
    $('.search-field').val('');

    $('.landing-container').remove(); //<----in case for any reason this happens before the landing pages clears

    if (alreadySeen > 0) {
        alreadySeen = 0;
    }

    if (gifContentPageCreated === false) {
    createPage('#gifContentPage', 'testing testing');
    gifContentPageCreated = true;
  }
    resultsLimit = 4;
    searchGIF(searchString, alreadySeen);

    alreadySeen += resultsLimit;


});

/**
 *
 * @event Clears all page content except navigation aside
 *  and resets variables alreadySeen and lastQuery and moreButtonExists
 */
$('.search-form').on('click', '.clear-button', function(event) {
    $('.gif-container').remove();
    $('.more-button-container').remove();
    alreadySeen = 0;
    lastQuery = null;
    moreButtonExists = false;
});


/**
 *
 * @event Initiates @function searchGIF using the previous query and current value of var alreadySeen to determine desired offset for new results
 * @param {string} lastQuery - the most recent search query submitted
 * @param {number} alreadySeen - the running count of how many results have already been returned for a given search
 */
$('main').on('click', '.more-button', function(event) {
    resultsLimit = 2;
    searchGIF(lastQuery, alreadySeen);
    alreadySeen += resultsLimit;
    console.log(alreadySeen + " gifs have already been seen for query: " + "'" + lastQuery + "'");
});


/**
*
* @event Auto generates landing page upon document load into window
*/
$(window).on('load', function(event) {
  pageContext = {};
  createPage('#landing', pageContext);
});


/**
*
* @event Loads content page to enable search results to populate
*/
$('main').on('click', '.start-button', function(event) {
  $('.landing-container').remove();
  createPage('#gifContentPage', 'testing testing');
  gifContentPageCreated = true;
});
