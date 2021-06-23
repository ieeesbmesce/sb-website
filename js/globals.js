$(function () {
  $("#header").load("/components/navbar.html", function () {
    if ($("#main").length) {
      $("li").removeClass("active");
      var val = $("#main").attr("data-under");
      $('[data-menuanchor$="' + val + '"]')
        .first()
        .addClass("active");
      $("a")
        .filter('[data-menuanchor$="' + val + '"]')
        .removeClass("drop-li");
    }
  });
  $("#social-icons").load("/components/social-icons.html");
  $("#footer").load("/components/footer.html", function () {
    document
      .getElementById("copyright-year")
      .appendChild(document.createTextNode(new Date().getFullYear()));
  });
});
