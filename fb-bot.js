var fs = require('fs');
var page = require('webpage').create();

// we'll load your `email` and `pass` into this obj
var login = JSON.parse(fs.read('./login.json'));

var COOKIES_FILE = './cookies.json';
page.cookies = JSON.parse(fs.read(COOKIES_FILE) || '{}');
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36'
    + ' (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';

//

page.onLoadFinished = function () {
    if (page.title === 'Log into Facebook | Facebook') {
        console.log('Performing log in...');

        //
        page.evaluate(function (email, pass) {
            var form = document.getElementById("login_form");
            form.elements['email'].value = email;
            form.elements['pass'].value = pass;
            form.submit();
        }, login.email, login.pass);
    } else {
        console.log('We\'ve logged in! Saving cookies and page... ');

        //
        fs.write(COOKIES_FILE, JSON.stringify(page.cookies));
        page.render('./page.png');
        phantom.exit();
    }
};

//

page.open('https://facebook.com/login.php');
