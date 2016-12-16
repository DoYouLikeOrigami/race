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
					if (!msg) msg = "Не заполнено";

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
		};

		function showSuccPopup(text) {
			var succPopup = document.querySelector('.popup--js-success');

			if (text) {
				succPopup.querySelector('.popup--js-text').innerHTML = text;
			}

			return showPopup(succPopup);
		};

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
					location.assign("/thankyou");
					//if (showSuccPopup(succMsg)) return true;
					return true;
				}
			}
		};

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

		popupsServiceBindOpen();

		function popupsServiceBindOpen() {
			var serviceBtns = document.querySelectorAll('.js-show-service-popup'),
					servicePopup = document.querySelector('.popup--js-service'),
					servicePopupWrapper = servicePopup.querySelector('.popup__wrapper'),
					serviceMoveBtns = servicePopup.querySelectorAll('.popup__button--js-move');

			Array.prototype.forEach.call(serviceBtns, function(serviceBtn, index) {
				serviceBtn.addEventListener('click', function(e) {
					e.preventDefault();

					var clickImg = this,
							images = clickImg.dataset.img.split(', '),
							folder = clickImg.dataset.folder,
							servicePopupImg;

					if (!images || !folder) {
						return;
					}

					servicePopupWrapper.innerHTML = '';

					Array.prototype.forEach.call(images, function(img, index) {
						var imgSrc = '/static/img/' + clickImg.dataset.folder + '/' + images[index];

						servicePopupImg = document.createElement('div');
						servicePopupImg.className = 'popup__slide';
						servicePopupImg.innerHTML = '<img class="popup__img" src="' + imgSrc + '">';
						servicePopupWrapper.appendChild(servicePopupImg);
					});

					document.querySelector('.popup__slide').classList.add('popup__slide--active');
					serviceMoveBtns[0].classList.add('popup__button--fade');
					serviceMoveBtns[1].classList.remove('popup__button--fade');

					showPopup(servicePopup);
				});
			});
		};

		popupsServiceMoveSlides();

		function popupsServiceMoveSlides() {
			var serviceMoveBtns = document.querySelectorAll('.popup__button--js-move'),
					servicePopup = document.querySelector('.popup--js-service'),
					servicePopupWrapper = servicePopup.querySelector('.popup__wrapper');

			Array.prototype.forEach.call(serviceMoveBtns, function(serviceMoveBtn, index) {
				serviceMoveBtn.addEventListener('click', function(e) {
					e.preventDefault();

					var slides = servicePopupWrapper.querySelectorAll('.popup__slide'),
							currentIndex,
							newIndex,
							slidesLength = slides.length,
							btn = this;

					if (slidesLength === 1) {
						Array.prototype.forEach.call(serviceMoveBtns, function(serviceMoveBtn, index) {
							serviceMoveBtn.classList.add('popup__button--fade');
						});

						return;
					};

					// Находим индекс текущего
					Array.prototype.forEach.call(slides, function(slide, index) {
						if (slide.classList.contains('popup__slide--active')) {
							currentIndex = index;
						};
					});

					if (serviceMoveBtn.classList.contains('popup__button-prev')) {
						if (currentIndex === 0) {
							return;
						}

						newIndex = currentIndex - 1;

						Array.prototype.forEach.call(serviceMoveBtns, function(serviceMoveBtn, index) {
							if (serviceMoveBtn.classList.contains('popup__button-next')) {
								serviceMoveBtn.classList.remove('popup__button--fade');
							};
						});
					};

					if (serviceMoveBtn.classList.contains('popup__button-next')) {
						if (currentIndex === slidesLength - 1) {
							return;
						}

						newIndex = currentIndex + 1;

						Array.prototype.forEach.call(serviceMoveBtns, function(serviceMoveBtn, index) {
							if (serviceMoveBtn.classList.contains('popup__button-prev')) {
								serviceMoveBtn.classList.remove('popup__button--fade');
							};
						});
					};

					slides[newIndex].classList.add('popup__slide--active');
					slides[currentIndex].classList.remove('popup__slide--active');

					// Навешиваем неактивный класс на кнопку назад
					if (newIndex === 0) {
						Array.prototype.forEach.call(serviceMoveBtns, function(serviceMoveBtn, index) {
							if (serviceMoveBtn.classList.contains('popup__button-prev')) {
								serviceMoveBtn.classList.add('popup__button--fade');
							};
						});
					};

					// Навешиваем неактивный класс на кнопку вперёд
					if (newIndex === slidesLength - 1) {
						Array.prototype.forEach.call(serviceMoveBtns, function(serviceMoveBtn, index) {
							if (serviceMoveBtn.classList.contains('popup__button-next')) {
								serviceMoveBtn.classList.add('popup__button--fade');
							};
						});
					};

					return;
				});
			});
		};

		mainScreenToggleImg();

		function mainScreenToggleImg() {
			var img = document.querySelector('.main-screen__img img'),
					imgNumber = 1,
					path = '/static/img/main-screen/';

			var timer = setInterval(function() {
				imgNumber++;

				if (imgNumber > 6) {
					imgNumber = 1;
				};

				img.src = path + imgNumber + '.jpg';
			}, 3000);
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

