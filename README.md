In the repo you'll find 2 scripts:
- `fb-bot.js` can log in to the full version of the facebook (https://facebook.com)
but it is written for `phantomjs`. Actually you can not just HTTP GET and POST with
ordinary functions to login to facebook.com, 'cause it uses javascripts to set up cookies
for login session
- `mbasic-fb-bot` can log in to https://mbasic.facebook.com using ordinary
node.js - it is possible, because this version does not use javascripts at all!
It's like ordinary facebook website, but optimised for old mobile devices

Both versions need:
- `cookies.json` - empty file at the same dir as scripts
- `login.json` - file with your facebook.com email
and password at the same dir as scripts


Sample `login.json` file:
```json
{
    "email": "your@cool.email",
    "pass": "you123pass456word"
}
```

Running scripts with npm (full version requires phantomjs in the PATH):
```
$ npm run full
$ npm run basic
```


### KEEP IN MIND THAT CRAWLING FACEBOOK.COM IS ILLEGAL AND THESE SCRIPTS CAN BE USED ONLY FOR EDUCATIONAL PURPOSES

