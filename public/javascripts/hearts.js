var heartData = []; //global variable for hearts data
var total = 0;

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
          
    // jQuery AJAX call for JSON
    $.getJSON('/users/heartlist', function(data) {
        heartData = data; //store JSON data in global variable.

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

function populateModal(id){

    // Variable equating the index in heartData
    var clickedHeartIndex = heartData.map(function(arrayItem) { return arrayItem._id; }).indexOf(id);

    // Variable equaling the clicked heart's Json 
    var clickedHeartObject = heartData[clickedHeartIndex];
    if (clickedHeartObject.empty === "true") {
        transferModal();
    } else {
        // Heart Object Info
        $('#heartBelongs').text("This heart belongs to " + clickedHeartObject.fullname);
        $('#donationAmountCounter').text(" Donation amount: " + clickedHeartObject.donation);
        $('#donationAmount').text(clickedHeartObject.donation);
        $('#clickedHeartPic').html('<span id="greetingHeart" class = "heart ' + clickedHeartObject.color + ' epic activate">' + clickedHeartObject.heartstyle + '</span>');
    }
    //$('#clickedHeartPic').addClass('heart ' + clickedHeartObject.color + " med activate");
    //$('#userInfoColor').text(clickedHeartObject.color);
    //$('#userInfoHeartstyle').text(clickedHeartObject.heartstyle);
    
    //styleHeart(clickedHeartObject.color, clickedHeartObject.heartstyle, clickedHeartObject.donation);
}

function updateProgressBar(donation) {
    total += parseInt(donation);
    var percent = (total/10000).toFixed(2).toString().slice(2) + "%";
    //console.log(donation + " " + total + " " + percent);
    $('#meter').css("height", percent)
}

function addHeart() {
    
}
