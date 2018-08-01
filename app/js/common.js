$(function() {
   $('.button-collapse').sideNav();
   $('.parallax').parallax();
   $('.modal').modal({
      dismissible:false,
      opacity:0.5,
      inDuraction:1000,
      outDuraction:1000,
      startingTop:'10%',
      endingTop:'10%'
   });
   $('.carousel.carousel-slider').carousel({
      fullWidth:true,
      indicators:true,
      duration:300,
      noWrap:true
   });
});
