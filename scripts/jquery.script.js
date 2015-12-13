


(function() {
	"use strict";


var model = {
		quoteData: []
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
		    	 	quote: data
		    	 			
		    	 };
		    	 view.showQuote(model.quote);
		    },
		    error: function(err) { alert(err); },
		    beforeSend: function(xhr) {
		    xhr.setRequestHeader("X-Mashape-Authorization", "aPJztPTRfYmshMT0OPwGBRz2016up1ghQyIjsn9T7NV3hcjtIt"); // Enter here your Mashape key
		    }
		});
	},

	formatQuote: function formatQuote(data) {
		
	}
};

	
	




var view = {

	showQuote: function showQuote(data) {
		var quote = data;


		for (var text in quote) {
			
			$(".quote-container").append("<div class='text'>" +text +": " + quote[text] + "</div>");

		}
		
	}

};



var init = function() {
	
	
};

$(document).ready(function () {

console.log(controller);


});

// 

//Controls 
	//for timer

$('.quote-button').click(function() {
	
	controller.requestQuote();
});


$('.tweet-quote').click(function() {
	view.reset();
});

	//for audio





})();


// 