# Davemail

<img src="https://raw.githubusercontent.com/davidapple/davemail/master/app/images/davemail.png" height="200">

Decentralised, encrypted, anonymous, offline messaging platform for git. Using the git [distributed version control](https://en.wikipedia.org/wiki/Distributed_version_control#Distributed_vs._centralized) system for encrypted messaging.

## Mission Statement

Empowering you to take back your communication privacy.

## SMTP email problems

[SMTP email](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) is one of the oldest technologies on the internet. Emails are sent in plain text accross the internet so anyone listening in can read them. [Edward Snowden](https://en.wikipedia.org/wiki/Edward_Snowden) has revealed that the largest email platforms in the world are in league with government spies with little regard for the fundamental right to privacy, recognized in the UN Declaration of Human Rights.

## PGP encryption problems

[Pretty Good Privacy (PGP)](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) is a solution to some of the problems with SMTP email as the email body is encrypted. However the PGP key pair is created [nondeterministically](https://en.wikipedia.org/wiki/Nondeterministic_algorithm) so the private key must be saved and stored securely in order to decrypted messages. The email metadata (sender, recievers, subject, time) is still prone to interception and mass survailance.

## RSA Encrypted Davemail

Davemail is an alternative to SMTP email. Data is stored in json format with user data separated from the encrypted message data. The json data is open source and decentralised using [git](https://en.wikipedia.org/wiki/Git_(software)) but it is impossible for anyone to deduce which encrypted message was sent to or from which users (unless you hold the key to messages sent to you).

RSA keys are generated [deterministically](https://en.wikipedia.org/wiki/Deterministic_algorithm) so it is possible to restore long private keys using a strong and memorable passphrase. No need to save and secure a private key on a local machine.

The Davemail application makes reading and sending encrypted messages easy, hiding the encryption process to improve the user experience. The Davemail application also works offline, so your passphrase can be protected from hackers using keyloggers or screen capture attacks.

<img src="https://raw.githubusercontent.com/davidapple/davemail/master/app/images/davemail-login.jpg" height="300">

## Decentralisation and anonymity

This git repository can be cloned and hosted on any computer connected to the internet. SSH access details to these git repositories can be published in the json file, anonymising users. Git repository owners can take responsibility for reducing spam by limiting the frequency of commits.

## Example davemail.json file

```
{
    "davemail": {
        "users": {
            "davidapple": {
                "publicKey": "b8swlmHX6fsc1lSMRjXOqQoYjGf/vtu0wEy4TKudKtpDJ9MzYlg+V1OCpNFZEKq22sYGHjvazxLqy9ugz4nhVAmAMmuYFRukMW1OcNzjdCEu4sno5hUPoSHr0cJb4T2rQl7Tc1dThJmpCbE9NRPA1FZx5XVMhCmiOBTwU+pW0l6BBj+jl2nFeyndknwL/WdN47UEj4Um5yfx/5+I/LS4EIUlme1fkEYe5XjCaM3zFN1UFUw4nDih4MUKrjEE7n2/"
            },
            "tinyi": {
                "publicKey": "nQOZN7PF0Qr5to0xpF6iWGGRU0Yqm4S/0OZVjkx4dldg6+XlxzeJNYQheTh/CTaqiRzVxyUCEekcsVxabGtx9K6xEIVRFP2okGOXYu7zJMKQHf25hW4nWLS/34DJRTibxkq1VzgJ6nlVMwOdUjr0sgqK6vI3X7iEyBKe76I0m610Y2q9hvxNOg+MBQ64dJjdx2wCF9LitxGXy1DaQCa420RE86sHwK9yMrH3mNVRqGmVRX5KkeS2QhHdXwoe4bxV"
            }
        },
        "emails": [
            {
                "time": "2016-04-11T09:48:41.751Z",
                "cipher": "Wn/Oj5fSf+IRPwYYjazM2tpOzRPe81memxXSPqmSGx4eXZkIzVsoPnaMohwTLga8hVNvV6GJan+ZroiDDjD8Kw9MoP+zULmTE1PoI27p/qgSMKBHf7S8mTOvpm5+CzaMjfQhqJ6DcRibnQSQgfKLjn06QjtHt2v9qD0hlKODLrhhVy5m8ShgEHI6/TOyXW3/w/y0NZStPVY8gCJNO1F+zlMsX9QhRYV7XZ8TCExkLdsB3lO6iG7RhxMflb/iMukm?TuyIKKX1YcSQlTQhCOhjxhR2jwjhDD/Z16/xR1lzlg/CjrzbMlsF/p0HoOBZTEcU8Jq+vZ6u/P0I/x20v99P3A=="
            },
            {
                "time": "2016-04-11T09:52:22.194Z",
                "cipher": "hltRGEkeFR7zWubXdIspvJtte+/cGHmBnhGvM8U8roTeYA86GuyfVSFDEXhCwipxPtAM0jJmrFpLHBY/51QOf+uHjNxMBxMob+NOme8kiiw3plJeD1Tqv/MwoDWzhA8TQRxvdUPAEjo1BC1wVLFgra30Aw3sblL7UYQnPjcXPDdwFLcRZ+HbMdCqYf3z1fdXvEv7LEoYwSkVivGmdJ520MmVpPzcC+WqXv9I/GuU8oau3CYKJEotZklCIVz0j/u+?NbANPCDdSQvC4HpNXEzZo3HlAAhaxcOlSlkO19x5a3WbOTscl0aYkeXiAdkv5XK2xXPk+uPpwQWOl0ucO4eyDQ=="
            }
        ],
        "servers": [
            {
                "ssh": "git@github.com:davidapple/davemail.git",
                "username": "anonymous",
                "password": "example",
                "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCB007n/ww+ouN4gSLKssMxXnBOvf9LGt4LojG6rs6hPB09j9R/T17/x4lhJA0F3FR1rP6kYBRsWj2aThGw6HXLm9/5zytK6Ztg3RPKK+4kYjh6541NYsnEAZuXz0jTTyAUfrtU3Z5E003C4oxOj6H0rfIF1kKI9MAQLMdpGW1GYEIgS9EzSdfd8AcCIicTDWbqLAcU4UpkaX8KyGlLwsNuuGztobF8m72ALC/nLF6JLtPofwFBlgc+myivO7TCUSBdLQlgMVOFq1I2uPWQOkOWQAHukEOmfjy2jctxSDBQ220ymjaNsHT4kgtZg2AYYgPqdAv8JggJICUvax2T9va5 gsg-keypair"
            }
        ]
    }
}
```

## Development
Originally created using [Yeoman Webapp Generator](https://github.com/yeoman/generator-webapp).

## Getting Started

- Run `npm install` to install Node Package Manager dependencies
- Run `bower install` to install frontend dependencies
- Run `gulp serve` to preview and watch for changes
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build
