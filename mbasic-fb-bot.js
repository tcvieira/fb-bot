// this script demonstrates log in to
// mbasic vesion of facebook
// if you do want to login in to full
// or mobile version - use headless browser
// like phantomjs (see fb-bot.js)

var fs = require('fs');
var rp = require('request-promise');
var cheerio = require('cheerio');
var FileCookieStore = require('tough-cookie-filestore');

// we'll load your `email` and `pass` into this obj
var login = require('./login.json');

// this is `basic` version of the facebook.com wesite
// it does not use javascripts at all
// so we can use just http request to get data
// from it and login

// in contrast `full` and `m` versions
// use javascripts to set cookies during login
// so it you need to use headless browser
// to perform login
var FB_URL = 'https://mbasic.facebook.com';

// here we set file cookie store, so we
// we'll be able to save our logged in session to file
// we also set mobile-like headers
rp = rp.defaults({
    jar: rp.jar(new FileCookieStore('./cookies.json')),
    followRedirect: true,
    maxRedirects: 10,
    simple: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; U; Android 2.3.3;' +
        ' zh-tw; HTC_Pyramid Build/GRI40) AppleWebKit/533.1' +
        ' (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
    }
});

// ok, let's do this!
rp(FB_URL + '/login.php')
    .then(function (body) {

        // parse html code with cheerio
        // so we'll be able to get tags
        var $ = cheerio.load(body);

        // check, maybe we've loaded cookies
        // and we've already logged in

        // #search_div is at the bottom
        // of each logged in page of the facebook.com
        if (!$('#login_form') && $('#search_div')) {
            console.log('You\'ve already logged in!');
            console.log('Saving page...');

            fs.writeFileSync('./page.html', body);
            return Promise.resolve();
        }


        // now we need to fill in login form
        // with email and pass
        // adn submit it
        console.log('Performing log in...');
        return rp.post({
            url: $('#login_form').attr('action'),
            form: {
                email: login.email,
                pass: login.pass
            }
        });
    })
    .then(function (body) {

        // ok, now that we logged in
        // let's try to get data again
        return rp(FB_URL);
    })
    .then(function (body) {
        console.log('Saving page...');
        fs.writeFileSync('./page.html', body);

        return Promise.resolve();
    });
