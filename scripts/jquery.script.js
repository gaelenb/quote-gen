


(function() {
	"use strict";


var model = {
		
	};





 function  request(){ 
	return $.ajax({
			url: 'https://andruxnet-random-famous-quotes.p.mashape.com/"', // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		    	 model = {
		    	 	quote: data.quote,
		    	 	author: data.author
		    	 	//cache shortened string value for creating a new share button
		    	 	// stringForTweet: data.author
		    	 			
		    	 };
		    	 view.showQuote(model.quote, model.author);
		    	 
		    	 return model;
		    },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "aPJztPTRfYmshMT0OPwGBRz2016up1ghQyIjsn9T7NV3hcjtIt"); // Enter here your Mashape key
		    }

});
}

var controller = 
	{ 

	formatQuote: function formatQuote(data) {
		var quoteData = data;
		var string = quoteData.quote + "~" + quoteData.author;
		var length = 140;
		var trimmedString = string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string.substring(0, length);
		console.log(trimmedString);
		model = {tweetString: trimmedString};
		return trimmedString;
	}

};

	
	




var view = {

	showQuote: function showQuote(q, a) {
		var quote = q;
		var author = a;

		$('.quote-container').html(
			"<div class='text quote'>"+quote + "</div>" + "<div class='text author'>~" + author + "</div>");
		

		
	},
	shareButton : function shareButton(textData) {
		var quoteText = textData;
		twttr.widgets.createShareButton(
			'',	
	  document.getElementById('new-tweet'),
	  {
	    count: 'none',
	    text: quoteText,
	    size: 'large'
	  }).then(function (el) {
	    console.log("Button created.");
	  });
},

	

};



var init = function() {
	
	
};

$(document).ready(function () {

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));


var requestQuote = request();

requestQuote.then(window.twttr).then( function() {
var string = controller.formatQuote(model);
view.shareButton(string);
});


});


//Controls 
	//for timer

$('.quote-button').click(function() {
	
	var tweetButton = $("iframe[id*='twitter']");
	if(tweetButton) {
		tweetButton.remove();
	} 
	var requestQuote = request();
	// controller.requestQuote();
	requestQuote.then(controller.formatQuote).then(view.shareButton);
	
});

// document.getElementById('tweetjs').addEventListener('load', function() {
//         twttr.ready(function (twttr) {
//             twttr.events.bind('tweet', function(e){
//                 if(!e) return;
                
//             });
//         });
//     }, false);

// twttr.ready(
//   function (twttr) {
//    console.log(twttr);
//   }
// );






})();









// 