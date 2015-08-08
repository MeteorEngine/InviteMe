Meteor.startup(function(){
    InviteMe = {}

    InviteMe.config = {}
    this.InviteMe = InviteMe;



})


Meteor.methods({
    'emailInvitation': function(data){
        var content = InviteMe.config.emailContent
        var text = '';
        if(data.firstname){
            text += 'Dear '+data.firstname+', \n \n'
        }else{
            text += 'Hello! \n \n'
        }
        text += content.message;
        text += '\n\n Click here to get started: <a href="'+content.website+'/invitation/'+data.token+'>setup account</a>"'

        var options = {
            from: "David Ryan Speer <david@davidryanspeer.com>",
            to: data.email,
            subject: 'Welcome to '+content.organization,
            text: text,
            headers: "Content-Type: text/html; charset=ISO-8859-1\r\n"
        }
        this.unblock()
        Email.send(options)
    },
    'getConfig': function(item){
        if(item){
            return InviteMe.config[item]
        }else{
            return InviteMe.config
        }
    },
    'sendInvite': function(data){
        var count = 0;
        count += Meteor.users.find({username: data.username}).count();
        count += Meteor.users.find({emails: { $elemMatch: { address: data.email }}}).count();
        if(count){
            return false;
        }else{
            var token = Math.random().toString(36).slice(-8);
            data.token = token;
            Meteor.call('emailInvitation',data)
            var uid = MEinvites.insert(data);
            return uid;
        }
    },
    'MErescindInvite': function(id){
        MEinvites.remove(id)
    },
    'MEaddUserRole': function(user){
        var user = Meteor.users.findOne(user);
        Roles.addUsersToRoles(user._id,user.profile.invite.role)
    }
})

Meteor.publish('MEinvitations',function(token){
    if(token){
        return MEinvites.find({token: token})
    }else{
        return MEinvites.find()
    }
    //return MEinvites.find()
})
