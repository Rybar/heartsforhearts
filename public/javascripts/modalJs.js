
var modalGreeting = document.getElementById('donationGreeting');
var modalGreetingTransferButton = document.getElementById('greetingTransfer');
var modalCallToAction = document.getElementById('donationCallToAction');
var centerDonateButton = document.getElementById('centerDonate');


function activateModal() {
    $('#myModal').modal('toggle');
}
function transferModal() {
    modalCallToAction.setAttribute('aria-hidden', 'false');
    modalGreeting.setAttribute('aria-hidden', 'true');
    
}
$('#myModal').on('hidden.bs.modal', function (e) {
    console.log('checking again');
    modalCallToAction.setAttribute('aria-hidden', 'true');
    modalGreeting.setAttribute('aria-hidden', 'false');
});
	centerDonateButton.addEventListener('click', activateModal);
	modalGreetingTransferButton.addEventListener('click', transferModal);
function recreateHeart() {
    
}
function submitForm() {
    var consistentString = "https:/www.justgiving.com/Ryan-Malm/4w350m3/donate/";
  console.log(document.donation.recipient.value);
  console.log(document.donation.message.value);
  console.log(document.donation.email.value);
  console.log(document.donation.amount.value);
 console.log(document.donation.currency.value);
  console.log(document.donation);
  console.log(consistentString + "?" + $("form").serialize());
} 
