// function ready(fn) {
//   if (document.readyState != 'loading') {
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }
// 
// ready(run);
// 
// function run() {
//   var blogLink = document.querySelector('.blog-link');
//   var videosLink = document.querySelector('.videos-link');
//   var blog = document.querySelector('.blog');
//   var videos = document.querySelector('.videos');
// 
//   blogLink.addEventListener('click', showBlog);
//   videosLink.addEventListener('click', showVideos);
// 
//   function showBlog() {
//     blog.style.display = 'block';
//     videos.style.display = 'none';
//   }
// 
//   function showVideos() {
//     videos.style.display = 'block';
//     blog.style.display = 'none';
//   }
// }
//

var previousScroll = 0;
var headerOrgOffset = $('#header').height();

$('#header-wrap').height($('#header').height());

$(window).scroll(function () {
  var currentScroll = $(this).scrollTop();
  if (currentScroll > headerOrgOffset) {
    if (currentScroll > previousScroll) {
      $('#header-wrap').slideUp();
    } else {
      $('#header-wrap').slideDown();
    }
  } 
  previousScroll = currentScroll;
});
