Template.MeteorEngineInviteForm.events({
    'change #MEinviteForm': function(event,template){
        Meteor.subscribe('MEinvitations',null);
        checkUsername = function(un) {
            var count = MEinvites.find({username: un}).count();
            if(count){
                return un+0+(count+1);
            }else{
                return un;
            }
        }
        var config = Session.get('InviteConfig');
        var username;
        if(config.username.auto){
            if(config.firstname){
                username = $('#firstname').val();
            }
            if(config.lastname){
                username = username+$('#lastname').val().substring(0, 1);
            }
            if(username != ''){
                var un = username.replace(/\s+/g, '');

                $('#username').val(checkUsername(un))
            }
        }

    },
    'click .MEsendInvite': function(event,template){
        Meteor.subscribe('MEinvitations',null);

        validateEmail = function(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
        $('.errors').empty();
        $('.has-error').removeClass('has-error');

        var config = Session.get('InviteConfig')
        var data = {}
        var error;

        data.email = $('#email').val().replace(/\s+/g, '');
        var emailCount = MEinvites.find({email: data.email}).count();

        if(!validateEmail(data.email)){
            error = true;
            $('.errors').append("<div class='alert alert-info'>You must provide a valid email address.</div>")
            $('#email').addClass('has-error')
        }else{
            $('#email').addClass('has-success')
        }
        if(emailCount){
            error = true;
            $('.errors').append("<div class='alert alert-info'>An invitation for that email already exists.</div>")
            $('#email').addClass('has-error')
        }

        if(config.username){
            data.username = $('#username').val()
            if(config.username.required){
                if(data.username == ''){
                    error = true;
                    $('.errors').append("<div class='alert alert-info'>You must provide a username.</div>")
                    $('#username').addClass('has-error')
                }else{
                    $('#username').addClass('has-success')
                }
            }else{
                $('#username').addClass('has-success')
            }
        }

        if(config.firstname){
            data.firstname = $('#firstname').val()
            if(config.firstname.required){
                if(data.firstname == ''){
                    error = true;
                    $('.errors').append("<div class='alert alert-info'>You must provide a first name.</div>")
                    $('#firstname').addClass('has-error')
                }else{
                    $('#firstname').addClass('has-success')
                }
            }else{
                $('#firstname').addClass('has-success')
            }
        }
        if(config.lastname){
            data.lastname = $('#lastname').val()
            if(config.lastname.required){
                if(data.lastname == ''){
                    error = true;
                    $('.errors').append("<div class='alert alert-info'>You must provide a last name.</div>")
                    $('#lastname').addClass('has-error')
                }else{
                    $('#lastname').addClass('has-success')
                }
            }else{
                $('#lastname').addClass('has-success')
            }
        }
        if(config.phone){
            data.phone = $('#phone').val()
            if(config.phone.required){
                if(data.phone == ''){
                    error = true;
                    $('.errors').append("<div class='alert alert-info'>You must provide a phone number.</div>")
                    $('#phone').addClass('has-error')
                }else{
                    $('#phone').addClass('has-success')
                }
            }else{
                $('#phone').addClass('has-success')
            }
        }
        if(config.inviteRoles){
            data.role = $('#role').val()
            if(config.inviteRoles.required){
                if(data.role == '' || data.role == undefined){
                    error = true;
                    $('.errors').append("<div class='alert alert-info'>You must select a role.</div>")
                    $('#role').addClass('has-error')
                }else{
                    $('#role').addClass('has-success')
                }
            }else{
                $('#role').addClass('has-success')
            }
        }
        data.host = Meteor.userId()
        data.invited = moment().format('X')

        if(!error){

            Meteor.call('sendInvite',data,function(error,result){
                if(error){
                    console.log(error)
                }else{
                    if(!result){
                        $('.errors').append("<div class='alert alert-info'>A user already exists with that email.</div>")
                        //$('#email').addClass('has-error')
                    }else{
                        $('.MEinvite').val(''); $('#role').val('')
                    }
                }
            })
        }
    },
});
