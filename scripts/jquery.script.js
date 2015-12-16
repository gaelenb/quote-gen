


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
		var quote = data.quote;
		var author = "~" + data.author;
		var qL = quote.length;
		var aL = author.length;
		var maxL = 140;
		
		if (qL + aL > maxL) {
			var surplus = (qL+aL) % maxL;
		quote =	quote.substring(0, qL - surplus - 3 ) + "...";
		}
		var trimString = quote + author;
		
		model = {tweetString: trimString};
		return trimString;
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

window.twttr.ready(function() {
requestQuote.then(controller.formatQuote).then(view.shareButton);

});

///old script didn't always get twttr to load before trying to create the share button
// requestQuote.then(window.twttr).done(function ()
// var string = controller.formatQuote(model);
// view.shareButton(string);
// }));


});




$('.quote-button').click(function() {
	$('.quote-container').fadeOut(1500);
	var tweetButton = $("iframe[id*='twitter']");
	if(tweetButton) {
		tweetButton.remove();
	} 
	var requestQuote = request();
	// controller.requestQuote();
	requestQuote.then(controller.formatQuote).then(view.shareButton).done(function() {
		$('.quote-container').fadeIn(1200);

	});
	
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