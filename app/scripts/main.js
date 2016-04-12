'use strict';

(function(){
    window.davemail = new Object();
    davemail.info = 'Davemail 1.0.0 by David Apple https://github.com/davidapple/davemail Donate Bitcoin to 13D3A8PP91MLF5VTBQMH5HG76F42RNRF28';

    // - Functions
    function loadDavemail(){
        return $.getJSON('davemail.json', function() {
            console.log('davemail.json loaded confirmation one');
        })
            .done(function() {
                console.log('davemail.json loaded confirmation two');
            })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log('davemail.json failed to load: ' + err );
                $('#signIn').hide();
                $('#importDavemail').show();
            });
    }

    function loadDavemailAgain(davemail){
        var newDavemail = $.getJSON('davemail.json', function() {
            console.log('davemail.json loaded confirmation one');
        })
            .done(function(response) {
                console.log('davemail.json loaded confirmation two');
                if(_.isEqual(davemail.jsonData.responseJSON, response)){
                    $('#signUpReplaceDownload').remove();
                    $('#signUpButton').show();
                    $('#signingUpLoader').hide();
                    $('#fileReplacedButton').show();
                    $('#fileReplacedLoader').hide();
                   $('#usernameHeading').text(davemail.username);
                    messagesPage();
                    davemail.messages = mapMessages(davemail);
                    buildMessagesTable(davemail);
                }else{
                    $('#fileNotReplacedWarning').show();
                    $('#fileReplacedLoader').hide();
                    $('#fileReplacedButton').show();
                }
            })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log('davemail.json failed to load: ' + err );
            });
    }

    function composeInit(davemail){
        $('#composeToList li').remove();
        var usersArray = _.map(davemail.jsonData.responseJSON.davemail.users, function(num, key){
            $('<li>').text(key).click(function(event){
                $('#composeTo').val(key);
                $('#composeTo').removeClass('invalid');
                $('#composePublicKey').val(num.publicKey);
                $('#composeToListWrapper').hide();
                $('#composeSendButton').show();
            }).appendTo('#composeToList');
            return key;
        });
        var filter = $('#composeTo'), clearfilter = $('input#clearfilter');
        $('#composeToList').listfilter({
            'filter': filter,
            'clearlink': clearfilter,
            'alternate': true,
            'alternateclass': 'other'
        });
        $('#composeTo').keyup(function(){
            if($('#composeTo').val().length > 0){
                $('#composeToListWrapper').show();
                if($('#composeToList li:visible').length == 0){
                    $('#composeToListWrapper').hide();
                }
                if(_.indexOf(usersArray, $('#composeTo').val()) == -1){
                    $('#composePublicKey').val('');
                    $('#composeSendButton').hide();
                }else{
                    $('#composePublicKey').val(davemail.jsonData.responseJSON.davemail.users[$('#composeTo').val()].publicKey);
                    $('#composeSendButton').show();
                }
            }else{
                $('#composeToListWrapper').hide();
            }
        }).focusout(function(){
            setTimeout(function (){
                if(_.indexOf(usersArray, $('#composeTo').val()) == -1){
                    $('#composeTo').addClass('invalid');
                }else{
                    $('#composeTo').removeClass('invalid');
                    $('#composeToListWrapper').hide();
                }
            }, 10);
        });
        $('#composePublicKeyButton').click(function(){
            if ($(this).prop('checked')){
                $('#composeShowPublicKey').show();
            }else{
                $('#composeShowPublicKey').hide();
            }
        });
    }

    function signInPage(event){
        if(_.isObject(event)){
            event.preventDefault();
        }
        $('#signIn').show();
        $('#signUp').hide();
        $('#messages').hide();
        $('#signUpReplace').hide();
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
        $('#compose').hide();
        $('#signIn').hide();
        $('#signUp').hide();
        $('#signUpReplace').hide();
        $('#navMessagesButton').show();
        $('#navMessagesButton').parent().addClass('active');
        $('#navComposeButton').show();
        $('#navComposeButton').parent().removeClass('active');
        $('#navSignInButton').parent().removeClass('active');
        $('#navSignUpButton').parent().removeClass('active');
        $('#navSignOutButton').show();
        $('#navSignInButton').hide();
        $('#navSignUpButton').hide();
        $('.jumbotron').hide();
    }
    function composePage(event){
        if(_.isObject(event)){
            event.preventDefault();
        }
        $('#messages').hide();
        $('#compose').show();
        $('#signIn').hide();
        $('#signUp').hide();
        $('#signUpReplace').hide();
        $('#navMessagesButton').show();
        $('#navMessagesButton').parent().removeClass('active');
        $('#navComposeButton').show();
        $('#navComposeButton').parent().addClass('active');
        $('#navSignInButton').parent().removeClass('active');
        $('#navSignUpButton').parent().removeClass('active');
        $('#navSignOutButton').show();
        $('#navSignInButton').hide();
        $('#navSignUpButton').hide();
        $('.jumbotron').hide();
    }
    function signOutPage(event){
        if(_.isObject(event)){
            event.preventDefault();
        }
        $('#signIn').show();
        $('#signInButton').show();
        $('#messages').hide();
        $('#compose').hide();
        $('#signUp').hide();
        $('#signUpReplace').hide();
        $('#navComposeButton').hide();
        $('#navMessagesButton').hide();
        $('#navSignInButton').parent().addClass('active');
        $('#navComposeButton').parent().removeClass('active');
        $('#navMessagesButton').parent().removeClass('active');
        $('#navSignUpButton').parent().removeClass('active');
        $('#navSignInButton').show();
        $('#navSignUpButton').show();
        $('#navSignOutButton').hide();
        $('#composeTo').val('');
        $('#composeTo').removeClass('invalid');
        $('#composePublicKey').val('');
        $('#composeShowPublicKey').hide();
        $('#composePublicKeyButton').attr('checked', false)
        $('.jumbotron').show();
    }
    function signOut(davemail){
        davemail.messagesTable.destroy();
        davemail.messagesTable = $('#messagesTable').DataTable({
            data: [],
            ordering: false,
            columns: [
                {title: "Time"},
                {title: "Message"}
            ]
        });
        davemail.username = undefined;
        davemail.password = undefined;
        davemail.passwordStrength = undefined;
        davemail.publicKey = undefined;
        davemail.privateKey = undefined;
        davemail.messages = undefined;
        return davemail;
    }
    function generateKeyPair(davemail){
        davemail.privateKey = cryptico.generateRSAKey(davemail.password, 1536);
        davemail.publicKey = cryptico.publicKeyString(davemail.privateKey);
        console.log(davemail.privateKey);
        console.log(davemail.publicKey);
        return davemail;
    }
    function encryptMessage(){
        var message = cryptico.encrypt($('#composeMessage').val(), $('#composePublicKey').val());
        return message;
    }

    function mapMessages(davemail){
        davemail.decryptedMessages = new Array();
        return _.map(davemail.jsonData.responseJSON.davemail.emails, function(num, key){
            var message = cryptico.decrypt(num.cipher, davemail.privateKey);
            if (message.status == 'success'){
                davemail.decryptedMessages.push([ num.time, message.plaintext ])
                return [ num.time, message.plaintext ];
            }
        });
    }

    function buildMessagesTable(davemail){
        if (!_.isUndefined(davemail.decryptedMessages[0])){
            davemail.messagesTable.destroy();
            davemail.messagesTable = $('#messagesTable').DataTable({
                data: davemail.decryptedMessages,
                ordering: false,
                columns: [
                    {title: "Time"},
                    {title: "Message"}
                ]
            });
        }
    }

    // - Application

    // Load davemail.json
    davemail.jsonData = loadDavemail();

    // Let users upload davemail.json if it fails to load
    $(document).on('change', '#importDavemailFile', function(event){
        var reader = new FileReader();
        $('#importDavemailButton').hide();
        $('#importingLoader').show();
        reader.onload = function(event){
            console.log('davemail.json loaded confirmation one');
            var jsonObj = JSON.parse(event.target.result);
            davemail.jsonData = new Object();
            davemail.jsonData.responseJSON = jsonObj;
            $('#signIn').show();
            $('#importDavemail').hide();
        }
        reader.readAsText(event.target.files[0]);
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
    $('#navComposeButton').click(function(event){
        composePage(event);
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

        if(davemail.passwordStrength.score < 4){
            setTimeout(function (){
                $('#passwordWarningSignIn').show();
                $('#signInButton').show();
                $('#signingInLoader').hide();
            }, 100);
        }else{
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
                davemail.messages = mapMessages(davemail);
                buildMessagesTable(davemail);
                composeInit(davemail);

            }, 10);
        }
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

            // TODO: Simplify this logic
            var usernameTaken = _.map(davemail.jsonData.responseJSON.davemail.users, function(num, key){
                if(davemail.username == key.toLowerCase()){
                    return true;
                }else{
                    return false;
                }
            });

            if(_.contains(usernameTaken, true)){
                $('#usernameTakenWarning').show();
                $('#passwordWarning').hide();
                usernameTaken = true;
            }else{
                usernameTaken = false;
            }

            var usernameLegal = /^[a-z0-9]*$/.test(davemail.username);

            if(!usernameLegal){
                $('#usernameIllegalWarning').show();
            }else{
                $('#usernameIllegalWarning').hide();
            }

            if(usernameLegal && (!usernameTaken) && davemail.passwordStrength.score > 3){
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
                    $('#signUpUsername').val('');
                    $('#signUpPassword').val('');
                    $('#signUp').hide();
                    $('#signUpReplace').show();
                    $('<a id="signUpReplaceDownload" class="btn btn-primary tailor-paisley" href="data:' + data + '" download="davemail.json">Right click here</a>').appendTo('#signUpDownload');

                    composeInit(davemail);

                }, 100);
                
            }else{
                if(davemail.passwordStrength.score < 4){
                    $('#passwordWarning').show();
                }
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

    $('#composeSendButton').click(function(){
        if(davemail.jsonData.responseJSON.davemail.users[$('#composeTo').val()].publicKey == $('#composePublicKey').val()){
            $(this).hide();
            $('#sendingLoader').show();
            var message = encryptMessage();
            console.log(message);
            if(message.status == 'success'){
                setTimeout(function (){
                    $('#composeTo').val('');
                    $('#composePublicKey').val('');
                    $('#composeMessage').val('');
                    $('#sendingLoader').hide();
                    $('#compose').hide();
                    $('#signUpReplace').show();

                    // Regenerate emails json
                    var date = new Date();
                    var users = davemail.jsonData.responseJSON.davemail.users;
                    var emails = davemail.jsonData.responseJSON.davemail.emails;
                    var servers = davemail.jsonData.responseJSON.davemail.servers;
                    emails.push({'time': date.toISOString(), 'cipher': message.cipher}); // Add user to users

                    davemail.jsonData.responseJSON = {'davemail': {'users': users, 'emails': emails, 'servers': servers}}; // Replace local json
                    $('#signUpJson').text(JSON.stringify(davemail.jsonData.responseJSON, null, 4));

                    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(davemail.jsonData.responseJSON, null, 4));
                    $('<a id="signUpReplaceDownload" class="btn btn-primary tailor-paisley" href="data:' + data + '" download="davemail.json">Right click here</a>').appendTo('#signUpDownload');

                }, 100);
            }
        }else{
            console.log('fail');
        }
    });

    $('#fileReplacedButton').click(function(){
        $('#fileReplacedButton').hide();
        $('#fileReplacedLoader').show();
        setTimeout(function (){
            loadDavemailAgain(davemail);
        }, 500);
    });

})();
