window.onload = function() {
	(function() {
		// Отправка данных из form
		formsBindSubmit();

		function formsBindSubmit() {
			var forms = document.querySelectorAll('.js-submit-form');


			Array.prototype.forEach.call(forms, function(form, index) {
				form.addEventListener('submit', function(e) {
					e.preventDefault();

					var inputs = form.querySelectorAll('input'),
							method = form.method,
							action = form.action,
							succMsg = form.dataset.succmsg,
							submitBtn = form.querySelector('button[type="submit"]'),
							submitBtnValue = submitBtn.value,
							contact,
							driversNumber,
							watchTime,
							msg = form.querySelector('textarea'),
							json;

					if (!method || !action) {
						console.error('error: no method or action');
						return;
					}

					Array.prototype.forEach.call(inputs, function(input, index) {
						if (input.name === "number") {
							driversNumber = input.value;
						}

						if (input.name === "time") {
							watchTime = input.value;
						}

						if (input.name === "contact") {
							contact = input.value;
						}
					});

					if (!contact) {
						console.error('no contact');
						showErrPopup('Пожалуйста, оставьте ваши контакты!');
						return;
					}

					if (!driversNumber) driversNumber = "Не заполнено";
					if (!watchTime) watchTime = "Не заполнено";
					if (msg) msg = msg.value || "Не заполнено";

					json = {
						contact: contact,
						number: driversNumber,
						time: watchTime,
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
					//location.assign("/thankyou");
					if (showSuccPopup(succMsg)) return true;
					//return true;
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

		bindPopup('call');

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

	})();
}
