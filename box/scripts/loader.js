(function() {
  var $bar, $please, $recipe, actions, fakeLoad, fakeLoader, foodie, incLoad, ingredients, percentage, rotate, rotater;

  percentage = 0;

  $please = $('#please');

  $recipe = $('#recipe');

  $bar = $('#bar');

  foodie = [['baking', 'cooking', 'chopping', 'peeling', 'mixing', 'stirring', 'tasting', 'scrambling', 'squishing', 'dicing', 'boiling', 'loading', 'drizzling', 'pouring', 'browning', 'carving', 'searing', 'roasting', 'zesting', 'preparing', 'choosing', 'cleaning', 'peeling', 'breaking', 'shaping', 'whipping', 'kneading', 'steaming', 'breading', 'frying', 'grilling', 'stewing', 'buttering', 'reticulating'], ['array', 'bash', 'class', 'database', 'driver', 'framework', 'function', 'icon', 'index', 'program', 'register', 'shell', 'snippet', 'source code', 'sql', 'javascript', 'stylesheet']];

  actions = foodie[0].length;

  ingredients = foodie[1].length;

  fakeLoad = function() {
    if (percentage >= 100) {
      clearInterval(fakeLoader);
      clearInterval(rotater);
      $please.fadeTo(500, 0);
      $bar.fadeOut(500);
      return $recipe.fadeOut(500, function() {
        $(this).css({
          'font-size': '24px',
          'color': '#333'
        });
      

        $('.ui.basic.modal')
        .modal({
          closable  : false,
          onDeny    : function(){
            $("#loader-wrap").hide();
            $("#site-wrap").show();
            $("#toggle-music").html('<i class="fa fa-play" aria-hidden="true"></i>');
            $("#bgvid")[0].play();
          },
          onApprove : function() {
            $("#loader-wrap").hide();
            $("#audio")[0].play();
            $("#site-wrap").show();
            $("#toggle-music").html('<i class="fa fa-pause" aria-hidden="true"></i>');
            $("#bgvid")[0].play();
          }
        })
        .modal('show')
      ;


        
        // return $(this).text("loaded").fadeIn(500);
      });
    } else {
      percentage += Math.random() / 2;
	  if(percentage >= 30){$("#bar").css("background-color", "#000080");}
	  if(percentage >= 80){$("#bar").css("background-color", "#008000");}
      return $bar.css('left', (-100 + percentage) + "%");
    }
  };

  (rotate = function() {
    return $recipe.fadeOut(500, function() {
      return $(this).text((foodie[0].splice(Math.floor(Math.random() * actions--), 1)) + " " + (foodie[1].splice(Math.floor(Math.random() * ingredients--), 1))).fadeIn(500);
    });
  })();

  $please.fadeTo(700, 1);

  rotater = setInterval(rotate, 4000);

  fakeLoader = setInterval(fakeLoad, 20);
  //fakeLoader = setInterval(fakeLoad, 1);
  incLoad = function() {
    gray.attr('data-loader', Math.floor(percentage));
    return orange.css({
      'width': percentage + '%'
    });
  };

}).call(this);