
export default function map() {
    if (window.location.pathname === '/') {
        loadMap();
    }
}

function loadMap() {
    let map = document.querySelector('.map1')
    let mapDots = document.querySelector('.map-dots')
    let coords = [
        {
            position: [53, 8],
            text: 'г. Ростов-на-Дону',
            size: 12,
        },
        {
            position: [23, 15.5],
            text: 'г. Санкт-Петербург',
            size: 15,
        },
        {
            position: [71, 48.5],
            text: 'г. Красноярск',
            size: 15,
        },
        {
            position: [34, 13],
            text: 'г. Москва',
            size: 20,
        },
        {
            position: [80, 41.5],
            text: 'г. Барнаул',
            size: 12,
        },
        {
            position: [75, 41],
            text: 'г. Новосибирск',
            size: 12,
        },
        {
            position: [35.5, 22],
            text: 'г. Нижний Новгород',
            size: 12,
        },
        {
            position: [71, 34.5],
            text: 'г. Омск',
            size: 12,
        },
        {
            position: [57, 28],
            text: 'г. Екатеринбург',
            size: 12,
        },
        {
            position: [54, 18],
            text: 'г. Самара',
            size: 12,
        },
        {
            position: [75, 43.5],
            text: 'г. Кемерово',
            size: 12,
        },
        {
            position: [61, 5],
            text: 'г. Краснодар',
            size: 12,
        },
        {
            position: [80, 47.5],
            text: 'г. Абакан',
            size: 12,
        },
        {
            position: [71, 50],
            text: 'г. Железногорск',
            size: 12,
        },
        {
            position: [67, 48],
            text: 'г. Ачинск',
            size: 12,
        },
        {
            position: [72, 51.5],
            text: 'г. Канск',
            size: 12,
        },
        {
            position: [77, 48.5],
            text: 'г. Минусинск',
            size: 12,
        },
        {
            position: [75, 50],
            text: 'г. Бородино',
            size: 12,
        },
        {
            position: [73, 50.3],
            text: 'г. Зеленогорск',
            size: 12,
        },
        {
            position: [68, 50],
            text: 'с. Богучаны',
            size: 12,
        },
        {
            position: [73.5, 47.5],
            text: 'г. Ужур',
            size: 12,
        },
        {
            position: [72, 46.5],
            text: 'г. Шарыпово',
            size: 12,
        },
        {
            position: [69, 47.5],
            text: 'г. Назарово',
            size: 12,
        },
    ]

    coords.forEach(dot => {
        mapDots.insertAdjacentHTML(
            'beforeend',
            `<div class="dot-wrapper position-absolute">
                <div class="personal-dot">
                    <span class="dot position-absolute rounded-circle"></span>
                    <span class="dot-border position-absolute rounded-circle"></span>
                </div>
                <p class="dot-text position-absolute c-white p-3 rounded-3 text-center shadow-xl"></p>
            </div>`
        )

        let lastElem =
            mapDots.querySelectorAll('.dot-wrapper')[
            mapDots.querySelectorAll('.dot-wrapper').length - 1
            ]

        lastElem.style.top = dot.position[0] + '%'
        lastElem.style.left = dot.position[1] + '%'
        lastElem.dataset.text = dot.text

        let personalDot = lastElem.querySelector('.personal-dot')

        personalDot.style.width = dot.size * 2 + 'px'
        personalDot.style.height = dot.size * 2 + 'px'

        let dotText = lastElem.querySelector('.dot-text')

        dotText.innerHTML = dot.text
        dotText.style.bottom = '50%'
        dotText.style.left = '30%'

        let mainDot = personalDot.querySelector('.dot')

        mainDot.style.width = dot.size + 'px'
        mainDot.style.height = dot.size + 'px'

        let mainDotBorder = personalDot.querySelector('.dot-border')

        mainDotBorder.style.width = dot.size * 2 + 'px'
        mainDotBorder.style.height = dot.size * 2 + 'px'
        mainDotBorder.style.left = '25%'
        mainDotBorder.style.top = '25%'
    })

    let i = 0

    let interval = setInterval(el => {
        mapDots.querySelectorAll('.dot-wrapper').forEach(elem => {
            elem.querySelector('.dot-text').classList.remove('active')
        })

        if (mapDots.querySelectorAll('.dot-wrapper')[i]) {
            let elem = mapDots.querySelectorAll('.dot-wrapper')[i]
            let dotBorder = elem.querySelector('.dot-border')
            let dotText = elem.querySelector('.dot-text')

            dotText.innerHTML = dotBorder.parentElement.parentElement.dataset.text
            dotText.classList.add('active')
            dotText.style.bottom = '50%'
            dotText.style.left = '30%'

            dotBorder.style.animation = 'pulse-red 2s ease'
            i++

            if (i > 0) {
                mapDots.querySelectorAll('.dot-wrapper').forEach((elem1, idx) => {
                    if (idx === i - 2) {
                        let dotBorder1 = elem1.querySelector('.dot-border')
                        dotBorder1.style.animation = 'none'
                    }
                })
            }
        } else {
            mapDots
                .querySelectorAll('.dot-wrapper')
            [mapDots.querySelectorAll('.dot-wrapper').length - 1].querySelector(
                '.dot-border'
            ).style.animation = 'none'

            i = 0

            let elem = mapDots.querySelectorAll('.dot-wrapper')[i]
            let dotBorder = elem.querySelector('.dot-border')
            let dotText = elem.querySelector('.dot-text')

            dotText.innerHTML = dotBorder.parentElement.parentElement.dataset.text
            dotText.classList.add('active')
            dotText.style.bottom = '50%'
            dotText.style.left = '30%'

            dotBorder.style.animation = 'pulse-red 2s ease'
            i++
        }
    }, 2000)

    let dotWrapper = mapDots.querySelectorAll('.dot-wrapper')

    dotWrapper.forEach(wrap => {
        wrap.querySelector('.dot').addEventListener('mouseenter', () => {
            mapDots.querySelectorAll('.dot-wrapper').forEach(elem => {
                elem.querySelector('.dot-text').classList.remove('active')
            })

            wrap.querySelector('.dot-text').classList.add('active')

            clearInterval(interval)
        })

        wrap.querySelector('.dot').addEventListener('mouseleave', () => {
            mapDots.querySelectorAll('.dot-wrapper').forEach(elem => {
                elem.querySelector('.dot-text').classList.remove('active')
            })

            interval = setInterval(el => {
                mapDots.querySelectorAll('.dot-wrapper').forEach(elem => {
                    elem.querySelector('.dot-text').classList.remove('active')
                })

                if (mapDots.querySelectorAll('.dot-wrapper')[i]) {
                    let elem = mapDots.querySelectorAll('.dot-wrapper')[i]
                    let dotBorder = elem.querySelector('.dot-border')
                    let dotText = elem.querySelector('.dot-text')

                    dotText.innerHTML = dotBorder.parentElement.parentElement.dataset.text
                    dotText.classList.add('active')
                    dotText.style.bottom = '50%'
                    dotText.style.left = '30%'

                    dotBorder.style.animation = 'pulse-red 2s ease'
                    i++

                    if (i > 0) {
                        mapDots.querySelectorAll('.dot-wrapper').forEach((elem1, idx) => {
                            if (idx === i - 2) {
                                let dotBorder1 = elem1.querySelector('.dot-border')
                                dotBorder1.style.animation = 'none'
                            }
                        })
                    }
                } else {
                    mapDots
                        .querySelectorAll('.dot-wrapper')
                    [mapDots.querySelectorAll('.dot-wrapper').length - 1].querySelector(
                        '.dot-border'
                    ).style.animation = 'none'

                    i = 0

                    let elem = mapDots.querySelectorAll('.dot-wrapper')[i]
                    let dotBorder = elem.querySelector('.dot-border')
                    let dotText = elem.querySelector('.dot-text')

                    dotText.innerHTML = dotBorder.parentElement.parentElement.dataset.text
                    dotText.classList.add('active')
                    dotText.style.bottom = '50%'
                    dotText.style.left = '30%'

                    dotBorder.style.animation = 'pulse-red 2s ease'
                    i++
                }
            }, 2000)
        })

        wrap.querySelector('.dot-text').addEventListener('mouseenter', () => {
            mapDots.querySelectorAll('.dot-wrapper').forEach(elem => {
                elem.querySelector('.dot-text').classList.remove('active')
            })

            wrap.querySelector('.dot-text').classList.add('active')

            clearInterval(interval)
        })

        wrap.querySelector('.dot-text').addEventListener('mouseleave', () => {
            mapDots.querySelectorAll('.dot-wrapper').forEach(elem => {
                elem.querySelector('.dot-text').classList.remove('active')
            })

            interval = setInterval(el => {
                mapDots.querySelectorAll('.dot-wrapper').forEach(elem => {
                    elem.querySelector('.dot-text').classList.remove('active')
                })

                if (mapDots.querySelectorAll('.dot-wrapper')[i]) {
                    let elem = mapDots.querySelectorAll('.dot-wrapper')[i]
                    let dotBorder = elem.querySelector('.dot-border')
                    let dotText = elem.querySelector('.dot-text')

                    dotText.innerHTML = dotBorder.parentElement.parentElement.dataset.text
                    dotText.classList.add('active')
                    dotText.style.bottom = '50%'
                    dotText.style.left = '30%'

                    dotBorder.style.animation = 'pulse-red 2s ease'
                    i++

                    if (i > 0) {
                        mapDots.querySelectorAll('.dot-wrapper').forEach((elem1, idx) => {
                            if (idx === i - 2) {
                                let dotBorder1 = elem1.querySelector('.dot-border')
                                dotBorder1.style.animation = 'none'
                            }
                        })
                    }
                } else {
                    mapDots
                        .querySelectorAll('.dot-wrapper')
                    [mapDots.querySelectorAll('.dot-wrapper').length - 1].querySelector(
                        '.dot-border'
                    ).style.animation = 'none'

                    i = 0

                    let elem = mapDots.querySelectorAll('.dot-wrapper')[i]
                    let dotBorder = elem.querySelector('.dot-border')
                    let dotText = elem.querySelector('.dot-text')

                    dotText.innerHTML = dotBorder.parentElement.parentElement.dataset.text
                    dotText.classList.add('active')
                    dotText.style.bottom = '50%'
                    dotText.style.left = '30%'

                    dotBorder.style.animation = 'pulse-red 2s ease'
                    i++
                }
            }, 2000)
        })
    })

    // для планшетов
    map.addEventListener('click', () => {
        mapDots.querySelectorAll('.dot-border').forEach((dot, idx) => {
            if (dot.style.animation === 'none' || !dot.style.animation) {
                dot.style.animation = 'pulse-red 2s infinite'
                dot.style.animationDelay = coords[idx].delay + 's'
            } else {
                dot.style.animation = 'none'
            }
        })
    })

    mapDots.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.parentElement.parentElement.querySelector('.dot-text').innerHTML =
                dot.parentElement.parentElement.dataset.text
            dot.parentElement.parentElement.querySelector('.dot-text').classList.add('active')
        })

        dot.addEventListener('mouseleave', () => {
            dot.parentElement.parentElement.querySelector('.dot-text').innerHTML =
                dot.parentElement.parentElement.dataset.text
            dot.parentElement.parentElement.querySelector('.dot-text').classList.remove('active')
        })
    })

    const yandexMap = document.querySelector('.map-disable')

    yandexMap.addEventListener('click', () => {
        yandexMap.classList.add('active')
    })
}