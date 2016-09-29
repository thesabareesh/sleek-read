/**
 * Created by SABAREESH on 25-Sep-16.
 */
var sleeked=false;
var clutterElements=["script","style","iframe","combx","comment","link[rel=stylesheet]",
					"disqus","foot","header","menu","object","rss","shoutbox","sidebar"];
function start(){
	if (document.readyState == 'complete') {
		document.title="start sleeking";
    	enableSleek();
  	}else {
    window.setTimeout(start, 100);
  	};
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
/*Magic sauce*/

function grabArticle(article){
    alert("article is" +article);
    $('body').empty().append("<article>"+article+"</article");
  
}

function removeClutter(){

  document.body.className = 'sleek';
  document.body.innerHTML = '<div id="sleek-ruler">'+document.body.innerHTML+'</div>';

  for (i = 0; i < clutterElements.length; i++) {
        removeElements(document.querySelectorAll(clutterElements[i]));
      }

    var all = document.querySelectorAll('*');
    removeAttr(document.body, [ 'color', 'bgcolor', 'text', 'link', 'vlink', 'alink' ]);
    for (var i = all.length - 1; i > -1; i--) {
          var el = all[i];
         removeAttr(el, [ 'face', 'size', 'color', 'background', 'border', 'bgcolor', 'width', 'height', 'style' ]);
      } 
      var images = document.querySelectorAll('img');

      for (var i = images.length - 1; i > -1; i--) {
          var el = images[i];
          if (el.width < 22 || el.height < 22) {
            el.className = 'hidden';
          }
      }
}

function enableSleek(){
    
  if(sleeked==false){
    sleeked=true;
    
    var article=$("article").html();
    if(article!="" && article!=null){
      grabArticle(article);
    }
    removeClutter();
	
    
	}
  
}

function disableSleek(){
	if (sleeked==true) {
    	location.reload();
    	document.title="de-sleeked!";
  	}
}
chrome.extension.onRequest.addListener(function(req, from) {
  if (req == 'disable-sleek') {
    disableSleek(); 
  } else if (req == 'enable-sleek') {
   start();
  };
});

