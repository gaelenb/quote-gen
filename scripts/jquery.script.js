


(function() {
	"use strict";


var model = {
		
	};








var controller = 
	{ 
	requestQuote: function requestQuote() {
		$.ajax({
		    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/"', // The URL to the API. You can get this in the API page of the API you intend to consume
		    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		    data: {}, // Additional parameters here
		    dataType: 'json',
		    success: function(data) {
		    	 model = {
		    	 	quote: data.quote,
		    	 	//cache shortened string value for creating a new share button
		    	 	stringForTweet: data.author
		    	 			
		    	 };
		    	 view.showQuote(model.quote);
		    	 
		    	 console.log(data.quote);
		    	 
		    },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "aPJztPTRfYmshMT0OPwGBRz2016up1ghQyIjsn9T7NV3hcjtIt"); // Enter here your Mashape key
		    }
		});
	},

	formatQuote: function formatQuote(data) {
		var string = data;
		var length = 140;
		var trimmedString = string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string.substring(0, length);
		console.log(trimmedString);
		return trimmedString;
	}

};

	
	




var view = {

	showQuote: function showQuote(data) {
		var quote = data;

		$('.quote-container').html(
			"<div class='text quote'>"+quote.quote + "</div>" + "<div class='text author'>~" + quote.author + "</div>");
		
		//triggers creation of new share button
		
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

	twitInit : function twitInit() {
		
		}

};
$(".new-tweet").attr('id', 'new-tweet');


var init = function() {
	
	
};

$(document).ready(function () {

var defer = $.Deferred();

var x= defer.then(function(value) {
	
	var newString;
	var quote = controller.formatQuote(value);
	// var author = controller.formatQuote(val);

	return quote; 
});


//NEED TO USE THESE CHAINS ON THE AJAX REQUEST-- twitter script
//will be done by then.? can use new knoweldge of chains to 
//load twitter script later. . . ?




defer.resolve(model.quote);

x.done(function(value) {
	view.shareButton(value);
});

// controller.requestQuote();

twttr.ready(
	function(twttr) {
		twttr.events.bind(
  'loaded',
  function (event) {
    event.widgets.forEach(function (widget) {
      console.log("Created widget", widget.id);
    });
  }
);
		// twttr.widgets.load(document.getElementById('new-tweet'));
		
	});



});


//Controls 
	//for timer

$('.quote-button').click(function() {
	
	var tweetButton = $("iframe[id*='twitter']");
	if(tweetButton) {
		tweetButton.remove();
	} 
	// controller.requestQuote();
	view.shareButton();
	// view.shareButton(model.quote);
	// controller.requestQuote();
});







})();









// 