// variables
var modalGreeting = document.getElementById('donationGreeting');
var modalGreetingTransferButton = document.getElementById('greetingTransfer');
var modalCallToAction = document.getElementById('donationCallToAction');
var centerDonateButton = document.getElementById('centerDonate');
var bluePreviewSelector = document.getElementById('blueselector');
var lightBluePreviewSelector = document.getElementById('lightblueselector');
var greenPreviewSelector = document.getElementById('greenselector');
var goldPreviewSelector = document.getElementById('goldselector');
var orangePreviewSelector = document.getElementById('orangeselector');
var redPreviewSelector = document.getElementById('redselector');
var pinkPreviewSelector = document.getElementById('pinkselector');
var purplePreviewSelector = document.getElementById('purpleselector');
var heartPreviewSelector = document.getElementById('heartPreview');
var donationHeartColor = "blue";
var donationHeartStyle = "A";
var styleCounter = 0;
// Event listeners
	centerDonateButton.addEventListener('click', centerDonateModalActivation);
	modalGreetingTransferButton.addEventListener('click', transferModal);
	// Ask Ryan about the following 2 lines. Something is clicking every element
	/*bluePreviewSelector.addEventListener('click', console.log("check1"));
	lightBluePreviewSelector.addEventListener('click', console.log('check2')); */
	$('#blueselector').on('click', function() {
	   changeBlue();
	});
	$('#lightblueselector').on('click', function() {
	   changeLightBlue();
	});
	$('#greenselector').on('click', function() {
	   changeGreen();
	});
	$('#goldselector').on('click', function() {
	   changeGold();
	});	
	$('#orangeselector').on('click', function() {
	   changeOrange();
	});
	$('#redselector').on('click', function() {
	   changeRed();
	});
	$('#pinkselector').on('click', function() {
	   changePink();
	});
	$('#purpleselector').on('click', function() {
	   changePurple();
	});
	
	// Don't mind this yet.
	/*greenPreviewSelector.addEventListener('click', changeGreen());
	goldPreviewSelector.addEventListener('click', changeGold());
	orangePreviewSelector.addEventListener('click', changeOrange());
	pinkPreviewSelector.addEventListener('click', changePink());
	purplePreviewSelector.addEventListener('click', changePurple());*/	
	// The following change the heart style.
	$('#leftDesignScroller').on('click', function() {
	    styleCounter++;
	    donationHeartStyle = HeartStyleArray [ Math.abs(styleCounter) % HeartStyleArray.length ];
	    $("#heartPreview span").html( donationHeartStyle )
	    console.log('left clicked');
	})
	$('#rightDesignScroller').on('click', function() {
	    styleCounter--;
		donationHeartStyle = HeartStyleArray [ Math.abs(styleCounter) % HeartStyleArray.length ];
	    $("#heartPreview span").html( donationHeartStyle )
	    console.log('right clicked');
	})
	// The following reset order of modals after a modal is turned off. Later, it will reset preview and form values.
$('#myModal').on('hidden.bs.modal', function (e) {
    modalCallToAction.setAttribute('aria-hidden', 'true');
    modalGreeting.setAttribute('aria-hidden', 'false');
});	
function scrollRight() {
    
}
function activateModal() {
    $('#myModal').modal('toggle');
}
function centerDonateModalActivation() {
    activateModal();
    transferModal();
}
function transferModal() {
    modalCallToAction.setAttribute('aria-hidden', 'false');
    modalGreeting.setAttribute('aria-hidden', 'true');
}
// This is the array that changes the letter
var HeartStyleArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
// This is where the heart style is in the form of a letter.
var previewHeartStyle = $("#heartPreview span").html();
// This is the array that switches the class of the heart preview
var previewHeartColor = ["blue", "lightblue", "green", "gold", "orange", "red", "pink", "purple"];
// Remove Color class of preview
function removeColorPreview() {
    $("#heartPreview").removeClass("blue");
    $("#heartPreview").removeClass("lightblue");
    $("#heartPreview").removeClass("green");
    $("#heartPreview").removeClass("gold");
    $("#heartPreview").removeClass("orange");
    $("#heartPreview").removeClass("red");
    $("#heartPreview").removeClass("pink");
    $("#heartPreview").removeClass("purple");
}
// Following functions add the selected color class to preview and assign the color class in a js variable
function changeBlue () {
    removeColorPreview();
    $("#heartPreview").addClass("blue");
    donationHeartColor = "blue";
}
function changeLightBlue() {
    removeColorPreview();
    $("#heartPreview").addClass("lightblue");
    donationHeartColor = "lightblue";
}
function changeGreen() {
    removeColorPreview();
    $("#heartPreview").addClass("green");
    donationHeartColor = "green";    
}
function changeGold() {
    removeColorPreview();
    $("#heartPreview").addClass("gold");
    donationHeartColor = "gold";    
}
function changeOrange() {
    removeColorPreview();
    $("#heartPreview").addClass("orange");
    donationHeartColor = "orange";    
}
function changeRed() {
    removeColorPreview();
    $("#heartPreview").addClass("red");
    donationHeartColor = "red";    
}
function changePink() {
    removeColorPreview();
    $("#heartPreview").addClass("pink");
    donationHeartColor = "pink";    
}
function changePurple() {
    removeColorPreview();
    $("#heartPreview").addClass("purple");
    donationHeartColor = "purple";    
}
function submitForm() {
    var outURL = "https://v3-sandbox.justgiving.com/Ryan-Malm/4w350m3/donate/";
    var exitURL = "&exitURL=" + encodeURIComponent( process.env.APP_URL || "https://heartsforhearts-rybar.c9.io/hearts/" )
    
    var fullURL = outURL
            //these first 3 will auto-fill the donation form at justGiving donation page.
            + "?amount=" + document.donation.amount.value
            + "&defaultMessage=" + document.donation.message.value
            + "&amount=" + document.donation.amount.value
            // next we compose our return URL, which will create a new heart on the page.
    		+ exitURL
    		+ encodeURIComponent( "?" + $("form").serialize() 
    		    + "&addHeart=true" //triggers addHeart() on return
         	    + "&color=" + donationHeartColor
         	    + "&style=" + donationHeartStyle
         		+ "&donationId=JUSTGIVING-DONATION-ID" ) //end encodeURIComponent creation
    		//end string construction

    // URL = "justgiving charity page" + simpleDonation query + RedirectURL + our Query
    // SCHEMA from justgiving: http://www.justgiving.com/{shortUrl}/4w350m3/donate/?amount={suggestedAmount}&exitUrl=http%3a%2f%2fwww.myredirecturl.com%2fpath?donationId=JUSTGIVING-DONATION-ID
    console.log(fullURL)
    window.open(fullURL)
} 
