'use strict';

(function(){

    // openpgp worker not working
    // openpgp.initWorker(); // set the relative web worker path

    openpgp.config.aead_protect = true; // activate fast AES-GCM mode (experimental)

    window.davemail = new Object();

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

        davemail.password = $('#signInPassword').val();

        console.log('Generating PGP key pair...');

        var options = {
            userIds: [{ username: '', email: '' }], // In Davemail, userIds is always blank
            numBits: 4096, // RSA key size
            passphrase: davemail.password
        };

        openpgp.generateKey(options).then(function(key) {
            davemail.privateKey = key.privateKeyArmored.replace(/\n/g, ' ');
            davemail.publicKey = key.publicKeyArmored.replace(/\n/g, ' ');

            // Map users from json file.
            // If the public PGP key exists, assume the username.

            davemail.publicKeySplit = new Array();

            _.map(davemail.publicKey.split(' '), function(num, key){
            	if(num.length == 60){
            		davemail.publicKeySplit.push(num);
            	}
            });

            console.log(davemail.publicKeySplit);

            _.map(davemail.jsonData.responseJSON.davemail.users, function(num, key){
            	var thisPublicKeySplit = new Array();
            	_.map(num.publicKey.split(' '), function(splitNum, splitKey){
            		if(splitNum.length == 60){
	            		thisPublicKeySplit.push(splitNum);
	            	}
	            });
            	console.log(thisPublicKeySplit);
            });

            $('#signingInLoader').hide();
            $('#signIn').hide();

        });

    });

})();
