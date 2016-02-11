
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

   if(paydiv.has_content) {
       // hide the nave when it's in the way of the video
       if(distance < 400) {
          $('nav').hide();
       } else {
          $('nav').show();
       }
   }
}

$(window).scroll(atbottom);
$(window).load(atbottom);

$boot(paydiv);
