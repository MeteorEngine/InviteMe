Package.describe({
    name: 'meteorengine:inviteme',
    version: '0.0.6',
    // Brief, one-line summary of the package.
    summary: 'An account invitation management system for Meteor.',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/MeteorEngine/inviteme',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    //documentation: 'https://github.com/MeteorEngine/inviteme/blob/master/README.md'
});

Package.onUse(function(api) {
    api.use("templating", "client");
    api.use("email@1.0.6", "server");
    api.use("iron:router@1.0.9", ["client","server"]);
    api.use("alanning:roles@1.2.13", ["client","server"]);
    api.use("momentjs:moment@2.10.0", 'client');

    api.versionsFrom('1.1.0.3');

    api.addFiles('server/inviteme.js',['server']);
    api.addFiles('lib/collection.js',['client','server']);
    api.addFiles('lib/invite-router.js',['client','server']);
    api.addFiles('client/startup.js','client');
    api.addFiles('client/form.html','client');
    api.addFiles('client/form.js','client');
    api.addFiles('client/hub.html','client');
    api.addFiles('client/hub.js','client');
    api.addFiles('client/invitation.html','client');
    api.addFiles('client/invitation.js','client');



    api.export('InviteMe',['server']);
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('meteorengine:inviteme');
    api.addFiles('inviteme-tests.js');
});
