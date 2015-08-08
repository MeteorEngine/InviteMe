Router.map(function() {
    this.route('MeteorEngineInvitation', {
        path: '/invitation/:token',
        data: function(){
            var templateData = {
                token: this.params.token
            }
            return templateData;
        }
    });
});
