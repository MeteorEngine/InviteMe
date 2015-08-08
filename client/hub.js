Template.MeteorEnginePendingInvites.helpers({
    'invitations': function(){
        Meteor.subscribe('MEinvitations',null);
        return MEinvites.find({},{sort: {invited: -1}})
    }
})
Template.MeteorEnginePendingInvites.events({
    'click .rescindInvite': function(event,template){
        var id = $(event.target).attr('id')
        Meteor.call('MErescindInvite',id)
    },
})
