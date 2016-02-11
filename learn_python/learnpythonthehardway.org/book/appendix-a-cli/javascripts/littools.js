
function id_paragraphs() {
    $each($all('p'), function (p, i) {
         p.id = 'p' + i.toString();
    });

}

$boot(id_paragraphs);
