// Global
var win = window,
    doc = document;

// Global Functions

function hasClass(el, cls) {
  return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};

function addClass(el, cls) {
  if (!this.hasClass(el, cls)) {
    el.className += " " + cls;
  }
};

function removeClass(el, cls) {
  if (this.hasClass(el, cls)) {

    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    el.className = el.className.replace(reg,' ');
  }
};

// Elements

var site = doc.getElementsByClassName('site-wrap')[0];
var wrap = doc.getElementsByClassName('panel-wrap')[0];

var panel = doc.getElementsByClassName('panel');

var zoom = doc.getElementsByClassName('js-zoom');

var nav_up = doc.getElementsByClassName('js-up'),
    nav_left = doc.getElementsByClassName('js-left'),
    nav_right = doc.getElementsByClassName('js-right'),
    nav_down = doc.getElementsByClassName('js-down');

var animation = doc.getElementsByClassName('js-animation');

// Tracking
var pos_x = 0,
    pos_y = 0;

function setPos(){
  wrap.style.transform = 'translateX(' + pos_x + '00%) translateY(' + pos_y + '00%)';
  setTimeout( function(){
    removeClass(wrap, 'animate');
  }, 600);
}

setPos();

function moveUp(){
  addClass(wrap, 'animate');
  if(pos_y<1){
    pos_y++;
    findPanel(pos_x,pos_y);
    setPos();
  }		
}

function moveLeft(){
  addClass(wrap, 'animate');
  if(pos_x<1){
    pos_x++;
    findPanel(pos_x,pos_y);
	  setPos();
  }		
}

function moveRight(){
	addClass(wrap, 'animate');
	if(pos_x>-1){
    pos_x--;
    findPanel(pos_x,pos_y);
		setPos();
	}  
}

function moveDown(){
	addClass(wrap, 'animate');
	if(pos_y>-2){
    pos_y--;
    findPanel(pos_x,pos_y);
    setPos();
	}
}

for (var x = 0; x < nav_up.length; x++){
  nav_up[x].addEventListener('click', moveUp);
}

for (var x = 0; x < nav_left.length; x++){
  nav_left[x].addEventListener('click', moveLeft);
}

for (var x = 0; x < nav_right.length; x++){
  nav_right[x].addEventListener('click', moveRight);
}

for (var x = 0; x < nav_down.length; x++){
  nav_down[x].addEventListener('click', moveDown);
}

// Animations

for (var x = 0; x < animation.length; x++){
  ( function(_x){
    animation[_x].addEventListener('click', function(){
      toggleAnimation(_x);
    });
  })(x);
}

function toggleAnimation(i){
  for (var x = 0; x < animation.length; x++){
    if (i === x){
      addClass(animation[x], 'active');
      addClass(wrap, animation[x].getAttribute('data-animation'));
    } else {
      removeClass(animation[x], 'active');
      removeClass(wrap, animation[x].getAttribute('data-animation'));
    }
  }
  
}

for (var x = 0; x < zoom.length; x++){
  zoom[x].addEventListener('click', zoomOut);   
}

function zoomOut(e){
  e.stopPropagation();
  addClass(site, 'show-all');
  $(".subpanel h1").addClass("show-all-title");
  for (var x = 0; x < panel.length; x++){
    ( function(_x){
      panel[_x].addEventListener('click', setPanelAndZoom);
    })(x);
  }
}

function setPanelAndZoom(e){
  pos_x = -e.target.getAttribute('data-x-pos'),
  pos_y = e.target.getAttribute('data-y-pos');
  findPanel(pos_x,pos_y);
  setPos();
  zoomIn();
}


function zoomIn(){
  for (var x = 0; x < panel.length; x++){
    panel[x].removeEventListener('click', setPanelAndZoom);
  }
  $(".subpanel h1").removeClass("show-all-title");
  removeClass(site, 'show-all');
}

function startOver(){
  addClass(wrap, 'animate');
  pos_x = 0,
  pos_y = 0;
  findPanel(pos_x,pos_y);
  setPos();
}

function findPanel(pos_x,pos_y){
  var panelNum;
  if(pos_x == 0 && pos_y == 0){
    panelNum = 0;
  }
  else if(pos_x == 0 && pos_y == 1){
    panelNum = 1;
  } 
  else if(pos_x == -1 && pos_y == 1){
    panelNum = 2;
  } 
  else if(pos_x == 1 && pos_y == 1){
    panelNum = 3;
  } 
  else if(pos_x == -1 && pos_y == 0){
    panelNum = 4;
  }
  else if(pos_x == 1 && pos_y == 0){
    panelNum = 5;
  }
  else if(pos_x == 0 && pos_y == -1){
    panelNum = 6;
  }
  else if(pos_x == -1 && pos_y == -1){
    panelNum = 7;
  }
  else if(pos_x == 1 && pos_y == -1){
    panelNum = 8;
  }
  else if(pos_x == 0 && pos_y == -2){
    panelNum = 9;
  }
  changeStyle(panelNum);
}

function changeStyle(panelNum){
  if(panelNum == 0){ 
    $(".fixed-menu").css("color", "white"); 
    $(".btn-atag").css("color", "white"); 
  }
  else if(panelNum == 1){ 
    $(".fixed-menu").css("color", "black"); 
    $(".btn-atag").css("color", "black"); 
  }
  else if(panelNum == 4){ 
    $(".fixed-menu").css("color", "black"); 
    $(".btn-atag").css("color", "black"); 
  }
  else if(panelNum == 5){ 
    $(".fixed-menu").css("color", "black"); 
    $(".btn-atag").css("color", "black"); 
  }
}  

$(document).ready(function(){ 
  $(".fa-info-circle").click(function(){
    $("#info-text").fadeToggle();
  }); 

  $("#toggle-music").click(function(){
    if( $( "#toggle-music i" ).attr( "class" ) == 'fa fa-play' ){
      $("#audio")[0].play();
      $("#toggle-music").html('<i class="fa fa-pause" aria-hidden="true"></i>');
    }
    else if( $( "#toggle-music i" ).attr( "class" ) == 'fa fa-pause' ){
      $("#audio")[0].pause();
      $("#toggle-music").html('<i class="fa fa-play" aria-hidden="true"></i>');
    }  
  });

  setTimeout(function(){
    $(".panel_animation-list").fadeOut();
    $("#info-text").fadeOut();
   }, 8000);

  $("#toggle-anim").click(function(){
    $(".panel_animation-list").toggle();
  });

  $("#homepanel .panel_nav--up").hover(function() {
    if ($(this).text() == "WHO WE ARE?")
       $(this).text("ABOUT")
    else
       $(this).text("WHO WE ARE?");
  });

  // Note: Custom plugin(mousewheel event) since the scolling is disabled(sayan)
  $('html').on('mousewheel', function(event) {
    // console.log(event.deltaX, event.deltaY, event.deltaFactor);

    var deltaX = event.deltaX;
    var deltaY = event.deltaY;

    var scrolledUp = deltaY > 0;
    var scrolledDown = deltaY < 0;
    if ( scrolledUp ){  
      moveUp();
    }
    if ( scrolledDown ){  
      moveDown();
    }

  });
  
	$( "html" ).on( "keydown",function( event ) {
	  if (event.which == 38){moveUp();}
	  else if (event.which == 40){moveDown();}
	  else if (event.which == 37){moveLeft();}
	  else if (event.which == 39){moveRight();}
	  else if (event.which == 13){startOver();}
    else if (event.which == 27){zoomOut(event)}
    else if (event.which == 73){$("#info-text").fadeToggle();}
	});
});	



