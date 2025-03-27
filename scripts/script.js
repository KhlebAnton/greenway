const scrLoader = document.querySelector('.screen_loader');

function showLoader() {
    scrLoader.classList.remove('hidden')
}
function hideLoader() {
    scrLoader.classList.add('hidden');
}
// Инициализация анимации
const loaderAnim = lottie.loadAnimation({
    container: document.getElementById('loader'),
    loop: true,
    autoplay: true,
    path: './loader.json' // Укажите правильный путь к файлу
});


const btnNav = document.querySelector('.btn_nav');
const navMenu = document.querySelector('.screen_menu')

// открытие меню кнопки "Навигация"
let showRoom = false;
let idRoom = 0;
btnNav.addEventListener('click', () => {
    if (!showRoom) {
        getIdRoomVisible();
        hideSrcRoom();
        
        showRoom = true;
        showNavMenu();

    } else {
        showRoom = false;
        hideNavMenu();
        
        showSrcRoom(idRoom)
    }


});
const screenRoom = document.querySelectorAll('.screen_room');
const roomWrapperImgs = document.querySelectorAll('.menu-item__img-wrapper');


function getIdRoomVisible() {
    screenRoom.forEach(room => {
        if(!room.classList.contains('hidden')) {
            idRoom = room.getAttribute('data-room')
        }
    })
}
roomWrapperImgs.forEach(el => {
    el.addEventListener('click', () => {
        openRoom(el);
        showRoom = false;
        hideNavMenu();

    })
})

function openRoom(el) {

    let id = el.closest('.menu-item').getAttribute('data-room');
    showSrcRoom(id);
    
};

function showSrcRoom(id) {
    screenRoom.forEach(room => {
        if (id === room.getAttribute('data-room')) {
            room.classList.remove('hidden');
            showPopupStart(room.querySelector('.popup_start'))
        } else {

        };

    })

};
function hideSrcRoom() {
    screenRoom.forEach(room => {
        room.classList.add('hidden');

    });

};

function showNavMenu() {
    btnNav.classList.add('anim');

    setTimeout(() => {
        btnNav.classList.add('btn_nav_open');

        setTimeout(() => {
            btnNav.classList.remove('anim');
        }, 100);
    }, 200);

};

function hideNavMenu() {
    btnNav.classList.add('anim');

    setTimeout(() => {
        btnNav.classList.remove('btn_nav_open');

        setTimeout(() => {
            btnNav.classList.remove('anim');
        }, 100);
    }, 200);

}

const btnSound = document.querySelector('.btn_sound');
btnSound.addEventListener('click', () => {
    toggleSound();
});
function toggleSound() {
    btnSound.classList.toggle('sound-off')
};


var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: false,
    mousewheel: true,

});


const slides = document.querySelectorAll('.swiper-slide');
slides.forEach((slide) => {
    slide.addEventListener('click', () => {
        const index = parseInt(slide.getAttribute('data-index'), 10);
        swiper.slideTo(index, 500);
    });
});

window.addEventListener('resize', () => {
    swiper.update()
})






// Инициализация анимации
const animation = lottie.loadAnimation({
    container: document.getElementById('volume-animation'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: './volume.json' 
});

// Состояние звука
let isMuted = false;
let animationSpeed = 1;

// Обработчик клика
document.getElementById('volume-animation').addEventListener('click', function () {
    isMuted = !isMuted;

    if (isMuted) {
        // Воспроизводим анимацию в обратном направлении (к состоянию mute)
        animation.setDirection(1);
        animation.play();
    } else {
        // Воспроизводим анимацию в прямом направлении (к состоянию unmute)
        animation.setDirection(-1);
        animation.play();
    }
});



// элементы 
// const btnVideo = document.querySelector('.btn_video');

// function showBtnVideo() {
//     btnVideo.classList.remove('hidden');
// };
// function hideBtnVideo() {
//     btnVideo.classList.add('hidden');
// };

// const itemBtn = document.querySelector('.popup_item__btn_popup');

// itemBtn.addEventListener('click', () => {
//     showItemPopup();
// })

// function showItemBtn() {
//     itemBtn.classList.remove('hidden');
// };
// function hideItemBtn() {
//     itemBtn.classList.add('hidden');
// };

const popupItems = document.querySelectorAll('.popup_item');

popupItems.forEach(popup=> {
    const closePopupBtn = popup.querySelector('.popup_item__close');
    closePopupBtn.addEventListener('click', () => {
        hideItemPopup(popup)
    });
    

})





function showItemPopup(name) {
    popupItems.forEach(popup=> {
        if(popup.getAttribute('data-name') === name) {
            popup.classList.remove('hidden');
        }
    });
   
};
function hideItemPopup(popupElement) {
    popupElement.classList.add('hidden');
};

const popupWin = document.querySelector('.popup_win');
const btnPopupWin = popupWin.querySelector('.popup_btn');
const closepopupWin = popupWin.querySelector('.popup__close');

btnPopupWin.addEventListener('click', () => {
    hideWinPopup()
});
closepopupWin.addEventListener('click', () => {
    hideWinPopup()
});

function showWinPopup() {
    popupWin.classList.remove('hidden');
};
function hideWinPopup() {
    popupWin.classList.add('hidden');
};


// start popup

function showPopupStart(popupElement) {
    popupElement.classList.remove('hidden');
}

function hidePopupStart(popupElement) {
    popupElement.classList.add('hidden');
    
}



// Инициализация всех попап-слайдеров
function initializeAllPopupSliders() {
    document.querySelectorAll('.popup_start').forEach(popupStart => {
        const popupSlider = popupStart.querySelector('.popup_slider');
        if (popupSlider) {
            createStartSlider(popupSlider, popupStart);
        }
    });
}

// Основная функция для создания слайдера
function createStartSlider(popupSlider, popupStart) {
    const pages = popupSlider.querySelectorAll('.popup_block__page_slide');
    const paginationContainer = popupStart.querySelector('.page-slide_paginations');
    const nextButton = popupStart.querySelector('.popup_btn');
    const closeButton = popupStart.querySelector('.popup__close');
    let currentPage = 0;

    // Создаем пагинацию

    function createPagination() {
        paginationContainer.innerHTML = '';
        pages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'pagination-dot';
            if (index === currentPage) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToPage(index);
            });
            paginationContainer.appendChild(dot);
        });
    }

    function goToPage(index) {
        if (index >= 0 && index < pages.length) {
            const currentActive = popupSlider.querySelector('.popup_block__page.active');
            if (currentActive) {
                currentActive.classList.add('anim-out');
                currentActive.classList.remove('active');

                setTimeout(() => {
                    currentActive.classList.remove('anim-out');
                }, 500);
            }

            pages[index].classList.add('anim-in');
            pages[index].classList.add('active');

            setTimeout(() => {
                pages[index].classList.remove('anim-in');
            }, 500);

            currentPage = index;
            updatePagination();
            updateButtonText();
        }
    }

    function updatePagination() {
        const dots = popupStart.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateButtonText() {
        if (currentPage === pages.length - 1) {
            nextButton.textContent = 'Начать';
            nextButton.classList.add('start');
        } else {
            nextButton.textContent = 'Далее';
            nextButton.classList.remove('start');
        }
    }

    // Инициализация слайдера
    createPagination();
    updateButtonText();

    nextButton.addEventListener('click', function () {
        if (currentPage < pages.length - 1) {
            goToPage(currentPage + 1);
        } else {
            hidePopupStart(popupStart);
            goToPage(0)
        }
    });

    closeButton.addEventListener('click', function () {
        hidePopupStart(popupStart);
        goToPage(0)
    });
}

// test btn





const testBtnPopupWin = document.querySelector('.btn_test_popup_win');
testBtnPopupWin.addEventListener('click', (e) => {
    e.stopPropagation()
    showWinPopup();
})


document.addEventListener('DOMContentLoaded', () => {


    // fake load
    setTimeout(() => {
        
        initializeAllPopupSliders()
        hideLoader();
    }, 2000);


});
