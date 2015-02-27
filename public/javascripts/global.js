//TODO

// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

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
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.fullname + '" title="Show Details">' + this.fullname + '</a></td>';
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
    var thisFullName = $(this).attr('rel');
    console.log($(this).attr('rel'));

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.fullname; }).indexOf(thisFullName);

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