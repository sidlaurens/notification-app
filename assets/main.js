// The notifications below are designed to alert a Zendesk agent of pertinent
// information related to his assigned tickets.  They are tied to respective
// Zendesk triggers to allow notifications ONLY to that agent's account.
$(function() {
  var client = ZAFClient.init();
  client.on('app.registered', () => {
    client.invoke('resize', { width: '300', height: '100' });
  });
  
  // Notify new ticket assignment.
  client.on("api_notification.new_assignee", function(dataAssignee) {
    client.invoke('notify', dataAssignee.body, 'alert', {sticky: true})
  });
  // Notify ticket update overdue.
  client.on("api_notification.update_overdue", function(dataOverdue) {
    client.invoke('notify', dataOverdue.body, 'alert', {sticky: true})
  });
  // Notify ticket updated with new comment.
  client.on("api_notification.comment_update", function(dataComment) {
    client.invoke('notify', dataComment.body, 'alert', 15000)
  });
  // Notify a solved ticket has been reopened.
  client.on("api_notification.ticket_reopened", function(dataReopened) {
    client.invoke('notify', dataReopened.body, 'alert', 15000)
  });
});
