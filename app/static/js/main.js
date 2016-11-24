window.onload = function() {

	// call-to-action ajax
	(function() {
		var forms = document.querySelectorAll('.form');

		Array.prototype.forEach.call(forms, function(form, index) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();

				var inputs = form.querySelectorAll('.form__input'),
						method = form.method,
						action = form.action,
						name,
						phone,
						email,
						json;

				if (!method || !action) {
					console.log('error: no method or action');
					return;
				}

				Array.prototype.forEach.call(inputs, function(input, index) {
					if (input.name === "name") {
						name = input.value;
					}

					if (input.name === "phone") {
						phone = input.value;
					}

					if (input.name === "email") {
						email = input.value;
					}
				});

				if (!phone || !email) {
					console.log('error: no phone or email');
					showErrPopup();
					return;
				}

				json = {
					phone: phone
					name: name,
					email: email};

				send(json, method, action);
			});
		});

		function showErrPopup(text) {
			var errPopup = document.querySelector('.popup--js-error'),
					closeBtn = errPopup.querySelector('.js--close-popup'),
					overlay = document.querySelector('.overlay');

			if (text) {
				errPopup.querySelector('.popup__error-text').innerHTML = text;
			}

			errPopup.classList.add('popup--active');
			overlay.classList.add('overlay--active');

			closeBtn.addEventListener('click', function(e) {
				e.preventDefault();
				errPopup.classList.remove('popup--active');
				overlay.classList.remove('overlay--active');
			});
		}

		function send(json, method, action) {
			var xhr = new XMLHttpRequest();
			console.log(xhr);
			xhr.open(action, method);
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

