MeteorEngine:InviteMe
===================
An account invitation management system for Meteor.

----------
##ABOUT

InviteMe allows users from a set role to invite guests by email through a simple form. Settings allow you to select which roles can invite and which profile fields are required or optional.

New users are invited via email with a link & preassigned token. Once the user clicks the link and completes the form the Meteor.users account is created and the new user is logged in.

> **Note:**

> InviteMe is still in it's early phases. Please use this only in development environments until our first stable version is released.

----------

##  TO-DO
* Validate Phone Numbers
* Allow Custom Fields
* Set hostRole via array of roles or array of userIds
* Add support for additional routers

----------

##INSTALLATION
Install the package:
> meteor add meteorengine:inviteme

----------

## SETUP
#### <i class="icon-mail"></i>EMAIL
InviteMe users the [Meteor's email package](http://docs.meteor.com/#/full/email). You must setup your process.env.MAIL_URL:
> process.env.MAIL_URL = "smtp://USERNAME:PASSWORD@HOST:PORT/"

#### <i class="icon-user"></i>ROLES
This package assumes you have created some roles for your users using the [alanning:roles](https://atmospherejs.com/alanning/roles) package. You should have at least one user with the hostRoles specified below.

> Future releases will allow you to define admin users by userId.

#### <i class="icon-cog"></i>ROUTE
InviteMe also uses the [iron:router](https://atmospherejs.com/iron/router) package. Currently this is the only supported router.

#### <i class="icon-cog"></i>CONFIGURATION

Include the InviteMe "hub" in one of your templates:

    {{>MeteorEngineInvitationHub}}
>You should include this template in a non-public route.

In your Meteor.startup code create some basic settings:

#####MINIMUM CONFIGURATION:

    InviteMe.config = ({
		hostRoles: 'adminRole',
	    emailContent: {
	        website: 'www.mywebsite.org'
	    },
	    signUp: {
	        redirectRoute: 'exampleRoute'
	    }
    });

####hostRoles

    hostRoles: 'role'
>**hostRoles is required*

A specified role allowed to invite others.
This currently only accepts a single role. Future rollouts will allow for an array of roles or an array of user ids.

####signUp
    signUp: {
	    redirectRoute: 'route'
	}
>**redirectRoute is required*

An object containing settings when a user is accepting an invitation.

* redirectRoute **required*
	* a route to redirect the user to after they've accepted the invitation

####emailContent
    emailContent: {
	    website: 'siteURL',
	    organization: 'organization name',
	    message: 'A custom welcome message'
	}
>**website is required*

An object containing settings when a user is accepting an invitation.

* website **required*
	* this is the root url to your website
* organization
	* an optional name for your organization. This will appear in the email subject line.
* message
	* an optional custom message for the invitation email.

####email

    email: {
	    modify: false
	}

An object containing information about the email field.
Email is *always* required.

* modify
	* boolean
	* specifies whether the invited user can change their email when completing the signup form
	*
####username

    username: {
	    modify: false,
	    auto: true,
	    required: false
	}

An object containing information about the username field.

* modify
	* boolean
	* specifies whether the invited user can change their username when completing the signup form
* auto
	* boolean
	* specifies whether the username is auto-generated or not
	* if set to "true" you must also enable firstname and lastname below
* required
	* boolean
	* specifies whether the username field is required when sending an invitation

####inviteRoles

    inviteRoles : {
	    roles: ['role1','role2','role3'],
	    required: false,
	    modify: false
	}

An object containing information about pre-set roles that appear in the invitation form.
This allows admins to pre-assign the role of a new user when inviting them to the sign up.

* roles
	* an Array of roles
* required
	* boolean
	* specifies whether or not a role is required or optional
* modify
	* boolean
	* specifies whether the invited user can change their role when completing the signup form

####firstname

    firstname: {
	    required: false,
	    modify: false
	}

An object containing information about the firstname field.

* required
	* boolean
	* specifies whether or not a firstname is required or optional
* modify
	* boolean
	* specifies whether the invited user can change their firstname when completing the signup form

####lastname

    lastname: {
	    required: false,
	    modify: false
	}

An object containing information about the lastname field.

* required
	* boolean
	* specifies whether or not a lastnameis required or optional
* modify
	* boolean
	* specifies whether the invited user can change their lastname when completing the signup form

####phone

    phone: {
	    required: false,
	    modify: false
	}

An object containing information about the phone field.

* required
	* boolean
	* specifies whether or not a phone is required or optional
* modify
	* boolean
	* specifies whether the invited user can change their phone when completing the signup form
