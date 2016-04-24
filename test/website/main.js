$(document).ready(function(){
  // unchecks contact me checkbox if it is automatically selected on page load (cached)
  if ($('#contact-me').is(':checked')) {
    $('#contact-me').removeAttr('checked');
    $('#continue-button').attr('disabled','true');
  }

  // bind action to continue button (only will fire if the button is disabled)
  $('#continue-button').click(function() {
    window.location = 'signup';
  });

  // disabled or enables continue button depending on contact me checkbox
  $('#contact-me').click(function() {
    if ($('#contact-me').is(':checked')) {
      $('#continue-button').removeAttr('disabled');
    } else {
      $('#continue-button').attr('disabled','true');
    }
  });
});

