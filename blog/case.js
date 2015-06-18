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
