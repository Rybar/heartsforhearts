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
var HeartStyleArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
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
    var consistentString = "https://v3-sandbox.justgiving.com/Ryan-Malm/4w350m3/donate/";
    var exitURL = "&exitURL=" + /*encodeURIComponent(*/"https://heartsforhearts-rybar.c9.io/hearts/"//)
    /*console.log(document.donation.name.value);
    console.log(document.donation.message.value);
    console.log(document.donation.email.value);
    console.log(document.donation.amount.value);
    console.log(document.donation.currency.value);
    console.log(document.donation.intials.value);
    console.log(document.donation.anonymous.value);*/
    //console.log(document.donation);
    // URL = "justgiving charity page" + simpleDonation query + RedirectURL + our Query
    // SCHEMA from justgiving: http://www.justgiving.com/{shortUrl}/4w350m3/donate/?amount={suggestedAmount}&exitUrl=http%3a%2f%2fwww.myredirecturl.com%2fpath?donationId=JUSTGIVING-DONATION-ID
    console.log(consistentString + "?amount="
    		+ document.donation.amount.value
    		+ exitURL
    		//+  "?" + $("form").serialize()
    		+ "?name=" + encodeURIComponent(document.donation.name.value)
    		+ "%26initials=" + document.donation.intials.value
    		// The & might be the tripper. W3 encoding for & is &26. Tested.
    		+ "%26donation=" + document.donation.amount.value
    	    + "%26email=" + document.donation.email.value
    	    + "%26anonymous=" + document.donation.anonymous.value
    	    + "%26message=" + encodeURIComponent(document.donation.message.value)
    	    + "%26color=" + donationHeartColor
    	    + "%26style=" + donationHeartStyle
    	    + "%26currency=" + document.donation.currency.value 
    		+ "%26?donationId=JUSTGIVING-DONATION-ID"
    		// w3 converter link
    		// http://www.w3schools.com/tags/ref_urlencode.asp
    		// ?donation is necessary, tested 3/25
    	//	+ "&color=" + donationHeartColor
    	//	+ "&style=" + donationHeartStyle
    	
    		);
} 
