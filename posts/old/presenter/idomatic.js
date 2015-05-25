'use strict';
/*jslint node: true */

var jade = require('jade');

function userPresenter(data) {
    function name() {
        return data.name;
    }

    function title() {
        return data.title;
    }

    return {
        name: name,
        title: title
    };
}

var user = userPresenter({ name: 'josh', title: 'Sir' });
var html = jade.renderFile('index2.jade', { user: user });

console.log(html);
