
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ", " + city;
    var addressURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address +'';
    $('body').append('<img class= "bgimg" src="'+ addressURL +'">')

    return false;

    $('#form-container').submit(loadData);





};

