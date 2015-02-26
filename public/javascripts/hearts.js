$( document ).ready(function() {
  // Handler for .ready() called.
var $container = $('#container');
$(function () {
  //var colors = ['lightblue', 'green', 'gold', 'orange', 'red', 'pink', 'purple',],
      var colors = [ 'green', 'gold', 'orange', 'red', 'pink'],
      randColor = colors[Math.floor(Math.random()*colors.length)],
  		    parent = $container,
      divs = parent.children();
  
  while (divs.length) {
    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }
  $('.heart').each(function() {
    $(this).addClass(colors[Math.floor(Math.random()*colors.length)]);
    //TODO: add random font stretch
    })
  parent.packery({ 'selector' : '.heart', 'stamp' : '.whitespace'});
  //$container.find('.heart').each( function( i, itemElem ) {
    // make element draggable with Draggabilly
    //var draggie = new Draggabilly( itemElem );
    // bind Draggabilly events to Packery
    //$container.packery( 'bindDraggabillyEvents', draggie );
  
  /*$( window ).scroll(function() {
    clearTimeout( $.data( this, "scrollCheck" ) );
    $.data( this, "scrollCheck", setTimeout(function() {
      $container.packery();
    }, 250) );
  }); 
  
    var el=$('.jumbobox');
    var originalelpos=el.offset().top; // take it where it originally is on the page

    $(window).scroll(function(){
      var el = $('.jumbobox'); 
      var elpos = el.offset().top; // take current position
      var windowpos = $(window).scrollTop(); //and the current window top
      var finaldestination = windowpos+originalelpos; //add them together
      el.stop().velocity({'top':finaldestination},500); //animate!
      clearTimeout( $.data( this, "scrollCheck" ) ); //so packery doesn't choke, dont run till stop scrolling
      $.data( this, "scrollCheck", setTimeout(function() {
        $container.packery(); //redo layout around stamped .jumbobox
      }, 100) );      
    }); */
  
  	$(".heart").on("click", function(){
      $(this).css({zIndex: 1000});
      $(this).velocity({
        translateY: "-20px",
        rotateY: "180deg",
        scaleX: "1.5",
        scaleY: "1.5",
        
      });
    });

	});
});	
 