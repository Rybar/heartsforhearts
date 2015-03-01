$(document).ready(function() {
    // Handler for .ready() called.
        var $container = $('#container');
        
          $container.packery({ 'selector' : '.heart', 'stamp' : '.whitespace'});    
          $container.packery('reloadItems');
          $container.packery('layout');
          
              // Empty content string
          

    // jQuery AJAX call for JSON
    $.getJSON('/users/heartlist', function(data) {

        // Stick our user data array into a userlist variable in the global object
        var userListData = data,
        //default heart Size
            heartSize = "small";

        // For each item in our JSON, we assign the user data of size, color, and shape to a heart and add.
        $.each(data, function() {
            //set size based on this.donation 
            if (this.donation >= 25) {
                heartSize = 'epic';
            } else if (this.donation <= 20) {
                heartSize = 'xlarge';
            } else if (this.donation >= 15) {
                heartSize = 'large';
            } else if (this.donation >= 10) {
                heartSize = 'med';
            }
            //create our heart
            var heart = document.createElement('div');
            $(heart)
            //add heart style text and CSS classes per this piece of data
            .html('<span>' + this.heartstyle + '</span></div>')
            .addClass('heart ' + this.color + ' ' + heartSize)
            .appendTo('#container');
            //add it to the packery instance too..
            $container.packery('addItems', heart);
        });
        $container.packery('layout');
    });

    $container.on("click", ".heart", function() {
        
      $(this).velocity({
          zIndex: "1000",
          translateY: "-20px",
          rotateY: "180deg",
          scaleX: "1.5",
          scaleY: "1.5",
      });
    });
});