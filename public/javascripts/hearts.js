var H = { 
    heartData : [], 
    total : 0
}


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
        if ( value > 240 ) {
           $("#navigationBar").autoHidingNavbar('show');
        }
        else {
            $("#navigationBar").autoHidingNavbar('hide');
        }
    });
    
    //cache container and create packery instance
    H.container = $('#container');
    //H.container.packery({ 'selector' : '.heart'});
    
    if(qAddHeart) {
    console.log("adding a heart called via query")
    addHeart();
    }

          
    // jQuery AJAX call for JSON
    $.getJSON('/users/heartlist', function(data) {
        onGetHearts(data);
        animate();
    });
    

    
    // Turned off flip animation. Code preserved.
    
    H.container.on("click", ".heart", function(event) {
        
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
    $('#meterOutside span').text("$" + H.total);
    $('#meter').css("height", percent);
}

function animate() {
    H.container.packery({ 'selector' : '.heart'});
    //H.container.packery('appended', $(".heart"))
    setTimeout(function(){ H.container.packery('layout');} , 10);
   
            
}

function onGetHearts(data) {
    H.heartData = data; //store JSON data in global variable.
    
    if(qViewHeart) {
    activateModal();
    populateShowCaseModal(qViewHeart);
    }
    
    //default heart Size
        var heartSize = "small";
    
    // For each item in our JSON, we assign the user data of size, color, and shape to a heart and add.
    $.each( data, function() {
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
        //H.container.packery('appended', heart);
        }
    )
}

function addHeart() {
       
        var newUser = {
            'email'         :   qEmail,            
            'anonymous'     :   qAnonymous,   
            'fullname'      :   qName,         
            'initials'      :   qInitials,      
            'donation'      :   qAmount,      
            'message'       :   qMessage, 
            'currency'      :   qCurrency, 
            'color'         :   qColor,  
            'heartstyle'    :   qStyle,  
            'justGivingID'  :   qJustGivingID,
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


