Meteor.startup(function(){
    Meteor.call('getConfig',null,function(err,res){
        if(err){
            console.log(err)
        }else{
            Session.set('InviteConfig',res);
        }
    });
    Handlebars.registerHelper('MEInviteSettings', function () {
        var invite = Session.get('InviteConfig');
        if(invite){
            return invite
        }
    });
})
