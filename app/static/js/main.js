var mainModule = (function () {

	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _setUpListeners = function () {
		window.addEventListener('scroll', _scrollFunctions);
		document.querySelector('.btn--nav').addEventListener('click', _showNavPopup);
		document.querySelector('.form--mail').addEventListener('submit', _sendMail);
		document.querySelector('.form--footer').addEventListener('submit', _subscribe);
		document.querySelector('.form--steps').addEventListener('submit', _sendPhone);
		_navScroll();
		_orderBtns();
	};

	var _defaultRun = function () {
		if (document.getElementsByClassName('goods-card')) _goodsCard();
		if (document.getElementsByClassName('tabs-section--top')) _changeTabs();
		if (document.getElementsByClassName('tabs-section--inline')) _changeInlineTabs();
	};

	var _navScroll = function () {
		var navItems = document.querySelectorAll('.main-nav__link');

		for (var i = 0; i < navItems.length; i++) {
			navItems[i].addEventListener('click', _jumpTo);
		}
	};

	var _jumpTo = function (event) {
		event.preventDefault();
		var navItems = document.querySelectorAll('.main-nav__link'),
		    menuPopup = document.querySelector('.popup--menu'),
		    mainHeaderHeight = document.querySelector('.main-header').clientHeight;

		for (var i = 0; i < navItems.length; i++) {
			navItems[i].classList.remove('main-nav__link--active');
		}

		menuPopup.classList.remove('popup--active');

		Jump(this.dataset.link, {
			offset: mainHeaderHeight * (-1)
		});

		this.classList.add('main-nav__link--active');
	};

	var _showNavPopup = function (event) {
		event.preventDefault();

		var navPopup = document.querySelector('.popup--menu'),
		    btnClose = navPopup.querySelector('.btn--close-popup');

		navPopup.classList.add('popup--active');

		btnClose.addEventListener('click', function (e) {
			e.preventDefault();
			navPopup.classList.remove('popup--active');
		});
	};

	var _orderBtns = function () {
		var orderBtns = document.querySelectorAll('.btn--order');

		for (var i = 0; i < orderBtns.length; i++) {
			orderBtns[i].addEventListener('click', _showOrderPopup);
		};
	};

	var _showOrderPopup = function (event) {
		event.preventDefault();
		var btn = this,
		    hiddenMsg = this.dataset.msg || "",
		    popup = document.querySelector('.popup--order'),
		    popupForm = popup.querySelector('.form'),
		    hiddenInput = popupForm.querySelector('.form__hidden'),
		    formInput = popupForm.querySelector('.form__input'),
		    closePopup = popup.querySelector('.btn--close-popup'),
		    action = popupForm.action,
		    method = popupForm.method;

		hiddenInput.value = hiddenMsg;
		popup.classList.add('popup--active');

		closePopup.addEventListener('click', function (e) {
			e.preventDefault();
			popup.classList.remove('popup--active');
		});

		// FIXME: и каждую отправку навешиваем новый листенер...
		popupForm.addEventListener('submit', function (ev) {
			ev.preventDefault();
			var data = {
            tel: formInput.value,
            hidden: hiddenInput.value
          };
      request(method, action, data, function (response) {
        if (response === 'OK') {
          swal('Отличное решение!', 'Мы свяжемся с Вами в ближайшее время!', 'success');
        }
        else {
          swal('Что-то пошло не так!', 'Попробуйте нам позвонить!', 'error');
        }
        formInput.value = "";
        hiddenInput.value = "";
        popup.classList.remove('popup--active');
      });
		});
	};

	var _fixHeader = function (wOffset) {
		var header = document.querySelector('.main-header'),
		    nav = header.querySelector('.main-nav');

		if (wOffset > 0) {
			header.classList.add('main-header--moved');
			nav.classList.add('main-nav--moved');
		}

		else {
			header.classList.remove('main-header--moved');
			nav.classList.remove('main-nav--moved');
		}
	};

	function request(method, url, data, fn) {
    var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });
    xhr.send(JSON.stringify(data));
  };

  var _sendMail = function (event) {
  	event.preventDefault();

  	var form = this,
  	    mail = form.querySelector('.form__input[type="email"]'),
  	    name = form.querySelector('.form__input[type="text"]'),
  	    msg = form.querySelector('.form__textarea'),
  	    method = form.method,
  	    action = form.action,
  	    data = {
            mail: mail.value,
            name: name.value,
            msg: msg.value
          };

  	request(method, action, data, function (response) {
      if (response === 'OK') {
        swal('Мы получили ваше сообщение!', 'Ответим в ближайшее время!', 'success');
      }
      else {
        swal('Что-то пошло не так!', 'Попробуйте нам позвонить!', 'error');
      }
      mail.value = "";
      name.value = "";
      msg.value = "";
    });
  };

  var _subscribe = function (event) {
  	event.preventDefault();

  	var form = this,
  	    mail = form.querySelector('.form__input[type="email"]'),
  	    method = form.method,
  	    action = form.action,
  	    data = {
            mail: mail.value
          };

  	request(method, action, data, function (response) {
      if (response === 'OK') {
        swal('Подписка оформлена!', 'Полезные материалы скоро будут отправлены вам на почту.', 'success');
      }
      else {
        swal('Что-то пошло не так!', 'Исправим в скором времени!', 'error');
      }
      mail.value = "";
    });
  };

  var _sendPhone = function (event) {
  	event.preventDefault();

  	var form = this,
  	    tel = form.querySelector('.form__input[type="tel"]'),
  	    method = form.method,
  	    action = form.action,
  	    data = {
            tel: tel.value,
            hidden: 'Три шага'
          };

  	request(method, action, data, function (response) {
      if (response === 'OK') {
        swal('Отличное решение!', 'Мы свяжемся с Вами в ближайшее время!', 'success');
      }
      else {
        swal('Что-то пошло не так!', 'Попробуйте нам позвонить!', 'error');
      }
      tel.value = "";
    });
  };

	var _advantagesSectionAnimate = function (wOffset) {
		var advantagesSection = document.querySelector('.advantages-section'),
		    advantagesSectionYOffset = advantagesSection.offsetTop - 100;

  	if (advantagesSection.classList.contains('advantages-section--animated')) return;

    if (advantagesSectionYOffset <= wOffset) {
      advantagesSection.classList.add('advantages-section--animated');

      var advantagesSection__item = advantagesSection.querySelectorAll('.advantages-section__item'),
          advantagesSection__btn = advantagesSection.querySelector('.btn'),
          i = 0,
          timingDelay = 500;

      for (var i = 0; i < 3; i++) {
      	var animate = function (number) {
      		setTimeout(function () {
	      		advantagesSection__item[number].classList.add('advantages-section__item--active');
	      	}, 2 * number * timingDelay);

	      	setTimeout(function () {
	      		advantagesSection__item[number].classList.remove('advantages-section__item--active');
	      	}, 2 * number * timingDelay + timingDelay + 100);
      	}
      	animate(i);
      }

      setTimeout(function () {
	      advantagesSection__btn.classList.add('btn--main');
	    }, 2 * i * timingDelay);
  	};
	};

	var _scrollFunctions = function () {
		var w = window,
		    wOffset = w.pageYOffset;

		_fixHeader(wOffset);
		_advantagesSectionAnimate(wOffset);
	};

	// Находит все табы на странице и вешает прослушку на кнопки смены таба
	var _changeTabs = function () {
		var tabsSectionTop = document.querySelector('.tabs-section--top'),
			  tabsSectionTop__tabs = tabsSectionTop.querySelectorAll('.tabs-section__tab'),
			  tabsSectionTop__items = tabsSectionTop.querySelectorAll('.tabs-section__content-item');

			// Вешает прослушку на кнопки
			for (var jtop = 0; jtop < tabsSectionTop__tabs.length; jtop++) {
				tabsSectionTop__tabs[jtop].addEventListener('click', function (event) {
					event.preventDefault();

					// Снимает активны класс у кнопок и содержимого
					for (var ttop = 0; ttop < tabsSectionTop__items.length; ttop++) {
						tabsSectionTop__tabs[ttop].classList.remove('tabs-section__tab--active');
						tabsSectionTop__items[ttop].classList.remove('tabs-section__content-item--active');
					}

					this.classList.add('tabs-section__tab--active');

					for (var ttop = 0; ttop < tabsSectionTop__items.length; ttop++) {
						if (this.dataset.number === tabsSectionTop__items[ttop].dataset.number) {
							var animateBlock = tabsSectionTop__items[ttop];
							setTimeout(function () {
								animateBlock.classList.add('tabs-section__content-item--active');
								animateBlock.querySelector('.tabs-section__svg-fire').classList.add('tabs-section__svg-fire--animate');
							}, 400);
						}
					}
				});
			}
	};

	// Находит все табы на странице и вешает прослушку на кнопки смены таба
	var _changeInlineTabs = function () {
		var tabsSection = document.querySelector('.tabs-section--inline'),
		    tabsSection__tabsContainer = tabsSection.querySelector('.tabs-section__tabs'),
			  tabsSection__tabs = tabsSection.querySelectorAll('.tabs-section__tab'),
			  tabsSection__items = tabsSection.querySelectorAll('.tabs-section__content-item');


			// Вешает прослушку на кнопки
			for (var j = 0; j < tabsSection__tabs.length; j++) {
				tabsSection__tabs[j].addEventListener('click', function (event) {
					event.preventDefault();

					// Снимает активны класс у кнопок и содержимого
					for (var t = 0; t < tabsSection__items.length; t++) {
						tabsSection__tabs[t].classList.remove('tabs-section__tab--active');
						tabsSection__items[t].classList.remove('tabs-section__content-item--active');
						tabsSection__tabsContainer.classList.remove('tabs-section__tabs--design');
					}

					this.classList.add('tabs-section__tab--active');

					for (var t = 0; t < tabsSection__items.length; t++) {
						if (this.dataset.number === tabsSection__items[t].dataset.number) {

							if (this.dataset.number === '1') {
								var animateTabsSection = tabsSection__tabsContainer;
							  setTimeout(function () {
								  animateTabsSection.classList.add('tabs-section__tabs--design');
							  }, 400);
							}
							var animateBlock = tabsSection__items[t];
							setTimeout(function () {
								animateBlock.classList.add('tabs-section__content-item--active');
							}, 400);
						}
					}
				});
			}
	};

	var _goodsCard = function () {
		var goodsCards = document.getElementsByClassName('goods-card');

		for (var i = 0; i < goodsCards.length; i++) {
			if (goodsCards[i].getElementsByClassName('goods-card__slider')) {
				var goodsSlider = goodsCards[i].querySelector('.goods-card__slider'),
				    goodsSliderControls = goodsSlider.getElementsByClassName('goods-card__slides-link'),
				    goodsSliderCurrent = goodsSlider.querySelector('.goods-card__slide-current'),
				    goodsSliderImg = goodsSliderCurrent.querySelector('img');

				for (var i = 0; i < goodsSliderControls.length; i++) {
					goodsSliderControls[i].addEventListener('click', function () {
						var control = this,
						    img = control.querySelector('img'),
						    newSrc = img.src;

						if (control.classList.contains('goods-card__slides-link--active')) {
							return;
						}

						goodsSliderCurrent.classList.add('goods-card__slide-current--opacity');

						var ShowImgTimer = window.setTimeout(function () {
							goodsSliderImg.src = newSrc;
							goodsSliderCurrent.classList.remove('goods-card__slide-current--opacity');
						}, 300);

						for (var i = 0; i < goodsSliderControls.length; i++) {
							goodsSliderControls[i].classList.remove('goods-card__slides-link--active');
						}
						control.classList.add('goods-card__slides-link--active');
					})
				}
			}
		}
	};

	return {
		init: init
	};

})();

mainModule.init();
