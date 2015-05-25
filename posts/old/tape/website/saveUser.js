module.exports = function(user, cb) {
  // save user in DB. in the real scenario this will be an async call to your favorite db
  setTimeout(function() {
    console.log('user ' + user.name + ' was saved in the db');
    cb && cb(200);                                                                                                     
  });
};
