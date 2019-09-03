import Vue from 'vue';

export default new Vue({
  render() {
    return (
      <div>
        <div id="vue-home" style="display: none;">
          skeleton-home
        </div>
        <div id="vue-home-about" style="display: none;">
          skeleton-about
        </div>
      </div>
    );
  },
});

// var pathname = window.location.pathname,
// hash = window.location.hash,
// skeletons = [
//   { id: "vue-home", el: document.querySelector("#vue-home") },
//   { id: "vue-home-about", el: document.querySelector("#vue-home-about") }
// ],
// isMatched = function (e, o) {
//   return "hash" === o ? e.test(hash.replace("#", "")) :"history" === o && e.test(pathname)
// },
// showSkeleton = function (e) {
//   for (var o = 0; o < skeletons.length; o++) {
//     var t = skeletons[o]; e === t.id ? t.el.style = "display:block;" : t.el.style = "display:none;"
//   }
// };
// isMatched(/^\/vue\/home(?:\/)?$/i, "history") ? showSkeleton("vue-home") :
// isMatched(/^\/vue\/home\/about(?:\/)?$/i, "history") && showSkeleton("vue-home-about");
