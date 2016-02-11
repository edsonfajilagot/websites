

$(document).foundation();

paydiv.ongood = function (purchased, content) {
  if(purchased) {
    $('#footer').hide();
    $('#sign-in-link').hide();
    $('#help-link').show();
  } else {
    $('#footer').show();
  }

  // footer should be dealt with now, but need to alter the button
  if(content) {
    $('#video_toggle_icon').css('color', '#000');
    $('#video_holder').show();
  } else {
    $('#video_toggle_icon').css('color', '#aaa');
    $('#video_holder').hide();
  }

}

paydiv.onerror = function (req) {
  $('#footer').show();
}

function atbottom() {
   var position = $(window).scrollTop() + $(window).height();
   var distance = $(document).height() - position;
   var holder = $('#video_holder');

   // this paydiv.purchased also covers paydiv.purchase_state == "FREE"
   if(paydiv.has_content) {
       if(distance < 400) {
          $('#footer').hide();
       } else if(!paydiv.purchased) {
          $('#footer').show();
       }
   }
}

$(window).scroll(atbottom);
$(window).load(atbottom);

$boot(paydiv);
