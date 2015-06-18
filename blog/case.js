I would like to re-write this function and make it more idiomatic js.
Sorella on the irc chat told me to use dynamic dispatch:

> so you have that in your send function, but then you've got this if (data.whatever) { send(whatever) } blocks, where instead of letting JS figure out the right operation for you, you're doing the job yourself and selecting which operation should run based on some predicates

// version 1
function sendNotification (soId, data) {
  var header;

  // Adverse Event Notification
  if (data.adverseEvent) {
    getEmails(soId, SANGRE_ADVERSE_EVENT).then(function(emails){
      header = templates.adverseEventNotification('foo@test.com', emails);
      sendEmail(header);
    });

    return;
  }

  // No Show Event Notification
  // WARNING: This is the same 'Incomplete' value being sent on Unsuccessful Draw
  // If we ever need to send an email checking that status things may break =[
  if (data.Incomplete_Draw_Explanation__c === 'Donor No Show') {

    return;
  }

  // Unsuccessful Draw Notification
  // WARNING: This is the same 'Incomplete' value being sent on No Show
  // If we ever need to send an email checking that status things may break =[
  if (data.serp__Status__c === 'Incomplete') {

    return;
  }

  // Successful Draw Notification
  if(data.serp__Status__c === 'Pending/In Transit') {
    return;
  }

  // No Event
  return;
}

// version 2: dynamic dispatch

var data = {fooo baraueaeou ueaoueo}

var emailManagers = {
  handle: function(){ email rebbeka }
};

var emailDoctors = {
  handle: function(){ email rebbeka }
};

var emailDoctors = {
  handle: function(){ email rebbeka }
};

var emailSponsor = { some data from the mobile app };
var send = function(ev){ ev.handle() };

send(

if (date.adverseEvent) {
  send(emailManagers);
  return;
}

if (data.important) {
  send(emailSponsor);
  return;
}

if (!data.foobar) {
  send(emailDoctors);
  return;
}

He didn't elaborate about the exact way to implement it. I think I am not suppose to use the if statements above but I am not sure how to refactor it. any suggestions?
