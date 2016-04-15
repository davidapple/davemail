# Davemail

<img src="https://raw.githubusercontent.com/davidapple/davemail/master/app/images/davemail.png" height="200">

Decentralised, encrypted, anonymous, offline messaging platform for git. Using the git [distributed version control](https://en.wikipedia.org/wiki/Distributed_version_control#Distributed_vs._centralized) system for encrypted messaging.

## Mission Statement

Empowering you to take back your communication privacy.

## SMTP email problems

[SMTP email](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) is one of the oldest technologies on the internet. Emails are sent in plain text accross the internet so anyone listening in can read them. [Edward Snowden](https://en.wikipedia.org/wiki/Edward_Snowden) has revealed that the largest email platforms in the world are in league with government spies with little regard for the fundamental right to privacy, recognized in the UN Declaration of Human Rights.

## PGP problems

[Pretty Good Privacy (PGP)](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) is a solution to some of the problems with SMTP email as the email body is encrypted. However the PGP key pair is created [nondeterministically](https://en.wikipedia.org/wiki/Nondeterministic_algorithm) so the private key must be saved and stored securely in order to decrypted messages. The email metadata (sender, recievers, subject, time) is still prone to interception and mass survailance.

## RSA Encrypted Davemail

Davemail is an alternative to SMTP email. Data is stored in json format with user data separated from the encrypted message data. The json data is open source and decentralised using [git](https://en.wikipedia.org/wiki/Git_(software)) but it is impossible for anyone to deduce which encrypted message was sent to or from which users (unless you hold the key to messages sent to you).

RSA keys are generated [deterministically](https://en.wikipedia.org/wiki/Deterministic_algorithm) so it is possible to restore long private keys using a strong and memorable passphrase. No need to save and secure a private key on a local machine.

The Davemail application makes reading and sending encrypted messages easy, hiding the encryption process to improve the user experience. The Davemail application also works offline, so your passphrase can be protected from hackers using keyloggers or screen capture attacks.

## Decentralisation and anonymity

This git repository can be cloned and hosted on any computer connected to the internet. SSH access details to these git repositories can be published in the json file, anonymising users.

Git repository owners can take responsibility for reducing spam by limiting the frequency of commits.

## Development
Originally created using [Yeoman Webapp Generator](https://github.com/yeoman/generator-webapp).

## Getting Started

- Run `npm install` to install Node Package Manager dependencies
- Run `bower install` to install frontend dependencies
- Run `gulp serve` to preview and watch for changes
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build
