var H = {}; //namespace for our global stuffs
H.heartData = []; //global variable for hearts data
H.total = 0;

$(document).ready(function() {
    //initialize hiding navbar, only show after scrolling past header
    $("#navigationBar").autoHidingNavbar({
        disableAutohide : true,
        showOnUpscroll: false,
        showOnBottom: true
    });
    $("#navigationBar").autoHidingNavbar('hide');
    $(window).scroll( function() {
        var value = $(this).scrollTop();
        //console.log(value)
        if ( value > 240 )
           $("#navigationBar").autoHidingNavbar('show');
        else
            $("#navigationBar").autoHidingNavbar('hide');
            });
    
    // Handler for .ready() called.
        var $container = $('#container');
        
        
   // $container.packery({ 'selector' : '.heart', 'stamp' : '.whitespace'}); 
     $container.packery({ 'selector' : '.heart'});
     
    if(qAddHeart) {
    console.log("adding a heart called via query")
    addHeart();
    }

          
    // jQuery AJAX call for JSON
    $.getJSON('/users/heartlist', function(data) {
        H.heartData = data; //store JSON data in global variable.
        
        if(qViewHeart) {
        console.log(qViewHeart + ' this is the qView');
        activateModal();
        //populateModal(qViewHeart);
        populateShowCaseModal(qViewHeart);
        }
        
        //default heart Size
            var heartSize = "small";

        // For each item in our JSON, we assign the user data of size, color, and shape to a heart and add.
        $.each(data, function() {
            var thisHeart = this;
            //set size based on this.donation 
            if (this.donation >= 25) {
                heartSize = 'epic';
            } else if (this.donation >= 20) {
                heartSize = 'xlarge';
            } else if (this.donation >= 15) {
                heartSize = 'large';
            } else if (this.donation >= 10) {
                heartSize = 'med';
            } else if (this.donation >= 1) {
                heartSize = 'small';
            }
            //create our heart
            var heart = document.createElement('div');
            $(heart)
            //add heart style text and CSS classes per this piece of data
            .html('<span>' + this.heartstyle + '</span></div>')
            .addClass('heart ' + this.color + ' ' + heartSize + ' ' + "activate")
            .data("id", this._id)
            .appendTo('#container');
            //$container.packery('appended', heart);

             setTimeout( function() { //for cascading animation, set a tiny delay between adding each one
                 $container.packery('appended', heart);
                 $container.packery('layout');
                 if(thisHeart.empty === "false") { 
                    updateProgressBar(thisHeart.donation);
                    //console.log(thisHeart.donation + " " + thisHeart.empty)
                 }
             }, 01 ); //delay between showing hearts/adding them to packery instance
            
        });
        
        
        
        //$container.packery('layout');
        
        
    });
    

    
    // Turned off flip animation. Code preserved.
    
    $container.on("click", ".heart", function() {
        
      /*$(this).velocity({
          zIndex: "1000",
          translateY: "-20px",
          rotateY: "180deg",
          scaleX: "1.5",
          scaleY: "1.5",
      });*/
        activateModal();
        populateModal($(this).data('id') );
        

    });
});
function populateShowCaseModal(donationID) {
    
    //var showCaseHeartIndex = H.heartData.map(function(arrayItem) { return arrayItem._id; }).indexOf(donationID);
    
    //var showCaseHeartObject = H.heartData[showCaseHeartIndex];
    var showCaseHeartSearch = H.heartData.filter(function (obj) {
        return obj.justGivingID == donationID;
    });
    var showCaseHeartObject = showCaseHeartSearch[0];
    console.log(showCaseHeartObject);
    if(showCaseHeartObject === undefined) {
        alert("Not found")
        
    }
    else {
        $('#heartBelongs').text("This heart donated on behalf of " + showCaseHeartObject.fullname);
        $('#donationAmountCounter').text(" Donation amount: " + showCaseHeartObject.donation);
        $('#donationAmount').text(showCaseHeartObject.donation);
        $('#donationMessage').text(showCaseHeartObject.message);
        $('#clickedHeartPic').html('<span id="greetingHeart" class = "heart ' + showCaseHeartObject.color + ' epic activate">' + showCaseHeartObject.heartstyle + '</span>');
         
    }
}

function populateModal(id){

    // Variable equating the index in H.heartData
    var clickedHeartIndex = H.heartData.map(function(arrayItem) { return arrayItem._id; }).indexOf(id);
    // Variable equaling the clicked heart's Json 
    var clickedHeartObject = H.heartData[clickedHeartIndex];
    if (clickedHeartObject.empty === "true") {
        transferModal(); //go to the heart designer & donation modal instead
    } else {
        // Heart Object Info
        $('#heartBelongs').text("This heart donated on behalf of " + clickedHeartObject.fullname);
        $('#donationAmountCounter').text(" Donation amount: " + clickedHeartObject.donation);
        $('#donationAmount').text(clickedHeartObject.donation);
        $('#donationMessage').text(clickedHeartObject.message);
        $('#clickedHeartPic').html('<span id="greetingHeart" class = "heart ' + clickedHeartObject.color + ' epic activate">' + clickedHeartObject.heartstyle + '</span>');
    }
}

function updateProgressBar(donation) {
    H.total += parseInt(donation);
    var percent = (H.total/10000).toFixed(2).toString().slice(2) + "%";
    $('#meter').css("height", percent)
}

function addHeart() {
        // If it is, compile all user info into one object
        /*
                input#inputDonationAmount(type='text', placeholder='Donation Amount')
                input#inputUserEmail(type='text', placeholder='Family Email')
                input#inputUserFullname(type='text', placeholder='Full Name')
                input#inputMessage(type='text', placeholder='Your custom message')
                input#inputCurrency(type='text', placeholder='currency')
                */
        var newUser = {
            'email': qEmail,            //$('#addHeart fieldset input#inputUserEmail').val(),
            'anonymous': qAnonymous,    //$('#addHeart fieldset input#inputUserAnonymous').val(),
            'fullname': qName,          //$('#addHeart fieldset input#inputUserFullname').val(),
            'initials': qInitials,      //$('#addHeart fieldset input#inputUserInitials').val(),
            'donation': qAmount,      //$('#addHeart fieldset input#inputDonationAmount').val(),
            'message': qMessage, //$('#addHeart fieldset input#inputMessage').val(),
            'currency': qCurrency, //$('#addHeart fieldset select#inputCurrency').val(),
            'color': qColor,  //$('#addHeart fieldset select#inputColor').val(),
            'heartstyle': qStyle,  //$('#addHeart fieldset select#inputHeartstyle').val(),
            'justGivingID' : qJustGivingID,
            'empty': false
            
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/addheart',
            dataType: 'JSON'
        }).done(function( response ) {
            //window.location.replace("https://heartsforhearts-rybar.c9.io/hearts");
        });
    };
    
/*function mailConfirmation(email) {
    
}*/


