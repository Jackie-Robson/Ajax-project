
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
   var cityStr = $('#city').val();
   var address = streetStr + ', ' + cityStr;

   $greeting.text('So, you want to live at ' + address + '?');


   // load streetview
   var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
   $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


   // load nytimes

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "f26215c383b340848fd37840fdd3cc09",
  'fq': address
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
  var articles =data.response.docs;
  for(var i=0; i < articles.length; i++){
    var article = articles[i];
    $nytElem.append('\n\
    <li class="article"> \n\
      <a href="'+article.web_url+'">'+article.headline.main+'</a> \n\
      <p>'+article.snippet+'</p> \n\
    </li> \n\
    ');
  }
}).error(function(){
  $("#nytimes-header").replaceWith('<h3 class="nytimes-header"> Data could not load! </h3>')
}).fail(function(err) {
  throw err;
});


// load wiki links

$.ajax({
  url:'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr+'&format=json&callback=wikiCallback',
  dataType:"jsonp"
}).done(function(data){
  var article = data[1];

  for(var i = 0; i< article.length; i++){
    articlestr = article[i];
    var url = 'http://en.wikidpedia.org/wiki'+ articlestr;
    $wikiElem.append('\n\
    <li> \n\
      <a href="'+url+'">'+articlestr+'</a> \n\
    </li> \n\
')
  };
  console.log(data);
}).error(function(){
  $("#wikipedia-header").replaceWith('<h3 id="wikipedia-header">Data could not load!</h3>')
})

   return false;


}

$('#form-container').submit(loadData);
