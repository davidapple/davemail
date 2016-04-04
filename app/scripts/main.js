'use strict';

(function(){

    window.zxcvbn = zxcvbn;
    window.davemail = new Object();
    davemail.info = 'Davemail 0.0.1 by David Apple https://github.com/davidapple/davemail Donate Bitcoin to 13D3A8PP91MLF5VTBQMH5HG76F42RNRF28';

    davemail.jsonData = $.getJSON('davemail.json', function() {
        console.log('davemail.json loaded confirmation one');
    })
        .done(function() {
            console.log('davemail.json loaded confirmation two');
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log('davemail.json failed to load: ' + err );
        });

    function signInPage(event){
        if(_.isObject(event)){
            event.preventDefault();
        }
        $('#signIn').show();
        $('#signUp').hide();
        $('#messages').hide();
        $('#navSignInButton').parent().addClass('active');
        $('#navSignUpButton').parent().removeClass('active');
        $('#navMessagesButton').parent().removeClass('active');
    }
    function signUpPage(event){
        if(_.isObject(event)){
            event.preventDefault();
        }
        $('#signUp').show();
        $('#signIn').hide();
        $('#messages').hide();
        $('#navSignUpButton').parent().addClass('active');
        $('#navSignInButton').parent().removeClass('active');
        $('#navMessagesButton').parent().removeClass('active');
    }
    function messagesPage(event){
        if(_.isObject(event)){
            event.preventDefault();
        }
        $('#messages').show();
        $('#signIn').hide();
        $('#signUp').hide();
        $('#navMessagesButton').show();
        $('#navMessagesButton').parent().addClass('active');
        $('#navSignInButton').parent().removeClass('active');
        $('#navSignUpButton').parent().removeClass('active');
        $('#navSignOutButton').show();
        $('#navSignInButton').hide();
        $('#navSignUpButton').hide();
    }
    function signOutPage(event){
        if(_.isObject(event)){
            event.preventDefault();
        }
        $('#signIn').show();
        $('#signInButton').show();
        $('#messages').hide();
        $('#signUp').hide();
        $('#navMessagesButton').hide();
        $('#navSignInButton').parent().addClass('active');
        $('#navMessagesButton').parent().removeClass('active');
        $('#navSignUpButton').parent().removeClass('active');
        $('#navSignInButton').show();
        $('#navSignUpButton').show();
        $('#navSignOutButton').hide();
    }
    function signOut(){
        davemail.username = undefined;
        davemail.password = undefined;
        davemail.publicKey = undefined;
        davemail.privateKey = undefined;
    }

    $('#navSignInButton').click(function(event){
        signInPage(event);
    });
    $('#navSignUpButton').click(function(event){
        signUpPage(event);
    });
    $('#navMessagesButton').click(function(event){
        messagesPage(event);
    });
    $('#navSignOutButton').click(function(event){
        signOutPage(event);
    });

    $('#signInButton').click(function(){

        $('#signInButton').hide();
        $('#signingInLoader').show();

        davemail.password = $('#signInPassword').val();

        console.log('Generating RSA key pair...');

        setTimeout(function (){
            davemail.privateKey = cryptico.generateRSAKey(davemail.password, 1536);
            davemail.publicKey = cryptico.publicKeyString(davemail.privateKey);
            console.log(davemail.privateKey);
            console.log(davemail.publicKey);

            _.map(davemail.jsonData.responseJSON.davemail.users, function(num, key){
                if(davemail.publicKey == num.publicKey){
                    $('#usernameHeading').text(key);
                    davemail.username = key;
                }
            });

            $('#signingInLoader').hide();
            $('#signIn').hide();
            $('#signInPassword').val('');

            messagesPage();

            davemail.messages = _.map(davemail.jsonData.responseJSON.davemail.emails, function(num, key){
                return [ num.time, num.cipher ];
            });

            $(document).ready(function() {
                $('#messagesTable').DataTable( {
                    data: davemail.messages,
                    columns: [
                        {title: "Time"},
                        {title: "Message"}
                    ]
                });
            });

        }, 1000);

    });

    $('#signUpButton').click(function(){

        davemail.password = $('#signUpPassword').val();
        davemail.passwordStrength = zxcvbn(davemail.password);

        if(davemail.passwordStrength.score > 3){
            $('#passwordWarning').hide();
            console.log('SUCCESS');
        }else{
            $('#passwordWarning').show();
            $('#passwordWarningText').text(davemail.passwordStrength.feedback.warning);
            var passwordSuggestions = $('#passwordSuggestionsText');
            passwordSuggestions.children().remove();
            $.each(davemail.passwordStrength.feedback.suggestions, function(i){
                var p = $('<p/>')
                    .appendTo(passwordSuggestions)
                    .text(davemail.passwordStrength.feedback.suggestions[i])
                    .appendTo(p);
            });
        }
    });

})();
