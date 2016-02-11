book_contents = [
    "index.html",
    "preface.html",
    "intro.html",
    "ex0.html",
    "ex1.html",
    "ex2.html",
    "ex3.html",
    "ex4.html",
    "ex5.html",
    "ex6.html",
    "ex7.html",
    "ex8.html",
    "ex9.html",
    "ex10.html",
    "ex11.html",
    "ex12.html",
    "ex13.html",
    "ex14.html",
    "ex15.html",
    "ex16.html",
    "ex17.html",
    "ex18.html",
    "ex19.html",
    "ex20.html",
    "ex21.html",
    "ex22.html",
    "ex23.html",
    "ex24.html",
    "ex25.html",
    "ex26.html",
    "ex27.html",
    "ex28.html",
    "ex29.html",
    "ex30.html",
    "ex31.html",
    "ex32.html",
    "ex33.html",
    "ex34.html",
    "ex35.html",
    "ex36.html",
    "ex37.html",
    "ex38.html",
    "ex39.html",
    "ex40.html",
    "ex41.html",
    "ex42.html",
    "ex43.html",
    "ex44.html",
    "ex45.html",
    "ex46.html",
    "ex47.html",
    "ex48.html",
    "ex49.html",
    "ex50.html",
    "ex51.html",
    "ex52.html",
    "next.html",
    "advice.html",
    "appendixa.html",
    "appendix-a-cli/introduction.html",
]

// everyone who wrote javascript needs to die painfully. You didn't add an endsWith to String? 
// Who the fuck does that?  Dipshits.
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

cur_page = 0;

for(i = 0; i < book_contents.length; i++) {
    var url = book_contents[i];
    if(window.location.pathname.endsWith(url)) {
        cur_page = i;
        break;
    }
}

next_page = book_contents[(i + 1) % book_contents.length];
prev_page = book_contents[(i - 1) % book_contents.length];

if(prev_page == null) {
    prev_page = book_contents[book_contents.length - 1];
}

$('#next_link').attr('href', next_page);
$('#prev_link').attr('href', prev_page);


