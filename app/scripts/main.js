'use strict';

(function(){

    var $ = window.$;
    var openpgp = window.openpgp;

    openpgp.initWorker({ path:'openpgp.worker.min.js' }); // set the relative web worker path
    openpgp.config.aead_protect = true; // activate fast AES-GCM mode (experimental)

    var davemail = new Object();

    function signInPage(event){
        event.preventDefault();
        $('#signIn').show();
        $('#signUp').hide();
        $('#navSignInButton').parent().addClass('active');
        $('#navSignUpButton').parent().removeClass('active');
    }
    function signUpPage(event){
        event.preventDefault();
        $('#signUp').show();
        $('#signIn').hide();
        $('#navSignUpButton').parent().addClass('active');
        $('#navSignInButton').parent().removeClass('active');
    }

    $('#navSignInButton').click(function(event){
        signInPage(event);
    });
    $('#navSignUpButton').click(function(event){
        signUpPage(event);
    });

    $('#signInButton').click(function(){

        $('#signInButton').hide();
        $('#signingInLoader').show();

        davemail.username = $('#signInUsername').val();
        davemail.password = $('#signInPassword').val();

        console.log('Generating PGP key pair...');

        var options = {
            userIds: [{ username: '', email: '' }], // In Davemail, userIds is always blank
            numBits: 4096, // RSA key size
            passphrase: davemail.password
        };

        openpgp.generateKey(options).then(function(key) {
            davemail.privateKey = key.privateKeyArmored;
            davemail.publicKey = key.publicKeyArmored;
            console.log(davemail.privateKey);
            console.log(davemail.publicKey);

            $('#signingInLoader').hide();
            $('#signIn').hide();

        });

    });

})();
