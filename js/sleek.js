/**
 * Created by SABAREESH on 25-Sep-16.
 */
var sleeked = false;
var prevClick = false;
var prevHighlight = false;
var clutterElements = ["script", "style", "iframe", "combx", "comment", "link[rel=stylesheet]",
    "disqus", "foot", "header", "menu", "object", "rss", "shoutbox", "sidebar"
];

function start() {
    enableSleek();
    /*if (document.readyState == 'complete') {
        enableSleek();
        //showSleek();
    } else {
        window.setTimeout(start, 100);
    };*/
}

function removeElements(els) {
    for (var i = els.length - 1; i > -1; i--) {
        var el = els[i];
        el.parentNode.removeChild(el);
    };
};

function removeAttr(el, attrs) {
    for (var i = 0; i < attrs.length; i++) {
        el.removeAttribute(attrs[i]);
    }
}

function grabArticle(article) {
    alert("article is" + article);
    $('body').empty().append("<article>" + article + "</article");
}

function removeClutter() {

    document.body.className = 'sleek';
    document.body.innerHTML = '<div id="sleek-ruler">' + document.body.innerHTML + '</div>';

    for (i = 0; i < clutterElements.length; i++) {
        removeElements(document.querySelectorAll(clutterElements[i]));
    }

    var all = document.querySelectorAll('*');
    removeAttr(document.body, ['color', 'bgcolor', 'text', 'link', 'vlink', 'alink']);
    for (var i = all.length - 1; i > -1; i--) {
        var el = all[i];
        removeAttr(el, ['face', 'size', 'color', 'background', 'border', 'bgcolor', 'width', 'height', 'style']);
    }
    var images = document.querySelectorAll('img');

    for (var i = images.length - 1; i > -1; i--) {
        var el = images[i];
        if (el.width < 22 || el.height < 22) {
            el.className = 'hidden';
        }
    }
}

function enableSleekOld() {

    if (sleeked == false) {
        sleeked = true;

        var article = $("article").html();
        if (article != "" && article != null) {
            grabArticle(article);
        }
        removeClutter();


    }
}

function disableSleek() {
    if (sleeked == true) {
        location.reload();

    }
}
var mouseMoveListener = function(event) {
    var elem = event.target || event.srcElement;
    if (prevElement != null && prevHighlight == false) {
        prevElement.classList.remove("highlight");
    }
    elem.classList.add("highlight");
    prevElement = elem;
}

function showSleek(elem) {

    var card = "<div id=\"myModal\" class=\"modal\">\
    <div class=\"modal-content\">\
      <div id=\"content\">" + elem + "</div>\
    </div>\
  </div>";

    $("body").append(card);
    $("#myModal").fadeIn('slow');
    $(document.body).contents().not("#myModal").toggleClass('blur');
    document.removeEventListener("mousemove", mouseMoveListener);
    document.removeEventListener("click", clickListener);

    var modal = document.getElementById('myModal');


    $("#myModal").click(function() {
        $("#myModal").fadeOut('slow', function() {
            $(this).remove();
        });

        $(document.body).contents().not("#myModal").toggleClass('blur');
        document.addEventListener('mousemove', mouseMoveListener);
        document.addEventListener('click', clickListener);
        prevClick = false;
    }).children().click(function(e) {
        return false;
    });
}
var clickListener = function(event) {

    var elem = event.target;
    if (elem.classList.contains("highlight") && prevClick == false) {
        showSleek(elem.innerHTML);
        prevClick = true;
    }
}

function enableSleek() {
    if (sleeked == false) {
        sleeked = true;
        prevElement = null;
        document.addEventListener('mousemove', mouseMoveListener);
        document.addEventListener('click', clickListener)
    }
}
chrome.extension.onRequest.addListener(function(req, from) {
    if (req == 'disable-sleek') {
        disableSleek();
    } else if (req == 'enable-sleek') {
        start();
    };
});