{"changed":false,"filter":false,"title":"modalJs.js","tooltip":"/public/javascripts/modalJs.js","value":"// variables\nvar modalGreeting = document.getElementById('donationGreeting');\nvar modalGreetingTransferButton = document.getElementById('greetingTransfer');\nvar modalCallToAction = document.getElementById('donationCallToAction');\nvar centerDonateButton = document.getElementById('centerDonate');\nvar bluePreviewSelector = document.getElementById('blueselector');\nvar lightBluePreviewSelector = document.getElementById('lightblueselector');\nvar greenPreviewSelector = document.getElementById('greenselector');\nvar goldPreviewSelector = document.getElementById('goldselector');\nvar orangePreviewSelector = document.getElementById('orangeselector');\nvar redPreviewSelector = document.getElementById('redselector');\nvar pinkPreviewSelector = document.getElementById('pinkselector');\nvar purplePreviewSelector = document.getElementById('purpleselector');\nvar heartPreviewSelector = document.getElementById('heartPreview');\nvar donationHeartColor = \"blue\";\nvar donationHeartStyle = \"A\";\nvar styleCounter = 0;\n// Event listeners\n\tcenterDonateButton.addEventListener('click', centerDonateModalActivation);\n\tmodalGreetingTransferButton.addEventListener('click', transferModal);\n\t// Ask Ryan about the following 2 lines. Something is clicking every element\n\t/*bluePreviewSelector.addEventListener('click', console.log(\"check1\"));\n\tlightBluePreviewSelector.addEventListener('click', console.log('check2')); */\n\t$('#blueselector').on('click', function() {\n\t   changeBlue();\n\t});\n\t$('#lightblueselector').on('click', function() {\n\t   changeLightBlue();\n\t});\n\t$('#greenselector').on('click', function() {\n\t   changeGreen();\n\t});\n\t$('#goldselector').on('click', function() {\n\t   changeGold();\n\t});\t\n\t$('#orangeselector').on('click', function() {\n\t   changeOrange();\n\t});\n\t$('#redselector').on('click', function() {\n\t   changeRed();\n\t});\n\t$('#pinkselector').on('click', function() {\n\t   changePink();\n\t});\n\t$('#purpleselector').on('click', function() {\n\t   changePurple();\n\t});\n\t\n\t// Don't mind this yet.\n\t/*greenPreviewSelector.addEventListener('click', changeGreen());\n\tgoldPreviewSelector.addEventListener('click', changeGold());\n\torangePreviewSelector.addEventListener('click', changeOrange());\n\tpinkPreviewSelector.addEventListener('click', changePink());\n\tpurplePreviewSelector.addEventListener('click', changePurple());*/\t\n\t// The following change the heart style.\n\t$('#leftDesignScroller').on('click', function() {\n\t    styleCounter++;\n\t    donationHeartStyle = HeartStyleArray [ Math.abs(styleCounter) % HeartStyleArray.length ];\n\t    $(\"#heartPreview span\").html( donationHeartStyle )\n\t    console.log('left clicked');\n\t})\n\t$('#rightDesignScroller').on('click', function() {\n\t    styleCounter--;\n\t\tdonationHeartStyle = HeartStyleArray [ Math.abs(styleCounter) % HeartStyleArray.length ];\n\t    $(\"#heartPreview span\").html( donationHeartStyle )\n\t    console.log('right clicked');\n\t})\n\t// The following reset order of modals after a modal is turned off. Later, it will reset preview and form values.\n$('#myModal').on('hidden.bs.modal', function (e) {\n    modalCallToAction.setAttribute('aria-hidden', 'true');\n    modalGreeting.setAttribute('aria-hidden', 'false');\n});\t\nfunction scrollRight() {\n    \n}\nfunction activateModal() {\n    $('#myModal').modal('toggle');\n}\nfunction centerDonateModalActivation() {\n    activateModal();\n    transferModal();\n}\nfunction transferModal() {\n    modalCallToAction.setAttribute('aria-hidden', 'false');\n    modalGreeting.setAttribute('aria-hidden', 'true');\n}\n// This is the array that changes the letter\nvar HeartStyleArray = [\"A\", \"B\", \"C\", \"D\", \"E\", \"F\", \"G\", \"H\", \"I\", \"J\", \"K\", \"L\", \"M\"];\n// This is where the heart style is in the form of a letter.\nvar previewHeartStyle = $(\"#heartPreview span\").html();\n// This is the array that switches the class of the heart preview\nvar previewHeartColor = [\"blue\", \"lightblue\", \"green\", \"gold\", \"orange\", \"red\", \"pink\", \"purple\"];\n// Remove Color class of preview\nfunction removeColorPreview() {\n    $(\"#heartPreview\").removeClass(\"blue\");\n    $(\"#heartPreview\").removeClass(\"lightblue\");\n    $(\"#heartPreview\").removeClass(\"green\");\n    $(\"#heartPreview\").removeClass(\"gold\");\n    $(\"#heartPreview\").removeClass(\"orange\");\n    $(\"#heartPreview\").removeClass(\"red\");\n    $(\"#heartPreview\").removeClass(\"pink\");\n    $(\"#heartPreview\").removeClass(\"purple\");\n}\n// Following functions add the selected color class to preview and assign the color class in a js variable\nfunction changeBlue () {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"blue\");\n    donationHeartColor = \"blue\";\n}\nfunction changeLightBlue() {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"lightblue\");\n    donationHeartColor = \"lightblue\";\n}\nfunction changeGreen() {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"green\");\n    donationHeartColor = \"green\";    \n}\nfunction changeGold() {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"gold\");\n    donationHeartColor = \"gold\";    \n}\nfunction changeOrange() {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"orange\");\n    donationHeartColor = \"orange\";    \n}\nfunction changeRed() {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"red\");\n    donationHeartColor = \"red\";    \n}\nfunction changePink() {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"pink\");\n    donationHeartColor = \"pink\";    \n}\nfunction changePurple() {\n    removeColorPreview();\n    $(\"#heartPreview\").addClass(\"purple\");\n    donationHeartColor = \"purple\";    \n}\nfunction submitForm() {\n    var outURL = \"https://v3-sandbox.justgiving.com/Ryan-Malm/4w350m3/donate/\";\n    var exitURL = \"&exitURL=\" + encodeURIComponent( \"https://heartsforhearts-rybar.c9.io/hearts/\" )\n    \n    var fullURL = outURL\n            //these first 3 will auto-fill the donation form at justGiving donation page.\n            + \"?amount=\" + document.donation.amount.value\n            + \"&defaultMessage=\" + document.donation.message.value\n            + \"&amount=\" + document.donation.amount.value\n            // next we compose our return URL, which will create a new heart on the page.\n    \t\t+ exitURL\n    \t\t+ encodeURIComponent( \"?\" + $(\"form\").serialize() \n    \t\t    + \"&addHeart=true\" //triggers addHeart() on return\n         \t    + \"&color=\" + donationHeartColor\n         \t    + \"&style=\" + donationHeartStyle\n         \t\t+ \"&donationId=JUSTGIVING-DONATION-ID\" ) //end encodeURIComponent creation\n    \t\t//end string construction\n\n    // URL = \"justgiving charity page\" + simpleDonation query + RedirectURL + our Query\n    // SCHEMA from justgiving: http://www.justgiving.com/{shortUrl}/4w350m3/donate/?amount={suggestedAmount}&exitUrl=http%3a%2f%2fwww.myredirecturl.com%2fpath?donationId=JUSTGIVING-DONATION-ID\n    console.log(fullURL)\n    window.open(fullURL)\n} \n","undoManager":{"mark":-1,"position":-1,"stack":[]},"ace":{"folds":[],"scrolltop":1840,"scrollleft":0,"selection":{"start":{"row":156,"column":60},"end":{"row":156,"column":60},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":130,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1427847137000}