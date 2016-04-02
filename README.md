## Davemail

Decentralisable, pgp encrypted email for git.

# The vision
The file `davemail.json` contains all of the registered Davemail users (usernames and public PGP keys) and timestamped encrypted emails.
The webapp should let people read and send emails easily without seeing anything to do with PGP encryption.
The webapp should add users and encrypted emails to `davemail.json`.
I recommend that the webapp deletes emails older than six months in the background to keep the file size under control.

Once a user has read and sent (added encrypted email data to `davemail.json`), they can use git to add, commit and push to a git repository. Or the webapp could do this? Or the user could have a daemon running to do this?

Multiple public git repositories can be used as Davemail nodes and it will become decentralised.

## Tech stuff
Originally created using [Yeoman Webapp Generator](https://github.com/yeoman/generator-webapp).

## Getting Started

- Run `npm install` to install Node Package Manager dependencies
- Run `bower install` to install frontend dependencies
- Run `gulp serve` to preview and watch for changes
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build your webapp for production
- Run `gulp serve:dist` to preview the production build
