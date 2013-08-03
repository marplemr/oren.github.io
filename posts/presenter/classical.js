'use strict';
/*jslint node: true */

var jade = require('jade');

var UserPresenter = function (data) {
    this.data = data;
};

UserPresenter.prototype = {
    name: function() {
        return this.data.name;
    },

    title: function() {
        return this.data.title;
    }
};

var user = new UserPresenter({ name: 'josh', title: 'Sir' });
var html = jade.renderFile('index2.jade', { user: user });

console.log(html);
