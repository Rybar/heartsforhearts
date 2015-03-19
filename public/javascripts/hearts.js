var heartData = []; //global variable for hearts data
var total = 0;

$(document).ready(function() {
    // Handler for .ready() called.
        var $container = $('#container');
        
        
   // $container.packery({ 'selector' : '.heart', 'stamp' : '.whitespace'}); 
     $container.packery({ 'selector' : '.heart'/*, 'stamp' : '.whitespace'*/});   
          
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
            //add it to the packery instance too..
             setTimeout( function() { //for cascading animation, set a tiny delay between adding each one
             $container.packery('appended', heart);
             $container.packery('layout');
             if(thisHeart.empty === "false") { 
                updateProgressBar(thisHeart.donation);
                //console.log(thisHeart.donation + " " + thisHeart.empty)
             }
             }, 01 );
        });
        
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
        
        /*if( clickedHeartObject.class === "empty") {
            activateoverlay();
         //$('#heartDescriptionText h2').text($(this).data('id'));
            populateModal( $(this).data('id') );
         *  
        };*/
    });
});

function populateModal(id){

    // Variable equating the index in heartData
    var clickedHeartIndex = heartData.map(function(arrayItem) { return arrayItem._id; }).indexOf(id);

    // Variable equaling the clicked heart's Json 
    var clickedHeartObject = heartData[clickedHeartIndex];
    if (clickedHeartObject.empty === "true") {
        console.log('checking123456');
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
    $('.progress-bar').attr("aria-valuenow", total);
    $('.progress-bar').css("width", percent)
}