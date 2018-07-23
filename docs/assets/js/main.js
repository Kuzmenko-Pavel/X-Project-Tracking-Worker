var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(function() {
  $("section h2, section h3, section h4").each(function(i){
      var id = 'c' + i;
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'>" +
        "<a href='#" + id + "'>" + $(this).text() + "</a>" +
        "</li>");
    $(this).attr("id",id);
    $("nav ul li:first-child a").parent().addClass("active");
  });

  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  sectionHeight();

  $('img').on('load', sectionHeight);
});
$(function() {

    var $sidebar   = $("nav"),
        $window    = $(window),
        offset     = $sidebar.offset(),
        topPadding = 25;

    $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            },'fast');
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            },'fast');
        }
    });

});
