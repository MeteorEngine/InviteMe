Template.MeteorEngineInvitation.helpers({
    'token': function(){
        return this.token;
    },
    'invite': function(){
        Meteor.subscribe('MEinvitations',this.token);
        return MEinvites.findOne({token: this.token})
    }
})
Template.MeteorEngineInvitation.events({
    'click .completeSetup': function(event,template){
        var config = Session.get('InviteConfig')
        var options = {}
        var profile = {}
        profile.invite = MEinvites.findOne({token: this.token})
        options.password = $('#password').val();
        options.email = $('#email').val();
        if(config.username){
            options.username = $('#username').val();
        }
        if(config.firstname){
            profile.firstname = $('#firstname').val();
        }
        if(config.lastname){
            profile.lastname = $('#lastname').val();
        }
        if(config.phone){
            profile.phone = $('#phone').val();
        }

        options.profile = profile;

        Accounts.createUser(options,function(error,success){
            if(error){
                $('.errors').append("<div class='alert alert-info'>"+error+"</div>")
            }else{
                Router.go(config.signUp.redirectRoute)
            }
        })
        Meteor.call('MErescindInvite',profile.invite._id);
    },
})
