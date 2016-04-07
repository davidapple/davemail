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
        });
}

function loadDavemailAgain(davemail){
    var newDavemail = $.getJSON('davemail.json', function() {
        console.log('davemail.json loaded confirmation one');
    })
        .done(function(response) {
            console.log('davemail.json loaded confirmation two');
            if(_.isEqual(davemail.jsonData.responseJSON, response)){
                $('#usernameHeading').text(davemail.username);
                messagesPage();
                davemail.messages = mapMessages(davemail);
                buildMessagesTable(davemail);
            }else{

                // Tell user file has not beed replaced
                console.log('Hey, listen, you havent replaced the file dude.');
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
    $('#signIn').hide();
    $('#signUp').hide();
    $('#signUpReplace').hide();
    $('#navMessagesButton').show();
    $('#navMessagesButton').parent().addClass('active');
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
    $('#signUp').hide();
    $('#signUpReplace').hide();
    $('#navMessagesButton').hide();
    $('#navSignInButton').parent().addClass('active');
    $('#navMessagesButton').parent().removeClass('active');
    $('#navSignUpButton').parent().removeClass('active');
    $('#navSignInButton').show();
    $('#navSignUpButton').show();
    $('#navSignOutButton').hide();
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

function mapMessages(davemail){
    return _.map(davemail.jsonData.responseJSON.davemail.emails, function(num, key){
        var message = cryptico.decrypt(num.cipher, davemail.privateKey);
        if (message.status == 'success'){
            console.log(message);
            return [ num.time, message.plaintext ];
        }
    });
}

function buildMessagesTable(davemail){
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
}