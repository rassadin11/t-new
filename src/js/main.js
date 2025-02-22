import IMask from 'imask';
import map from './map.js'

// грузим карту
map();

// iframes

let yboxs = document.querySelectorAll("iframe[data-src*='rutube']");
if (yboxs.length) {
    yboxs.forEach((element) => {
        let match = element.getAttribute("data-src").match(/\/embed\/([^?]+)/);
        let thumb = match[1];
        // element.classList.add("img-rounded", "shadow-xl");
        element.srcdoc =
            "<style>*{padding:0;margin:0;box-sizing:border-box}a,img{display:block;position:absolute;top:0;left:0;width:100%;height:100%}a:after, a:before{position:absolute;content:'';left:50%;top:50%;display:block;z-index:1}a:before{width:100%;height:100%;z-index:1;position:absolute;top:0;left:0;background:rgba(77, 94, 255, 0.2);}</style><a href='" +
            element.getAttribute("data-src") +
            `' rel='nofollow noopener'>
            <svg data-testid="play-icon" viewBox="0 0 58 52" fill="none" xmlns="http://www.w3.org/2000/svg" style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 58px;
                height: 68px;
                z-index: 1;">
                <path d="M49.5 24.926C52.8333 26.8505 52.8333 31.6618 49.5 33.5863L7.50001 57.835C4.16668 59.7595 1.30768e-06 57.3539 1.47592e-06 53.5049L3.59581e-06 5.00747C3.76406e-06 1.15846 4.16667 -1.24717 7.5 0.677329L49.5 24.926Z" fill="#4D5EFF" fill-opacity="0.2"/>
            </svg>
          <img loading=lazy decoding=async src='https://rutube.ru/api/video/${thumb}/thumbnail/?redirect=1' alt='Запустить видео'></a>`;
    });
}

// input

const inputs = document.querySelectorAll('.search-input')

inputs.forEach(item => {
    item.addEventListener('focus', (e) => {
        e.target.parentNode.classList.toggle('focus');
    })

    item.addEventListener('blur', (e) => {
        e.target.parentNode.classList.toggle('focus');
    })
})

// dropdown menu pc

const dropdowns = document.querySelectorAll('.menu__dropdown');

function dropdownMenu() {
    if (document.body.clientWidth > 1500) {
        dropdowns.forEach((item) => {
            const navLink = item.querySelector('.nav-link');

            item.addEventListener('mouseover', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    item.querySelector('.dropdown-menu').classList.add('active');
                    navLink.querySelector('.menu__arrow-dropdown').classList.add('active');
                }
            })

            item.addEventListener('mouseleave', () => {
                item.querySelector('.dropdown-menu').classList.remove('active');
                navLink.querySelector('.menu__arrow-dropdown').classList.remove('active');
            })
        })
    } else {
        dropdowns.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('.uslugi__item')) {
                    dropdowns.forEach((elem, idx) => {
                        if (idx !== index) {
                            elem.classList.remove('active')
                            elem.querySelector('.nav-link').classList.remove('active');
                            elem.querySelector('.dropdown-menu').classList.remove('active');
                            elem.querySelector(".menu__arrow-dropdown").classList.remove('active')
                        }
                    });
                }

                item.classList.toggle('active');
                item.querySelector('.nav-link').classList.toggle('active');
                item.querySelector('.dropdown-menu').classList.toggle('active');
            })
        })

        const uslugi = document.querySelectorAll('.item-uslugi__title');
        uslugi.forEach((item) => {
            item.addEventListener('click', (e) => {
                document.querySelector('.mobile__sub-menu').classList.toggle('active')
                document.querySelector('.navbar-collapse').classList.add('overflow-hidden')

                configScreen(item);
                e.stopPropagation();
                e.preventDefault();
            })
        })

        const links = document.querySelectorAll(".nav-link")
        links.forEach(item => {
            if (item.querySelector(".menu__arrow-dropdown")) {
                item.addEventListener('click', (e) => {
                    item.querySelector(".menu__arrow-dropdown").classList.toggle('active')

                    if (e.target.nodeName !== "SPAN") {
                        e.preventDefault();
                    }
                })
            }
        })
    }
}

dropdownMenu();

window.onresize = () => {
    dropdownMenu();
};

function configScreen(item) {
    document.querySelector(".header__menu").scroll(0, 0)
    const children = item.parentNode.children;
    const ul = document.querySelector('.sub-list.uslugi-mobile')
    ul.innerHTML = '';

    document.querySelector('.menu-social p').innerHTML = children[0].querySelector("span").innerHTML;
    let count = 1;

    while (count < children.length) {
        const li = document.createElement('li');
        li.classList.add('sub-list__item');
        li.classList.add('tab');

        if (count + 1 !== children.length && children[count + 1].nodeName === 'UL' && children[count].nodeName === 'A') {
            let lis = '';

            children[count + 1].querySelectorAll(':scope > li').forEach(item => {
                if (!item.querySelector('ul')) {
                    lis += `<li class="sub-list__item ms-4"><a class="dropdown-item py-3 px-4" href="#">${item.querySelector('a').innerHTML}</a></li>`
                } else {
                    let temp;
                    const deep_li = item.querySelectorAll('li')

                    deep_li.forEach(elem => {
                        temp = `<li class="sub-list__item deep-list ms-4"><a class="dropdown-item py-3 px-4" href="#">${elem.querySelector('a').innerHTML}</a></li>`
                    })

                    lis += `
                        <li class="sub-list__item deep-list ms-4 d-flex flex-column gap-2">
                            <a class="dropdown-item py-3 px-4" href="#">${item.querySelector('a').innerHTML}</a>

                            <ul class="d-flex flex-column gap-2">
                                ${temp}
                            </ul>
                        </li>
                    `
                }
            })

            li.insertAdjacentHTML('beforeend', `
                <li class="sub-list__item deep-list">
                    <a class="dropdown-item py-3 px-4" href="#">${children[count].innerHTML}</a>

                    <ul class="d-flex flex-column gap-2 mt-2">
                        ${lis}
                    </ul>
				</li>

            `)

            count += 2;
        }
        else {
            li.insertAdjacentHTML('beforeend', `
                <a class="align-items-center d-flex nav-link py-3 px-4" href="${children[count].href}" role="button">
					${children[count].innerHTML}
				</a>`)
            count++;
        }

        ul.append(li)
    }

    const links = document.querySelectorAll(".nav-link")
    links.forEach(item => {
        if (item.querySelector(".menu__arrow-dropdown")) {
            item.addEventListener('click', (e) => {
                if (e.target.nodeName !== "SPAN") {
                    e.preventDefault();
                }
            })
        }
    })

    const sublist = document.querySelectorAll('.sub-list__link')

    sublist.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            sublist.forEach((elem, idx) => {
                if (i !== idx && elem.nextElementSibling !== item.parentNode) {
                    elem.classList.remove('active');
                    const dropdown = elem.parentNode.querySelector('.default-dropdown');
                    dropdown.classList.remove('active');
                    dropdown.style.maxHeight = 0;
                }
            })

            if (!item.classList.contains('active')) {
                item.parentNode.querySelector('.default-dropdown').style.maxHeight = Array.from(ul.querySelectorAll('.default-dropdown li')).reduce((acc, item) => acc += item.clientHeight, 0) + 10 + 'px'
            } else {
                item.parentNode.querySelector('.default-dropdown').style.maxHeight = 0
            }

            item.classList.toggle('active');
            item.parentNode.querySelector('.default-dropdown').classList.toggle('active')
        })
    })
}

document.querySelector('.sub-menu__arrow-dropdown').addEventListener('click', () => {
    document.querySelector('.mobile__sub-menu').classList.remove('active')
    document.querySelector('.navbar-collapse').classList.remove('overflow-hidden')
})

// burger large screens
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const background = document.querySelector('.background-mobile');
const cross = document.querySelectorAll('.cross')

function isBurgerOpen() {
    return burger.classList.contains('active');
}

function changeMenu() {
    burger.classList.remove('active');
    menu.classList.remove('active');
    background.classList.remove('active');

    menu.classList.add('hide');
    background.classList.add('hide');

    setTimeout(() => {
        menu.classList.remove('hide');
        background.classList.remove('hide');
    }, 300)

    dropdowns.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.nav-link').classList.remove('active');
        item.querySelector('.dropdown-menu').classList.remove('active');

        setTimeout(() => {
            document.querySelector('.mobile__sub-menu').classList.remove('active')
            document.querySelector('.navbar-collapse').classList.remove('overflow-hidden')
        }, 300)
    })
}

burger.addEventListener('click', () => {
    if (!isBurgerOpen) {
        document.body.classList.remove('overflow-hidden')
    } else {
        menu.classList.add('active');
        background.classList.add('active');
        document.body.classList.add('overflow-hidden')

        dropdowns.forEach((item) => {
            item.classList.remove('active')
            item.querySelector('.nav-link').classList.remove('active');
            item.querySelector('.dropdown-menu').classList.remove('active');
            item.querySelector(".menu__arrow-dropdown").classList.remove('active')
        })
    }
})

cross.forEach(item => {
    item.addEventListener('click', () => {
        if (isBurgerOpen) {
            document.body.classList.remove('overflow-hidden')
            changeMenu();
        } else {
            menu.classList.add('active');
            background.classList.add('active');
            document.body.classList.add('overflow-hidden')
        }
    })
})

background.addEventListener('click', () => {
    if (isBurgerOpen) {
        document.body.classList.remove('overflow-hidden')
        changeMenu();
    } else {
        menu.classList.add('active');
        background.classList.add('active');
    }
})

// main

function detecDevice() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        return true
    } else {
        return false
    }
}

const isMobile = detecDevice();

if (isMobile) {
    document.querySelectorAll('.add-scroll').forEach(item => {
        item.classList.add('xs-x-scroll')
    })
}

// tabs

const tabsServices = document.querySelectorAll('.tabs-services > .tab')

tabsServices.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabsServices.forEach((item, idx) => {
            if (index !== idx) {
                item.classList.remove('active')
                item.querySelector('.tab-title').classList.remove('active')
                item.querySelector('.tab-list p-0').classList.remove('active');
            }
        })

        tab.classList.toggle('active')
        tab.querySelector('.tab-title').classList.toggle('active')
        tab.querySelector('.tab-list p-0').classList.toggle('active');
    })
})


if (matchMedia('only screen and (min-width: 991px)').matches) {
    // arrow

    const arrow = document.querySelector('.arrow-wrapper');
    const height = document.documentElement.clientHeight;

    if (arrow) {
        if (window.scrollY < height * 2) {
            arrow.classList.add('hidden')
        } else {
            arrow.classList.remove('hidden')
        }

        window.addEventListener('scroll', e => {
            if (window.scrollY < height * 2) {
                arrow.classList.add('hidden')
            } else {
                arrow.classList.remove('hidden')
            }
        })
    }

    // phone input
    let elements = document.querySelectorAll('#phone');

    let maskOptions = {
        mask: '+7 - 000 - 000 - 00 - 00',
        lazy: false
    }

    let telephoneMasks = []

    elements.forEach(element => {
        let mask = new IMask(element, maskOptions);
        telephoneMasks.push(mask);
    })

    let elements2 = document.querySelectorAll('#email');

    let maskOptions2 = {
        mask: function (value) {
            if (/^[a-z0-9_\.-]+$/.test(value))
                return true;
            if (/^[a-z0-9_\.-]+@$/.test(value))
                return true;
            if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
                return true;
            if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
                return true;
            if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
                return true;
            if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
                return true;
            if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
                return true;
            return false;
        },
        lazy: false
    }

    let emailMasks = []

    elements2.forEach(element2 => {
        let mask2 = new IMask(element2, maskOptions2);
        emailMasks.push(mask2);
    })
}

const yandexMap = document.querySelectorAll('.map-disable')

yandexMap.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.add('active')
    })
})

// calc results

function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const resultsCalc = document.querySelector('.results-wrap.d-md-flex')
const resultsFixed = document.querySelector('.results-block');
const footer = document.querySelector('footer');

const calculator = document.querySelector(".calculator");

const toggleResults = () => {
    if (!calculator) return;

    if (!resultsCalc || document.body.clientWidth < 768) {
        if (calculator.offsetTop + calculator.getBoundingClientRect().top / 2 > window.scrollY || calculator.offsetTop + calculator.clientHeight < window.scrollY) {
            resultsFixed.classList.add('hide')
        } else {
            resultsFixed.classList.remove('hide')
        }
    } else {
        if (isInViewport(resultsCalc) || isInViewport(footer)) {
            resultsFixed.classList.add('hide')
        } else {
            resultsFixed.classList.remove('hide')
        }
    }
}

window.addEventListener('scroll', () => {
    toggleResults();
})