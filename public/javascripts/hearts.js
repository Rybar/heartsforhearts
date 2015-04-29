var H = { 
    heartData : [],
    chunkIndex : 0,
    total : 0,
    chunk : [],
    page : 20,
    heartLimit : false
};

WebFont.load({
    google: {
      families: ['Shadows Into Light Two']
    },
    
    custom: {
    families: ['heartsregular'],
  }
  });


$(document).ready(function() {
    // jQuery AJAX call for JSON
    $.getJSON('/users/heartlist', function(data) {
        H.heartData = data; //store JSON data in global object.
        updateProgressBar(H.heartData);
        onGetHearts();
    });

    $(window).scroll( function() {

        if($(window).scrollTop() + $(window).height() + 50 > $(document).height()) {
            onGetHearts();
            }
    });
    
    //cache container and create packery instance
    H.container = $('#container');
    H.container.packery({
        'selector' : '.heart'
    });
    H.container.packery("layout");
    
    //moving this into onGetHearts()
    if(qJustGivingID) {
     
        var DuplicateHeartSearch = H.heartData.filter(function(obj) {
            return obj.justGivingID == qJustGivingID;
        }),
        DuplicateHeartSearchObject = DuplicateHeartSearch[0];
        console.log(DuplicateHeartSearchObject);
        if (DuplicateHeartSearchObject === undefined || null) {
            console.log('make a new heart');
            addHeart();
        } else {
            console.log("don't make a new heart");
        }    
    }
    
    H.container.on("click", ".heart", function(event) {
        activateModal();
        populateModal($(this).data('id') );
    });
    
    //form validation
    $('#donationform').validate({
        rules: {
            nameInfo: "required",
            emailInfo: {
                required: true,
                email: true
            }
            
        },
        messages: {
            nameInfo: "Please enter your name",
            emailInfo: "Please enter a valid email address"
        }
    });
});

function populateShowCaseModal(donationID) {
    
    var showCaseHeartSearch = H.heartData.filter(function (obj) {
        return obj.justGivingID == donationID;
    });
    var showCaseHeartObject = showCaseHeartSearch[0];
    //console.log(showCaseHeartObject);
    if(showCaseHeartObject === undefined) {
        alert("Not found");
        
    }
    else {
        populateModal(showCaseHeartObject._id);
    }
}

function populateModal(id){

    // Variable equating the index in H.heartData
    var clickedHeartIndex = H.heartData.map(function(arrayItem) { return arrayItem._id; }).indexOf(id);
    // Variable equaling the clicked heart's Json 
    var clickedHeartObject = H.heartData[clickedHeartIndex];
    if (clickedHeartObject.empty === "true") {
        transferModal(); //go to the heart designer & donation modal instead
    } else if(clickedHeartObject.anonymous === "on") {
        
        if(clickedHeartObject.dedicatedName){
            //anonymous donation, with dedication
            $('#heartBelongs').text("This heart was donated anonymously for " + clickedHeartObject.dedicatedName);
            $('#donationAmountCounter').text(" Donation amount: $" + clickedHeartObject.donation);
            $('#donationAmount').text(clickedHeartObject.donation);
            $('#donationMessage').text(clickedHeartObject.message);
            $('#clickedHeartPic').html('<span id="greetingHeart" class = "heart ' + clickedHeartObject.color + ' epic activate">' + clickedHeartObject.heartstyle + '</span>');
        } else {
            //completely anonymous
            $('#heartBelongs').text("This heart was donated anonymously.");
            $('#donationAmountCounter').text(" Donation amount: $" + clickedHeartObject.donation);
            $('#donationAmount').text(clickedHeartObject.donation);
            $('#donationMessage').text("Great work SACH! Let's help save some more children!  :)");
            $('#clickedHeartPic').html('<span id="greetingHeart" class = "heart ' + clickedHeartObject.color + ' epic activate">' + clickedHeartObject.heartstyle + '</span>');
        }

    }
    
    else {
        //normal donation, all fields filled
        // Heart Object Info
        $('#heartBelongs').text("This heart belongs to " + clickedHeartObject.dedicatedName + " and was donated by " + clickedHeartObject.fullname);
        $('#donationAmountCounter').text(" Donation amount: $" + clickedHeartObject.donation);
        $('#donationAmount').text(clickedHeartObject.donation);
        $('#donationMessage').text(clickedHeartObject.message);
        $('#clickedHeartPic').html('<span id="greetingHeart" class = "heart ' + clickedHeartObject.color + ' epic activate">' + clickedHeartObject.heartstyle + '</span>');
    }
}

function updateProgressBar(data) {
        
    var total = data.filter(function(obj){
        return obj.empty === "false";
    }).reduce(function(a,b){
        return { donation: parseInt(a.donation) + parseInt(b.donation) }; 
    }).donation;
    
    if(total >= 10000){
        percent = "100%";
    }
    else {
       var percent = (total/10000).toFixed(2).toString().slice(2) + "%"; 
    }
    $('#meterOutside span').text("$" + total);
    //console.log(percent);
    setTimeout(function(){
        $('#meter').velocity({
          height: percent
         }, {duration: 2000});
        
    },0)
    
}

function onGetHearts() {
    
    console.log("onGetHearts called, totalHearts: "+H.heartData.length + "index: " + H.chunkIndex);
    var data = H.heartData;   
    if(qViewHeart) {
    activateModal();
    populateShowCaseModal(qViewHeart);
    }
    //default heart Size
        var heartSize = "small";
    

    if(H.heartLimit) {
        return;
    }
    else {
         var nextIndex = H.chunkIndex+H.page;
    }
    if( H.chunkIndex + H.page >= H.heartData.length ){
        nextIndex = H.heartData.length;
        H.heartLimit = true;
    }
    H.chunk = data.slice(H.chunkIndex, nextIndex);
    $.each( H.chunk, function() {

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
        setTimeout( function() { //for cascading animation, set a tiny delay between adding each one
             H.container.packery('appended', heart);
             H.container.packery('layout');
             }, 10 );
        
    });

        //H.container.packery('reloadItems');
       // H.container.packery('layout');
        H.chunkIndex = nextIndex;
    
}

function addHeart() {
       
        var newUser = {
            'email'         :   qEmail || null,    
            'anonymous'     :   qAnonymous || null,    
            'fullname'      :   qName || null,    
            'donation'      :   qAmount || null,    
            'message'       :   qMessage || null,    
            'currency'      :   qCurrency || null,    
            'color'         :   qColor || null,    
            'heartstyle'    :   qStyle || null,    
            'dedicatedEmail':   qdedicatedEmail || null,    
            'dedicatedName' :   qdedicatedName || null,    
            'justGivingID'  :   qJustGivingID || null,    
            'empty': false
        };
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/addheart',
            dataType: 'JSON'
        }).done(function( response ) {
            thankYou();
        });
    }
    
function animate(data) {
    // $.each($('.heart'), function( index, value ){
    //     //console.log(index);
    //     //console.log(value);
    //     //setTimeout(function(){
    //         H.container.packery('appended', value );
    //         console.log('hit');
        
    //     //}, 3) 
    // })
    //         H.container.packery('layout');
    //     //H.container.packery('appended', $('.heart') );
    //     //H.container.packery('layout');

        
        H.container.packery('appended', $('#container .heart') );
        H.container.packery('layout');

};
    
function waitForWebfonts(fonts, callback) {
    var loadedFonts = 0;
    for(var i = 0, l = fonts.length; i < l; ++i) {
        (function(font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position      = 'absolute';
            node.style.left          = '-10000px';
            node.style.top           = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize      = '300px';
            // Reset any font properties
            node.style.fontFamily    = 'sans-serif';
            node.style.fontVariant   = 'normal';
            node.style.fontStyle     = 'normal';
            node.style.fontWeight    = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font;

            var interval;
            function checkFont() {
                // Compare current width with original width
                if(node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if(loadedFonts >= fonts.length) {
                    if(interval) {
                        clearInterval(interval);
                    }
                    if(loadedFonts == fonts.length) {
                        callback();
                        return true;
                    }
                }
            };

            if(!checkFont()) {
                interval = setInterval(checkFont, 100);
            }
        })(fonts[i]);
    }
};


