// adjust height of the articles.
//
// the text below an article might take multiple rows.
// in order to keep the articles's y position aligned I had to adjust the margin-top manually.
// in addition to the above, 'resize' event also change the number of rows of the text so I have to call the resize again.

(function () {
  var blog = [].slice.call(document.querySelectorAll('section.blog article'));
  var talks = [].slice.call(document.querySelectorAll('section.talks article'));

  window.addEventListener("resize", function() {
    adjust();
  });

  function adjust() {
    if (talks.length < blog.length) {
      talks.forEach(function (article, i) {
        adjustHeight(i);
      });
    } else {
      blog.forEach(function (article, i) {
        adjustHeight(i);
      });
    }
  }

  function adjustHeight(i) {
    var post = blog[i];
    var rect = post.getBoundingClientRect();
    var postHeight = rect.top;

    var talk = talks[i];
    rect = talk.getBoundingClientRect();
    var talkHeight = rect.top;

    var diff = postHeight - talkHeight;
    var marginTop = '';

    // positive - lower talk
    if (diff > 0) {
      marginTop = removePx(window.getComputedStyle(talk).marginTop);
      marginTop = parseInt(marginTop, 10); 
      talk.style.marginTop = marginTop + diff + 'px';
    } else if (diff < 0){
      // negative - lower blog
      marginTop = removePx(window.getComputedStyle(post).marginTop);
      marginTop = parseInt(marginTop, 10); 
      post.style.marginTop = marginTop - diff + 'px';
    }
  }

  function removePx(str) {
    return str.substr(0, str.length-2);
  }
})();


