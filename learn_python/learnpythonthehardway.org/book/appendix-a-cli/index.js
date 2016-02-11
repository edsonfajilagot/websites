book_contents = [
    "introduction.html",
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
    "next.html",
    "../index-2.html",
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


