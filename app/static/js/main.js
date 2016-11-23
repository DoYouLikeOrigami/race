window.onload = function() {
	// Main screen slider
	(function() {
		var sliderNode = document.querySelector('.main-screen__slider');
		if (! sliderNode) return false;

		var nextBtn = '.main-screen__slider-btn--next';
		var prevBtn = '.main-screen__slider-btn--prev';
		var slider = new Swiper(sliderNode, {
			nextButton: nextBtn,
			prevButton: prevBtn,
			buttonDisabledClass: 'main-screen__slider-btn--disable',
			slidesPerView: 1,
			centeredSlides: true
		});
	})();

	// Reviews section
	(function() {
		var tabClass = 'reviews-section__tab';
		var tabActiveClass = 'reviews-section__tab--active';
		var tabSelector = '.' + tabClass;

		var reviewsSection = document.querySelector('.reviews-section');
		if (!reviewsSection) return false

		var slider = new Swiper('.reviews-section__slides', {
			pagination: '.reviews-section__tabs',
			paginationClickable: true,
			paginationBulletRender: function (index, className) {
				return `<span class="${tabClass}"></span>`;
			},
			onSlideChangeStart: function() {
				var tabs = document.querySelectorAll(tabSelector);
				Array.prototype.forEach.call(tabs, function(tab) {
					tab.classList.remove(tabActiveClass);
				});

				tabs[slider.activeIndex].classList.add(tabActiveClass);
			},
			autoplay: 2000
		});

		var tabs = document.querySelectorAll(tabSelector);
		var firstTab = tabs[0];
		firstTab.classList.add(tabActiveClass);

		Array.prototype.forEach.call(tabs, function(tab, index) {
			tab.addEventListener('mousedown', function() {
				slider.slideTo(index);
			});
		});
	})();

	// Stock modal
	(function() {
		var stocks = document.querySelectorAll('.stock__item');

		Array.prototype.forEach.call(stocks, function(stock) {
			stock.addEventListener('click', function(e) {
				if (e.target.classList.contains('btn')) {
					showModal(stock);
				}
			});
		});

		function showModal(stock) {
			var modal = stock.querySelector('.stock__modal');
			var overlay = stock.querySelector('.stock__modal-overlay');
			modal.classList.add('stock__modal--show');

			overlay.addEventListener('click', function(e) {
				modal.classList.remove('stock__modal--show');
			});
		}
	})();

	// call-to-action ajax
	(function() {
		var btn = document.querySelector('.call-to-action .btn');
		var input = document.querySelector('.call-to-action__input input');

		btn.addEventListener('click', function() {

			var json = {phone: input.value};
			send(json);
		});

		function send(json) {
			var xhr = new XMLHttpRequest();
			console.log(xhr);
			xhr.open("POST", "/url");
			console.log(xhr);
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr.send(JSON.stringify(json));

			xhr.onreadystatechange = function() {
				if (xhr.readyState != 4) return;

				if (xhr.status != 200) {
						errorHandler(xhr.status, xhr.statusText);
				} else {
					successHandler(xhr.responseText);
				}
			}
		}

		function errorHandler(status, statusText) {
			swal('Что-то пошло не так!', 'Попробуйте нам позвонить!', 'error');
		}

		function successHandler(responseText) {
			swal('Мы получили ваш запрос!',  'Перезвоним в течение 15 минут!', 'success');
		}
	})();


	// Results tabs
	(function() {
		var resultBlocks = document.querySelectorAll('.result');

		Array.prototype.forEach.call(resultBlocks, function(result, index) {
			var workImg = result.querySelector('.result__work img'),
					workHeader = result.querySelector('.result__descr header'),
					workMaterial = result.querySelector('.result__descr-material'),
					workNumber = result.querySelector('.result__descr-number'),
					slides = result.querySelectorAll('.result__slides-item');

			Array.prototype.forEach.call(slides, function(slide, index) {
				slide.addEventListener('click', function(e) {
					e.preventDefault();

					var slide = this,
							newImg = slide.querySelector('img').src,
							newHeader = slide.dataset.header,
							newMaterial = slide.dataset.material,
							newNumber = slide.dataset.number;

					Array.prototype.forEach.call(slides, function(slide, index) {
						slide.classList.remove('result__slides-item--active');
					});

					slide.classList.add('result__slides-item--active');

					workImg.src = newImg;
					workHeader.innerHTML = newHeader;
					workMaterial.innerHTML = 'Материал: ' + newMaterial;
					workNumber.innerHTML = 'Тираж ' + newNumber;
				})
			});
		});

	})();

	// Img popups
	(function() {
		var imgBtns = document.querySelectorAll('.js-show-img-popup'),
				imgPopup = document.querySelector('.popup--js-img'),
				imgPopupImg = imgPopup.querySelector('.popup__img'),
				overlay = document.querySelector('.overlay');

		Array.prototype.forEach.call(imgBtns, function(imgBtn, index) {
			imgBtn.addEventListener('click', function(e) {
				e.preventDefault();

				var activePopup = document.querySelector('.popup--active');
				if (activePopup) activePopup.classList.remove('popup--active');

				var clickImg = this,
						img;

				if (clickImg.dataset.img) {
					img = clickImg.dataset.img;
				}

				else {
					img = clickImg.querySelector('img').src;
				}

				imgPopupImg.src = img;
				overlay.classList.add('overlay--active');
				imgPopup.classList.add('popup--active');
			});
		});

	})();

	// Order popups
	(function() {
		var orderBtns = document.querySelectorAll('.js-show-order-popup'),
				orderPopup = document.querySelector('.popup--js-order'),
				overlay = document.querySelector('.overlay');

		Array.prototype.forEach.call(orderBtns, function(orderBtn, index) {
			orderBtn.addEventListener('click', function(e) {
				e.preventDefault();

				var activePopup = document.querySelector('.popup--active');
				if (activePopup) activePopup.classList.remove('popup--active');

				orderPopup.classList.add('popup--active');
				overlay.classList.add('overlay--active');
			});
		});

		var commerceBtns = document.querySelectorAll('.js-show-commerce-popup'),
				commercePopup = document.querySelector('.popup--js-commerce');

		Array.prototype.forEach.call(commerceBtns, function(commerceBtn, index) {
			commerceBtn.addEventListener('click', function(e) {
				e.preventDefault();

				var activePopup = document.querySelector('.popup--active');
				if (activePopup) activePopup.classList.remove('popup--active');

				commercePopup.classList.add('popup--active');
				overlay.classList.add('overlay--active');
			});
		});

		var gosBtns = document.querySelectorAll('.js-show-gos-popup'),
				gosPopup = document.querySelector('.popup--js-gos');

		Array.prototype.forEach.call(gosBtns, function(gosBtn, index) {
			gosBtn.addEventListener('click', function(e) {
				e.preventDefault();

				var activePopup = document.querySelector('.popup--active');
				if (activePopup) activePopup.classList.remove('popup--active');

				gosPopup.classList.add('popup--active');
				overlay.classList.add('overlay--active');
			});
		});

		var contractBtns = document.querySelectorAll('.js-show-contract-popup'),
				contractPopup = document.querySelector('.popup--js-contract');

		Array.prototype.forEach.call(contractBtns, function(contractBtn, index) {
			contractBtn.addEventListener('click', function(e) {
				e.preventDefault();

				var activePopup = document.querySelector('.popup--active');
				if (activePopup) activePopup.classList.remove('popup--active');

				contractPopup.classList.add('popup--active');
				overlay.classList.add('overlay--active');
			});
		});

		var callBtns = document.querySelectorAll('.js-show-call-popup'),
				callPopup = document.querySelector('.popup--js-call');

		Array.prototype.forEach.call(callBtns, function(callBtn, index) {
			callBtn.addEventListener('click', function(e) {
				e.preventDefault();

				var activePopup = document.querySelector('.popup--active');
				if (activePopup) activePopup.classList.remove('popup--active');

				callPopup.classList.add('popup--active');
				overlay.classList.add('overlay--active');
			});
		});

	})();

	// Hide popups
	(function() {
		var popups = document.querySelectorAll('.popup'),
				overlay = document.querySelector('.overlay');

		Array.prototype.forEach.call(popups, function(popup, index) {
			var hideBtn = popup.querySelector('.popup__close');

			hideBtn.addEventListener('click', function(e) {
				e.preventDefault();
				popup.classList.remove('popup--active');
				overlay.classList.remove('overlay--active');
			});
		});

		overlay.addEventListener('click', function(e) {
			e.preventDefault();

			var activePopup = document.querySelector('.popup--active');

			if (activePopup) activePopup.classList.remove('popup--active');
			overlay.classList.remove('overlay--active');
		});

	})();
}
var portfolio__top__own = new Swiper('.portfolio__top--js-own', {
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	spaceBetween: 10,
	autoplay: 3000,
	effect: 'fade'
});

var portfolio__thumbs__own = new Swiper('.portfolio__thumbs--js-own', {
	spaceBetween: 10,
	centeredSlides: true,
	slidesPerView: 4,
	touchRatio: 0.2,
	slideToClickedSlide: true
});


portfolio__top__own.params.control = portfolio__thumbs__own;
portfolio__thumbs__own.params.control = portfolio__top__own;


var portfolio__top__china = new Swiper('.portfolio__top--js-china', {
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	spaceBetween: 10,
	autoplay: 3000,
	effect: 'fade'
});

var portfolio__thumbs__china = new Swiper('.portfolio__thumbs--js-china', {
	spaceBetween: 10,
	centeredSlides: true,
	slidesPerView: 4,
	touchRatio: 0.2,
	slideToClickedSlide: true
});

portfolio__top__china.params.control = portfolio__thumbs__china;
portfolio__thumbs__china.params.control = portfolio__top__china;

