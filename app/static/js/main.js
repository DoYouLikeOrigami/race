window.onload = function() {
	(function() {
		// Отправка данных из form
		formsBindSubmit();

		function formsBindSubmit() {
			var forms = document.querySelectorAll('.form');


			Array.prototype.forEach.call(forms, function(form, index) {
				form.addEventListener('submit', function(e) {
					e.preventDefault();

					var inputs = form.querySelectorAll('.form__input'),
							method = form.method,
							action = form.action,
							succMsg = form.dataset.succmsg,
							submitBtn = form.querySelector('input[type="submit"]'),
							submitBtnValue = submitBtn.value,
							name,
							phone,
							email,
							msg = form.querySelector('.form__textarea'),
							json;

					if (!method || !action) {
						console.error('error: no method or action');
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

						if (msg) {
							msg = msg.value;
						}
					});

					if (!phone && !email) {
						console.error('no phone or email');
						showErrPopup('Пожалуйста, введите вашу почту или телефон!');
						return;
					}

					if (!phone) phone = "Не заполнено";
					if (!name) name = "Не заполнено";
					if (!email) email = "Не заполнено";
					if (!msg) email = "Не заполнено";

					json = {
						phone: phone,
						name: name,
						email: email,
						msg: msg
					};

					// TODO сделать замену текста на кнопке
					//submitBtn.value = "Отправка...";

					if (send(json, method, action, succMsg)) submitBtn.value = submitBtnValue;
				});
			});
		};

		function showErrPopup(text) {
			var errPopup = document.querySelector('.popup--js-error');

			if (text) {
				errPopup.querySelector('.popup--js-text').innerHTML = text;
			}

			return showPopup(errPopup);
		}

		function showSuccPopup(text) {
			var succPopup = document.querySelector('.popup--js-success');

			if (text) {
				succPopup.querySelector('.popup--js-text').innerHTML = text;
			}

			return showPopup(succPopup);
		}

		function send(json, method, action, succMsg) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, action);
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr.send(JSON.stringify(json));

			xhr.onreadystatechange = function() {
				if (xhr.readyState != 4) return;

				if (xhr.status != 200) {
					console.error(xhr.status, xhr.statusText);
					if (showErrPopup('Что-то не так на сервере. Позвоните нам.')) return true;
				} else {
					console.info(xhr.responseText);
					if (showSuccPopup(succMsg)) return true;
				}
			}
		}

		popupsBindClose();

		function popupsBindClose() {
			var popups = document.querySelectorAll('.popup'),
				overlay = document.querySelector('.overlay');

			// Событие скрытия попапов при нажатии на кнопку .js--close-popup
			Array.prototype.forEach.call(popups, function(popup, index) {
				var hideBtns = popup.querySelectorAll('.js--close-popup');

				Array.prototype.forEach.call(hideBtns, function(hideBtn, index) {
					hideBtn.addEventListener('click', function(e) {
						e.preventDefault();
						hidePopup(popup);
					});
				});
			});

			// Событие скрытия попапов при нажатии на overlay
			overlay.addEventListener('click', function(e) {
				e.preventDefault();
				hidePopup();
			});
		};

		function hidePopup(popup) {
			if (!popup) {
				popup = document.querySelector('.popup--active');
			}

			var overlay = document.querySelector('.overlay');

			if (popup) popup.classList.remove('popup--active');
			if (overlay) overlay.classList.remove('overlay--active');

			return true;
		};

		function showPopup(popup) {

			// Если открыт другой попап, то сначала его прячем,
			// а потом показываем этот, чтобы не было багов
			if (hidePopup()) {
				if (!popup) {
					return false
				}

				var overlay = document.querySelector('.overlay');

				popup.classList.add('popup--active');
				if (overlay) overlay.classList.add('overlay--active');

				return true;
			}
		};

		popupsImgBindOpen();

		function popupsImgBindOpen() {
			var imgBtns = document.querySelectorAll('.js-show-img-popup'),
					imgPopup = document.querySelector('.popup--js-img'),
					imgPopupImg = imgPopup.querySelector('.popup__img');

			Array.prototype.forEach.call(imgBtns, function(imgBtn, index) {
				imgBtn.addEventListener('click', function(e) {
					e.preventDefault();

					var clickImg = this,
							img;

					if (clickImg.dataset.img) {
						img = clickImg.dataset.img;
					}

					else {
						img = clickImg.querySelector('img').src;
					}

					imgPopupImg.src = img;

					showPopup(imgPopup);
				});
			});
		};

		// Попапы с заказами

		bindPopup('order');
		bindPopup('commerce');
		bindPopup('gos');
		bindPopup('contract');
		bindPopup('call');
		bindPopup('art');

		function bindPopup(mod) {
			var btns = document.querySelectorAll('.js-show-' + mod +'-popup'),
					popup = document.querySelector('.popup--js-' + mod);

			Array.prototype.forEach.call(btns, function(btn, index) {
				btn.addEventListener('click', function(e) {
					e.preventDefault();

					showPopup(popup);
				});
			});
		};

		resultBlocks();

		function resultBlocks() {
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
		};

	})();
}

var portfolio__top__own = new Swiper('.portfolio__top--js-own', {
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	spaceBetween: 10,
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

