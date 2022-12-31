import product from '../js/product.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

export default function quickViewProducts() {
    let quickViewButtons = $$('.product__btn--quick-view')
    let productQuickView = $('.product__quick-view')
    let qvCloseBtn = $('.product__qv-close-btn')
    // let qvWrapper = $('.product__qv-wrapper')
    let qvTablist = $('.product__qv-tablist')
    let qvMainImg = $('.product__qv-main-img img')
    let qvTitle = $('.product__qv-title')
    let qvPrice = $('.product__qv-price')
    let qvDesc = $('.product__qv-desc')
    let plusButton
    let minusButton
    let inputQuantity

    return {
        countQuantity: 1,
        indexImg: 0,
        async renderQuickView() {
            const _this = this
            let products = await product().getProductsAPI()
            Array.from(quickViewButtons).forEach(button => {
                button.onclick = function () {
                    // Reset index image
                    _this.indexImg = 0

                    // Handle the display of the product quick view interface
                    productQuickView.classList.remove('hide')

                    // Render
                    let dataIndex = product().getParent(button, '.product__item').parentElement.getAttribute('data-index')

                    if (products) {
                        qvTitle.innerText = products[dataIndex].title
                        qvPrice.innerText = '£' + products[dataIndex].price
                        qvDesc.innerHTML = products[dataIndex].description
                        qvMainImg.src = products[dataIndex].images[0]
                        qvTablist.innerHTML = Array.from(products[dataIndex].images).map((image, index) => {
                            return `
                                <div class="product__qv-tablist-img ${index === 0 ? 'active' : ''}" data-tablist="${index}">
                                    <img src="${image}}"
                                        alt="">
                                </div>
                            `
                        }).join('')
                    }

                    _this.handleEvents()
                }
            })
        },

        handleEvents() {
            const _this = this
            // Handle close the product quick view interface
            qvCloseBtn.onclick = function () {
                productQuickView.classList.add('hide')
            }

            // Handle click tab list imgs
            const isElementLoaded = async (selectors, method) => {
                if (method === 'querySelectorAll') {
                    while ($$(selectors).length === 0) {
                        await new Promise(resolve => requestAnimationFrame(resolve))
                    }
                    return $$(selectors)
                }

                if (method === 'querySelector') {
                    while ($(selectors) === null) {
                        await new Promise(resolve => requestAnimationFrame(resolve))
                    }
                    return $(selectors)
                }
            }

            isElementLoaded('.product__qv-tablist-img img', 'querySelectorAll')
                .then(selectors => {
                    Array.from(selectors).forEach(selector => {
                        selector.onclick = function () {
                            _this.checkTabListImg()
                            selector.classList.add('active')

                            qvMainImg.src = selector.src
                            _this.indexImg = Number(selector.parentElement.getAttribute('data-tablist'))
                        }
                    })
                })

            // Handle click next image
            isElementLoaded('.product__qv-control-btn--right', 'querySelector')
                .then(selector => {
                    selector.onclick = function () {
                        _this.indexImg++

                        if (_this.indexImg === qvTablist.children.length) {
                            _this.indexImg = 0
                        }

                        qvMainImg.src = qvTablist.children[_this.indexImg].firstElementChild.src
                        _this.activeTabListImage()
                    }
                })

            // Handle click prev image
            isElementLoaded('.product__qv-control-btn--left', 'querySelector')
                .then(selector => {
                    selector.onclick = function () {
                        _this.indexImg--

                        if (_this.indexImg < 0) {
                            _this.indexImg = qvTablist.children.length - 1
                        }

                        qvMainImg.src = qvTablist.children[_this.indexImg].firstElementChild.src
                        _this.activeTabListImage()
                    }
                })

            // Handle click plus and minus button quantity
            isElementLoaded('.product__qv-quantity', 'querySelector')
                .then(selector => {
                    plusButton = selector.querySelector('.product__qv-quantity-plus-btn')
                    minusButton = selector.querySelector('.product__qv-quantity-minus-btn')
                    inputQuantity = selector.querySelector('input')

                    plusButton.onclick = function () {
                        inputQuantity.value = ++(_this.countQuantity)
                    }

                    minusButton.onclick = function () {
                        --(_this.countQuantity)
                        if (_this.countQuantity < 0) {
                            _this.countQuantity = 0
                        }
                        inputQuantity.value = _this.countQuantity
                    }
                })
        },

        checkTabListImg() {
            if ($('.product__qv-tablist-img.active')) {
                $('.product__qv-tablist-img.active').classList.remove('active')
            }
        },

        activeTabListImage() {
            this.checkTabListImg()
            Array.from($$('.product__qv-tablist-img')).forEach(image => {
                if (Number(image.getAttribute('data-tablist')) === this.indexImg) {
                    image.classList.add('active')
                }
            })

        },

        async start() {
            await this.renderQuickView()
        }
    }
}