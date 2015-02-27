//TODO

// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    
    //generateRandomSet(10);

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#heartList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);

    // Delete User link click
    $('#heartList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/heartlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;
        console.log(userListData);

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this._id + '" title="Show Details">' + this.fullname + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#heartList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var objectId = $(this).attr('rel');
    console.log($(this).attr('rel'));

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(objectId);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];
    
    //Populate Info Box
    $('#userInfoFullName').text(thisUserObject.fullname);
    $('#userInfoEmail').text(thisUserObject.email);
    $('#userInfoDonationAmount').text(thisUserObject.donation);
    $('#userInfoInputMessage').text(thisUserObject.message);
    $('#userInfoCurrency').text(thisUserObject.currency);
    $('#userInfoColor').text(thisUserObject.color);
    $('#userInfoHeartstyle').text(thisUserObject.heartstyle);
    
    styleHeart(thisUserObject.color, thisUserObject.heartstyle, thisUserObject.donation);
    
    
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addHeart input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        /*
                input#inputDonationAmount(type='text', placeholder='Donation Amount')
                input#inputUserEmail(type='text', placeholder='Family Email')
                input#inputUserFullname(type='text', placeholder='Full Name')
                input#inputMessage(type='text', placeholder='Your custom message')
                input#inputCurrency(type='text', placeholder='currency')
                */
        var newUser = {
            'email': $('#addHeart fieldset input#inputUserEmail').val(),
            'fullname': $('#addHeart fieldset input#inputUserFullname').val(),
            'donation': $('#addHeart fieldset input#inputDonationAmount').val(),
            'message': $('#addHeart fieldset input#inputMessage').val(),
            'currency': $('#addHeart fieldset select#inputCurrency').val(),
            'color': $('#addHeart fieldset select#inputColor').val(),
            'heartstyle': $('#addHeart fieldset select#inputHeartstyle').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/addheart',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addHeart fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

function styleHeart(color, style, donationAmount){
    var amount = parseInt(donationAmount, 10);
    console.log(color + " | " + style + " | " + amount);
    var heartSize = "small";
    //set size based on donationAmount
    if(amount >= 25){
        heartSize = 'epic';
    }
    if(amount <= 20){
        heartSize = 'large';
    }
    if(amount >= 25){
        heartSize = 'large';
    }

    console.log(heartSize);
    $("#userHeart").find(".heart").removeClass();
    $("#userHeart").find("div").addClass("heart " + color + " " + heartSize);
    $("#userHeart").find(".heart span").text(style);
    //$("#userHeart").find(".heart").addClass("large");

}


function generateRandomSet(numberOfEntries) {
    
    for(var i = 0; i <=numberOfEntries; i++) {
        var colors = [ 'green', 'gold', 'orange', 'red', 'pink'],
            styles = [ 'A', 'B', 'C'],
            randColor = colors[Math.floor(Math.random()*colors.length)],
            randStyles = styles[Math.floor(Math.random()*styles.length)],
            newUser = {
            'email': "johndoe@acme.com",
            'fullname' : "John Doe",
            'donation': Math.floor(Math.random()*26),
            'message': "blah",
            'currency': "USD",
            'color': randColor,
            'heartstyle': randStyles
        };
        console.log(randColor);
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/addheart',
            dataType: 'JSON'
        }).done(function( response ) {
        
            // Check for successful (blank) response
            if (response.msg === '') {
            }
            else {
        
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
        
            }
        });
    // Clear the form inputs
    }

        // Update the table
        populateTable();
}