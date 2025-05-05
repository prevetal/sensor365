$(function(){
	// Основной слайдер
	$('.main_slider .slider').bxSlider({
		mode: 'fade',
		speed: 750,
		slideSelector: 'div.slide',
		infiniteLoop: true,
		pager: true,
		controls: false,
		auto: true,
		pause: 5000,
		onSliderLoad: function(currentIndex){
			var colorType = $(this).find('> .slide:eq('+ currentIndex +')').data('color')

			$('.main_slider, header').addClass(colorType)
		},
		onSlideBefore: function($slideElement, oldIndex, newIndex){
			var colorType = $(this).find('> .slide:eq('+ newIndex +')').data('color')

			$('.main_slider, header').removeClass('dark light').addClass(colorType)
		}
	})


	// Recommended slider
	let recommendedSlider = document.querySelector('.recommended_products .swiper')

	if (recommendedSlider) {
		new Swiper('.recommended_products .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 2
				},
				480: {
					spaceBetween: 20,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 20,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 33,
					slidesPerView: 3
				}
			}
		})
	}


	// Viewed slider
	let viewedSlider = document.querySelector('.viewed_products .swiper')

	if (viewedSlider) {
		new Swiper('.viewed_products .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			spaceBetween: 5,
			breakpoints: {
				0: {
					slidesPerView: 'auto',
					slidesPerGroup: 1
				},
				480: {
					slidesPerView: 2,
					slidesPerGroup: 2
				},
				768: {
					slidesPerView: 3,
					slidesPerGroup: 3
				}
			},
			on: {
				init: swiper => {
					setHeight(swiper.el.querySelectorAll('.product'))
				},
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.product')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		})
	}


	// Каталог
	$('.catalog_link').on('click', function (e) {
		e.preventDefault()

		const $this = $(this),
			$modal = $('#catalog_modal')

		if ($this.hasClass('active')) {
		  $this.removeClass('active')
		  $modal.fadeOut(200)
		} else {
		  $this.addClass('active')
		  $modal.fadeIn(300)
		}
	})


	// Моб. меню
	$('header .menu_link').on('click', function (e) {
		e.preventDefault()

		const $this = $(this),
			$links = $('header .links')

		if ($this.hasClass('active')) {
		  $this.removeClass('active')
		  $links.fadeOut(200)
		} else {
		  $this.addClass('active')
		  $links.fadeIn(300)
		}
	})


	// Поиск
	$('.search_link').on('click', function (e) {
		e.preventDefault()

		const $this = $(this),
			$modal = $('#search_modal')

		if ($this.hasClass('active')) {
		  $this.removeClass('active')
		  $modal.fadeOut(200)
		} else {
		  $this.addClass('active')
		  $modal.fadeIn(300)
		}
	})


	// Product to favorite
	$('.product .favorite_btn, .product_info .favorite_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Мини всплывающие окна
	firstClick = false
	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    var modalId = $(this).attr('data-modal-id')

	    if($(this).hasClass('active')){
	        $(this).removeClass('active')
	        $('.mini_modal').fadeOut(200)
	        firstClick = false

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'default')
            }
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).addClass('active')

	        $('.mini_modal').fadeOut(200)
	        $(modalId).fadeIn(300)
	        firstClick = true

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'pointer')
            }
	    }
	})

	//Закрываем всплывашку при клике вне неё
	$(document).click(function(e){
	    if (!firstClick && $(e.target).closest('.mini_modal').length == 0){
	        $('.mini_modal').fadeOut(300)
	        $('.mini_modal_link').removeClass('active')

            if( $(window).width() < 1024 ){
                $('body').css('cursor', 'default')
            }
	    }
	    firstClick = false
	})

	$('.mini_modal .close').click(function(e){
		e.preventDefault()

		$('.mini_modal').fadeOut(300)
	    $('.mini_modal_link').removeClass('active')

	    firstClick = false
	})


	// Увеличение картинки
	$('.fancy_img').fancybox({
		transitionEffect : 'slide',
		animationEffect : 'fade',
		i18n : {
			'en' : {
				CLOSE : 'Закрыть'
			}
		}
	})



	// Табы
	$('.tabs_container').each(function(){
	    $(this).find('.tab_content:first').show()
	})

	$('.tabs li').click(function() {
	    var parentBox = $(this).parents('.tabs_container')

	    $(parentBox).find('.tabs li').removeClass('active')
	    $(this).addClass('active')
	    $(parentBox).find('.tab_content').hide()

	    var activeTab = $(this).find('a').attr('href')
	    $(activeTab).fadeIn()
	    return false
	})



	// Изменение количества товара
	$('.amount .minus').click(function(e){
	    e.preventDefault()

	    var input = $(this).parents('.amount').find('input')
	    var inputVal = parseInt(input.val())
	    var minimum = parseInt(input.attr('data-minimum'))

	    if(inputVal > minimum){
	    	input.val(inputVal-1)
	    }
	})

	$('.amount .plus').click(function(e){
	    e.preventDefault()

	    var input = $(this).parents('.amount').find('input')
	    var inputVal = parseInt(input.val())
	    var maximum = parseInt(input.attr('data-maximum'))

	    if(inputVal < maximum){
	    	input.val(inputVal-(-1))
	    }
	})


	// Product info
	$('.product_info .buy_btn').click(function(e) {
		e.preventDefault()

		let product = $(this).closest('.product_info')

		$(this).hide()

		product.find('.added').addClass('show')
	})


	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs .swiper', {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			spaceBetween: 12,
			breakpoints: {
				0: {
					slidesPerView: 2
				},
				480: {
					slidesPerView: 3
				},
			}
		})

		new Swiper('.product_info .big .swiper', {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 12,
			slidesPerView: 1,
			lazy: true,
			thumbs: {
				swiper: productThumbs
			}
		})
	}


	// Products
	$('.products .product .buy_btn').click(function(e) {
		e.preventDefault()

		let product = $(this).closest('.product')

		$(this).hide()

		product.find('.amount, .cart_link').addClass('show')
	})
})



const setHeight = items => {
	let maxheight = 0

	items.forEach(el => {
		if (el.offsetHeight > maxheight) maxheight = el.offsetHeight
	})

	items.forEach(el => el.style.height = maxheight + 'px')
}