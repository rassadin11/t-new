
import IMask from 'imask';

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
                document.querySelector('.header__menu .navbar-nav').classList.add('overflow-hidden')

                configScreen(item);
                e.stopPropagation();
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
    const children = item.parentNode.children;
    const ul = document.querySelector('.sub-list.uslugi-mobile')
    ul.innerHTML = '';

    document.querySelector('.menu-social p').innerHTML = children[0].querySelector("span").innerHTML;
    let count = 1;

    while (count < children.length - 1) {
        const li = document.createElement('li');
        li.classList.add('sub-list__item');
        li.classList.add('tab');

        if (children[count + 1].nodeName === 'UL' && children[count].nodeName === 'A') {
            let lis = '';

            children[count + 1].querySelectorAll(':scope > li').forEach(item => {
                if (!item.querySelector('ul')) {
                    lis += `<li class="sub-list__item"><a class="dropdown-item py-3 px-4" href="#">${item.querySelector('a').innerHTML}</a></li>`
                } else {
                    let temp;
                    const deep_li = item.querySelectorAll('li')

                    deep_li.forEach(elem => {
                        temp = `<li class="sub-list__item deep-list w-100"><a class="dropdown-item py-3 px-4" href="#">${elem.querySelector('a').innerHTML}</a></li>`
                    })

                    lis += `
                        <a class="nested-dropdown align-items-center d-flex tab-title nav-link c-white gap-3 py-2 px-3 sub-list__link justify-content-between" href="#" role="button">
                            <span>${item.querySelector('a').innerHTML}</span>
                            <svg class="menu__arrow-dropdown">
                                <use href="./img/svg/sprite.svg#menu_arrow"></use>
                            </svg>
                        </a>

                        <ul class="dropdown-menu header__dropdown default-dropdown right list tab-list p-0 gap-2 deep-ul d-block overflow-hidden mb-0" aria-labelledby="menu3">
                           ${temp}
                        </ul>
                    `
                }
            })

            li.insertAdjacentHTML('beforeend', `
                <a class="align-items-center d-flex tab-title nav-link c-white gap-3 py-2 px-3 sub-list__link justify-content-between" href="#" role="button">
					<span>${children[count].innerHTML}</span>
					<svg class="menu__arrow-dropdown">
						<use href="./img/svg/sprite.svg#menu_arrow"></use>
					</svg>
				</a>

				<ul class="dropdown-menu header__dropdown default-dropdown right gap-2 list tab-list p-0 mb-0" aria-labelledby="menu3">
                    ${lis}
				</ul>
            `)

            count += 2;
        } else {
            li.insertAdjacentHTML('beforeend', `
                <a class="align-items-center d-flex nav-link c-white" href="${children[count].href}" role="button">
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
    document.querySelector('.header__menu .navbar-nav').classList.remove('overflow-hidden')
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

    burger.classList.add('hide');
    menu.classList.add('hide');
    background.classList.add('hide');

    setTimeout(() => {
        burger.classList.remove('hide');
        menu.classList.remove('hide');
        background.classList.remove('hide');
    }, 300)


    dropdowns.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.nav-link').classList.remove('active');
        item.querySelector('.dropdown-menu').classList.remove('active');

        setTimeout(() => {
            document.querySelector('.mobile__sub-menu').classList.remove('active')
        }, 300)
    })
}

burger.addEventListener('click', () => {
    if (!isBurgerOpen) {
        document.body.classList.remove('overflow-hidden')
        changeMenu();
    } else {
        burger.classList.add('active');
        menu.classList.add('active');
        background.classList.add('active');
        document.body.classList.add('overflow-hidden')
    }
})

cross.forEach(item => {
    item.addEventListener('click', () => {
        if (isBurgerOpen) {
            document.body.classList.remove('overflow-hidden')
            changeMenu();
        } else {
            burger.classList.add('active');
            menu.classList.add('active');
            background.classList.add('active');
            document.body.classList.add('overflow-hidden')
        }
    })
})

background.addEventListener('click', () => {
    if (isBurgerOpen) {
        changeMenu();
    } else {
        burger.classList.add('active');
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

// // arrow

// const arrow = document.querySelector('.arrow-wrapper');

// if (document.body.getBoundingClientRect().y === 0) {
//     arrow.classList.add('hidden')
// } else {
//     arrow.classList.remove('hidden')
// }

// window.addEventListener('scroll', e => {
//     if (document.body.getBoundingClientRect().y === 0) {
//         arrow.classList.add('hidden')
//     } else {
//         arrow.classList.remove('hidden')
//     }
// })

// // phone input
// let elements = document.querySelectorAll('#phone');

// let maskOptions = {
//     mask: '+7 - 000 - 000 - 00 - 00',
//     lazy: false
// }

// let telephoneMasks = []

// elements.forEach(element => {
//     let mask = new IMask(element, maskOptions);
//     telephoneMasks.push(mask);
// })

// let elements2 = document.querySelectorAll('#email');

// let maskOptions2 = {
//     mask: function (value) {
//         if (/^[a-z0-9_\.-]+$/.test(value))
//             return true;
//         if (/^[a-z0-9_\.-]+@$/.test(value))
//             return true;
//         if (/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
//             return true;
//         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
//             return true;
//         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
//             return true;
//         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
//             return true;
//         if (/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
//             return true;
//         return false;
//     },
//     lazy: false
// }

// let emailMasks = []

// elements2.forEach(element2 => {
//     let mask2 = new IMask(element2, maskOptions2);
//     emailMasks.push(mask2);
// })