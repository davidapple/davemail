# Davemail

Decentralised, deterministic RSA encrypted, anonymous, offline email for git. Using the git [distributed version control](https://en.wikipedia.org/wiki/Distributed_version_control#Distributed_vs._centralized) system for email.

## Mission Statement

Empowering you to take back your communication privacy.

## The Vision

`davemail.json` contains communications data (users and encypted emails).

The webapp facilitates user creation, email creation and brute force decryption - all offline.

The webapp updates `davemail.json`. Users can commit updates to this file to a shared git repsoitory.

Git repository owners takes responsibility for reducing spam by preventing users from committing too many emails too frequently.

Anonymity can be achieved within a git repository through sharing SSH keys. And communities can be managed by davemailing new git SSH keys to trusted users at regular intevals.

## Development
Originally created using [Yeoman Webapp Generator](https://github.com/yeoman/generator-webapp).

## Getting Started

- Run `npm install` to install Node Package Manager dependencies
- Run `bower install` to install frontend dependencies
- Run `gulp serve` to preview and watch for changes
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build
