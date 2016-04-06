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
        davemail = signOut(davemail);
    });
    $('#signUpButtonOnSignIn').click(function(event){
        signUpPage(event);
    });

    davemail.messagesTable = $('#messagesTable').DataTable({
        data: [],
        ordering: false,
        columns: [
            {title: "Time"},
            {title: "Message"}
        ]
    });

    $('#signInButton').click(function(){

        $('#signInButton').hide();
        $('#signingInLoader').show();

        davemail.password = $('#signInPassword').val();
        davemail.passwordStrength = zxcvbn(davemail.password);

        setTimeout(function (){
            davemail = generateKeyPair(davemail);

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
                var message = cryptico.decrypt(num.cipher, davemail.privateKey);
                if (message.status == 'success'){
                    console.log(message);
                    return [ num.time, message.plaintext ];
                }
            });

            if (!_.isUndefined(davemail.messages[0])){
                davemail.messagesTable.destroy();
                davemail.messagesTable = $('#messagesTable').DataTable({
                    data: davemail.messages,
                    ordering: false,
                    columns: [
                        {title: "Time"},
                        {title: "Message"}
                    ]
                });
            }

        }, 10);

    });

    $('#signUpButton').click(function(){

        $('#signUpUsername').val($('#signUpUsername').val().toLowerCase());
        davemail.username = $('#signUpUsername').val();
        davemail.password = $('#signUpPassword').val();
        davemail.passwordStrength = zxcvbn(davemail.password);

        $('#usernameTakenWarning').hide();
        $('#passwordWarning').hide();

        if(davemail.username.length > 0){
            $('#usernameEmptyWarning').hide();

            var usernameUnique = _.map(davemail.jsonData.responseJSON.davemail.users, function(num, key){
                if(davemail.username == key.toLowerCase()){
                    $('#usernameTakenWarning').show();
                    return false;
                }else{
                    return true;
                }
            });

            if(usernameUnique && davemail.passwordStrength.score > 3){
                $('#passwordWarning').hide();
                $('#signUpButton').hide();
                $('#signingUpLoader').show();

                setTimeout(function (){
                    davemail = generateKeyPair(davemail);

                    // Regenerate users json
                    var users = davemail.jsonData.responseJSON.davemail.users;
                    var emails = davemail.jsonData.responseJSON.davemail.emails;
                    var servers = davemail.jsonData.responseJSON.davemail.servers;
                    users[davemail.username] = {'publicKey': davemail.publicKey}; // Add user to users

                    davemail.jsonData.responseJSON = {'davemail': {'users': users, 'emails': emails, 'servers': servers}}; // Replace local json
                    $('#signUpJson').text(JSON.stringify(davemail.jsonData.responseJSON, null, 4));

                    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(davemail.jsonData.responseJSON, null, 4));

                    $('<p>You need to overwrite your davemail.json file. You can <a href="data:' + data + '" download="davemail.json">right click here and select "save as&hellip;"</a> or copy the text below and replace it in a text editor.</p>').appendTo('#signUpDownload');

                }, 100);
                
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
        }else{
            $('#usernameEmptyWarning').show();
        }
    });

})();
