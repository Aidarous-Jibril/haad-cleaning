(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
		$('.carousel-testimony').owlCarousel({
			center: false,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	  /* -------------------------------
   * Contact form: AJAX submit
   * Uses the form's own action URL (e.g. Formspree)
   * Shows #form-message-success / #form-message-warning
   * ------------------------------- */
  var contactFormAjax = function () {
    var $form = $('#contactForm');
    if (!$form.length) return;

    var $ok  = $('#form-message-success');
    var $bad = $('#form-message-warning');
    var $btn = $form.find('input[type="submit"], button[type="submit"]');
    var $submitting = $form.find('.submitting');

    $form.on('submit', async function (e) {
      e.preventDefault();

      // Reset messages
      $ok.hide().text('');
      $bad.hide().text('');

      // Guard: must have action url
      var action = $form.attr('action');
      if (!action || action === '#') {
        $bad.text('Formuläret saknar mål-URL (action).').show();
        return;
      }

      // UX: disable button
      var oldBtnText = $btn.is('input') ? $btn.val() : $btn.text();
      if ($btn.is('input')) { $btn.val('Skickar...'); } else { $btn.text('Skickar...'); }
      $btn.prop('disabled', true);
      if ($submitting.length) $submitting.show();

      try {
        var data = new FormData($form.get(0));
        // Optional: simple honeypot support if you added <input name="_gotcha">
        // (Formspree ignores it automatically; harmless elsewhere)

        var res = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          $form.get(0).reset();
          $ok.text('Tack! Ditt meddelande är skickat.').show();
        } else {
          var err;
          try { err = await res.json(); } catch (_) { err = {}; }
          var msg = (err && err.errors && err.errors.length)
            ? err.errors.map(function (x) { return x.message; }).join(', ')
            : 'Något gick fel. Försök igen.';
          $bad.text(msg).show();
        }
      } catch (ex) {
        $bad.text('Kunde inte ansluta. Kontrollera din uppkoppling och försök igen.').show();
      } finally {
        // Re-enable button
        if ($btn.is('input')) { $btn.val(oldBtnText); } else { $btn.text(oldBtnText); }
        $btn.prop('disabled', false);
        if ($submitting.length) $submitting.hide();
      }
    });
  };
  contactFormAjax();


})(jQuery);

