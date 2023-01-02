import product from '../js/product.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

export default function quickViewProducts(products = undefined) {
    let quickViewButtons = $$('.product__btn--quick-view')
    let productQuickView = $('.product__quick-view')
    let qvCloseBtn = $('.product__qv-close-btn')
    let qvTablist = $('.product__qv-tablist')
    let qvMainImg = $('.product__qv-main-img img')
    let qvTitle = $('.product__qv-title')
    let qvPrice = $('.product__qv-price')
    let qvDesc = $('.product__qv-desc')
    let qvNextBtn = $('.product__qv-control-btn--right')
    let qvPrevBtn = $('.product__qv-control-btn--left')
    let plusButton = $('.product__qv-quantity-plus-btn')
    let minusButton = $('.product__qv-quantity-minus-btn')
    let inputQuantity = $('input')
    let qvAddToWishlist = $('.product__qv-add-to-wishlist')
    let qvShowMoreBtn = $('.product__qv-show-more-btn')
    let qvInner = $('.product__qv-inner')
    let qvInnerCloseBtn = $('.product__qv-inner-close-btn')
    let qvInnerImg = $('.product__qv-inner-img img')
    let qvCntImg = $('.product__qv-cnt-img')
    let qvInnerBtnPrev = $('.product__qv-inner-btn-prev')
    let qvInnerBtnNext = $('.product__qv-inner-btn-next')

    return {
        countQuantity: 1,
        indexImg: 0,
        innerIndexImg: 0,
        renderQuickView() {
            const _this = this
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
                                <li class="product__qv-tablist-img ${index === 0 ? 'active' : ''}" data-tablist="${index}">
                                    <img src="${image}"
                                        alt="">
                                </li>
                            `
                        }).join('')
                    }

                    _this.handleEvents()
                }
            })
        },

        renderInnerQuickView() {
            this.innerIndexImg === qvTablist.children.length - 1
                ? qvInnerBtnNext.classList.add('hide')
                : qvInnerBtnNext.classList.remove('hide')
            this.innerIndexImg === 0 ? qvInnerBtnPrev.classList.add('hide') : qvInnerBtnPrev.classList.remove('hide')

            qvInnerImg.src = qvTablist.children[this.innerIndexImg].firstElementChild.src
            qvCntImg.innerText = `${this.innerIndexImg + 1} of ${$$('.product__qv-tablist-img').length}`
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
            qvNextBtn.onclick = function () {
                _this.indexImg++

                if (_this.indexImg === qvTablist.children.length) {
                    _this.indexImg = 0
                }

                qvMainImg.src = qvTablist.children[_this.indexImg].firstElementChild.src
                _this.activeTabListImage()
            }

            // Handle click prev image
            qvPrevBtn.onclick = function () {
                _this.indexImg--

                if (_this.indexImg < 0) {
                    _this.indexImg = qvTablist.children.length - 1
                }

                qvMainImg.src = qvTablist.children[_this.indexImg].firstElementChild.src
                _this.activeTabListImage()
            }

            // Handle click plus button quantity
            plusButton.onclick = function () {
                inputQuantity.value = ++(_this.countQuantity)
            }

            // Handle click minus button quantity
            minusButton.onclick = function () {
                --(_this.countQuantity)
                if (_this.countQuantity < 0) {
                    _this.countQuantity = 0
                }
                inputQuantity.value = _this.countQuantity
            }

            // Handle click quick view add to wishlist button
            qvAddToWishlist.onclick = function () {
                qvAddToWishlist.classList.toggle('active')
            }

            // Handle show quick view inner
            qvShowMoreBtn.onclick = function () {
                _this.innerIndexImg = _this.indexImg
                qvInner.classList.add('active')
                _this.renderInnerQuickView()
            }

            // Handle hide quick view inner
            qvInnerCloseBtn.onclick = function () {
                qvInner.classList.remove('active')
            }

            // Handle click inner button next
            qvInnerBtnNext.onclick = function () {
                _this.innerIndexImg !== qvTablist.children.length - 1 ? _this.innerIndexImg++ : undefined
                _this.renderInnerQuickView()
            }

            // Handle click inner button prev
            qvInnerBtnPrev.onclick = function () {
                _this.innerIndexImg !== 0 ? _this.innerIndexImg-- : undefined
                _this.renderInnerQuickView()
            }

            // Handle click quick view inner image
            qvInnerImg.onclick = function () {
                _this.innerIndexImg++

                if (_this.innerIndexImg === qvTablist.children.length) {
                    _this.innerIndexImg = 0
                }

                _this.renderInnerQuickView()
            }
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

        start() {
            this.renderQuickView()
        }
    }
}