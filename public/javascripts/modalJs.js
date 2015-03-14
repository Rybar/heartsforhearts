var overlay = document.getElementById('modaloverlay');
var closer = document.getElementById('deactivate');
var modalGreeting = document.getElementById('donationGreeting');
var modalGreetingTransferButton = document.getElementById('greetingTransfer');
var modalCallToAction = document.getElementById('donationCallToAction');
var centerDonateButton = document.getElementById('centerDonate');

function activateoverlay() {
  overlay.setAttribute('aria-hidden', 'false');
  $("modaloverlay").css('height', '100%');
}
function closeoverlay() {
    modalGreeting.setAttribute('aria-hidden', 'false');
    modalCallToAction.setAttribute('aria-hidden', 'true');       
    overlay.setAttribute('aria-hidden', 'true');
}
function transferCallToAction() {
    modalGreeting.setAttribute('aria-hidden', 'true');
    modalCallToAction.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
}

	closer.addEventListener('click', closeoverlay);
	modalGreetingTransferButton.addEventListener('click', transferCallToAction);
	centerDonateButton.addEventListener('click', transferCallToAction);
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
