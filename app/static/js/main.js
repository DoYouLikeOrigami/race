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

	// Video
	(function() {
		// Video
		var videoContainers = document.querySelectorAll(".video__container");

		Array.prototype.forEach.call(videoContainers, function(videoContainer) {
			var video = videoContainer.querySelector('.video__video');
			// Buttons
			var playButton = videoContainer.querySelector(".video__play");
			var playButtonOnBar = videoContainer.querySelector(".video__play-btn");

			// Sliders
			var seekBar = videoContainer.querySelector(".video__progress-bar");


			// Event listener for the play/pause
			video.addEventListener("click", function() {
				if (video.paused == true) {
					video.play();
					playButton.classList.add("hidden");
					playButtonOnBar.classList.add("video__play-btn_pause");
				} else {
					video.pause();
					playButton.classList.remove("hidden");
					playButtonOnBar.classList.remove("video__play-btn_pause");
				}
			});

			playButtonOnBar.addEventListener("click", function() {
				if (video.paused == true) {
					video.play();
					playButton.classList.add("hidden");
					this.classList.add("video__play-btn_pause");
				} else {
					video.pause();
					playButton.classList.remove("hidden");
					this.classList.remove("video__play-btn_pause");
				}
			});

			// Event listener for the fullscreen
			video.addEventListener("dblclick", function() {
				if (video.requestFullscreen == true) {
					video.requestFullscreen();
				} else if (video.mozRequestFullScreen) {
					video.mozRequestFullScreen(); // Firefox
				} else if (video.webkitRequestFullscreen) {
					video.webkitRequestFullscreen(); // Chrome and Safari
				}
			});


			// Event listener for the seek bar
			seekBar.addEventListener("change", function() {
				// Calculate the new time
				var time = video.duration * (seekBar.value / 100);

				// Update the video time
				video.currentTime = time;
			});

			// Update the seek bar as the video plays
			video.addEventListener("timeupdate", function() {
				// Calculate the slider value
				var value = (100 / video.duration) * video.currentTime;

				// Update the slider value
				seekBar.value = value;
			});
		});
	})();

	// Video slider
	(function() {
		var sliderNode = document.querySelector('.video--multiple');

		if (! sliderNode) return false

		var slider = new Swiper('.video--multiple', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			slidesPerView: 3,
			spaceBetween: 30,
			breakpoints: {
				600: {
					slidesPerView: 1
				},
				900: {
					slidesPerView: 2
				}
			}
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
	/*
	(function() {
		var tabBtns = document.querySelectorAll('.result__slides-item');
		var tabs = document.querySelectorAll('.result__work-current');
		var activeTabClass = 'result__work-current--active';

		tabs[0].classList.add(activeTabClass);

		Array.prototype.forEach.call(tabBtns, function(tabBtn, index) {
			tabBtn.addEventListener('mousedown', function(event) {
				console.log(event, tabBtn, index);

				Array.prototype.forEach.call(tabs, function(tab) {
					tab.classList.remove(activeTabClass);
				});

				var currentTab = tabs[index];
				if (currentTab) {
					currentTab.classList.add(activeTabClass);
				}
			});
		});
	})();*/
}

var portfolio__top = new Swiper('.portfolio__top', {
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	spaceBetween: 10,
	autoplay: 2500,
	effect: 'fade'
});

var portfolio__thumbs = new Swiper('.portfolio__thumbs', {
	spaceBetween: 10,
	centeredSlides: true,
	slidesPerView: 4,
	touchRatio: 0.2,
	slideToClickedSlide: true
});

portfolio__top.params.control = portfolio__thumbs;
portfolio__thumbs.params.control = portfolio__top;
