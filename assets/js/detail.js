import {showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault} from './loader.js'
import scroll from './scrollToTop.js'
import footer from './footer.js'
import product from './product.js'

scroll()
footer.start()
hideLoaderPage()

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

export default function productDetail(products = undefined) {
    let quickViewButtons = $$('.detail-title')
    let productQuickView = $('.product__detail')
    let detailCloseBtn = $('.detail-close-btn')
    let detailTablist = $('.detail-tablist')
    let detailMainImg = $('.detail-main-img img')
    let detailTitle = $('.detail-title')
    let detailPrice = $('.detail-price')
    let detailDesc = $('.detail-desc')
    let detailNextBtn = $('.detail-control-btn--right')
    let detailPrevBtn = $('.detail-control-btn--left')
    let detailFormGroup = $$('.form-group')
    let detailSelectForm = $$('.detail-select-form select')
    let detailFormMsgSize = $('.form-message--size')
    let detailFormMsgColor = $('.form-message--color')
    let plusButton = $('.detail-quantity-plus-btn')
    let minusButton = $('.detail-quantity-minus-btn')
    let inputQuantity = $('.detail-quantity input')
    let detailAddToWishlist = $('.detail-add-to-wishlist')
    let detailShowMoreBtn = $('.detail-show-more-btn')
    let detailInner = $('.detail-inner')
    let detailInnerCloseBtn = $('.detail-inner-close-btn')
    let detailInnerImg = $('.detail-inner-img img')
    let detailCntImg = $('.detail-cnt-img')
    let detailInnerBtnPrev = $('.detail-inner-btn-prev')
    let detailInnerBtnNext = $('.detail-inner-btn-next')
    let detailForm = new validator('#detail-form')
    let plusButtonParent = product().getParent(plusButton, '.form-group')
    let minusButtonParent = product().getParent(minusButton, '.form-group')
    let detailFormMsgQuantity = $('.form-message--quantity')

    return {
        countQuantity: 1,
        indexImg: 0,
        innerIndexImg: 0,
        
        renderQuickView() {
            const _this = this
            Array.from(quickViewButtons).forEach(button => {
                button.onclick = function () {
                    showLoaderDefault()

                    // Reset index image
                    _this.indexImg = 0

                    // Reset selected index
                    Array.from(detailSelectForm).forEach(select => select.selectedIndex = 0)

                    // Reset count quantity and input value quantity
                    _this.countQuantity = 1
                    inputQuantity.value = _this.countQuantity

                    // Reset form group and form msg
                    Array.from(detailFormGroup).forEach(form => form.classList.remove('invalid'))
                    detailFormMsgSize.innerText = ''
                    detailFormMsgColor.innerText = ''
                    detailFormMsgQuantity.innerText = ''

                    // Render
                    let dataIndex = product().getParent(button, '.product__item').parentElement.getAttribute('data-index')

                    if (products) {
                        detailTablist.innerHTML = Array.from(products[dataIndex].images).map((image, index) => {
                            return `
                                <li class="detail-tablist-img ${index === 0 ? 'active' : ''}" data-tablist="${index}">
                                    <img src="${image}" alt="">
                                </li>
                            `
                        }).join('')

                        detailTitle.innerText = products[dataIndex].title
                        detailPrice.innerText = '£' + products[dataIndex].price
                        detailDesc.innerHTML = products[dataIndex].description
                        detailMainImg.src = products[dataIndex].images[0]
                    }

                    let detailTablistImg = $$('.detail-tablist-img img')
                    detailTablistImg[detailTablistImg.length - 1].onload = function() {
                        hideLoaderDefault()

                        // Handle the display of the product quick view interface
                        productQuickView.classList.remove('hide')
                    }
                    _this.handleEvents()
                }
            })
        },

        renderInnerQuickView() {
            this.innerIndexImg === detailTablist.children.length - 1
                ? detailInnerBtnNext.classList.add('hide')
                : detailInnerBtnNext.classList.remove('hide')
            this.innerIndexImg === 0 ? detailInnerBtnPrev.classList.add('hide') : detailInnerBtnPrev.classList.remove('hide')

            detailInnerImg.src = detailTablist.children[this.innerIndexImg].firstElementChild.src
            detailCntImg.innerText = `${this.innerIndexImg + 1} of ${$$('.detail-tablist-img').length}`
        },

        handleEvents() {
            const _this = this
            // Handle close the product quick view interface
            detailCloseBtn.onclick = function () {
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

            isElementLoaded('.detail-tablist-img img', 'querySelectorAll')
                .then(selectors => {
                    Array.from(selectors).forEach(selector => {
                        selector.onclick = function () {
                            _this.checkTabListImg()
                            selector.classList.add('active')

                            detailMainImg.src = selector.src
                            _this.indexImg = Number(selector.parentElement.getAttribute('data-tablist'))
                        }
                    })
                })

            // Handle click next image
            detailNextBtn.onclick = function () {
                _this.indexImg++

                if (_this.indexImg === detailTablist.children.length) {
                    _this.indexImg = 0
                }

                detailMainImg.src = detailTablist.children[_this.indexImg].firstElementChild.src
                _this.activeTabListImage()
            }

            // Handle click prev image
            detailPrevBtn.onclick = function () {
                _this.indexImg--

                if (_this.indexImg < 0) {
                    _this.indexImg = detailTablist.children.length - 1
                }

                detailMainImg.src = detailTablist.children[_this.indexImg].firstElementChild.src
                _this.activeTabListImage()
            }

            // Handle click plus button quantity
            plusButton.onclick = function () {
                plusButtonParent.classList.remove('invalid')
                detailFormMsgQuantity.innerText = ``
                inputQuantity.value = ++(_this.countQuantity)
            }

            // Handle click minus button quantity
            minusButton.onclick = function () {
                minusButtonParent.classList.remove('invalid')
                detailFormMsgQuantity.innerText = ``
                --(_this.countQuantity)
                if (_this.countQuantity < 0) {
                    _this.countQuantity = 0
                }
                inputQuantity.value = _this.countQuantity
            }

            // Handle click quick view add to wishlist button
            detailAddToWishlist.onclick = function () {
                detailAddToWishlist.classList.toggle('active')
            }

            // Handle show quick view inner
            detailShowMoreBtn.onclick = function () {
                _this.innerIndexImg = _this.indexImg
                detailInner.classList.add('active')
                _this.renderInnerQuickView()
            }

            // Handle hide quick view inner
            detailInnerCloseBtn.onclick = function () {
                detailInner.classList.remove('active')
            }

            // Handle click inner button next
            detailInnerBtnNext.onclick = function () {
                _this.innerIndexImg !== detailTablist.children.length - 1 ? _this.innerIndexImg++ : undefined
                _this.renderInnerQuickView()
            }

            // Handle click inner button prev
            detailInnerBtnPrev.onclick = function () {
                _this.innerIndexImg !== 0 ? _this.innerIndexImg-- : undefined
                _this.renderInnerQuickView()
            }

            // Handle click quick view inner image
            detailInnerImg.onclick = function () {
                _this.innerIndexImg++

                if (_this.innerIndexImg === detailTablist.children.length) {
                    _this.innerIndexImg = 0
                }

                _this.renderInnerQuickView()
            }

            // Handle click add to cart at quick view ui
            detailForm.onSubmit = formData => {
                console.log(formData)
            }
        },

        checkTabListImg() {
            if ($('.detail-tablist-img.active')) {
                $('.detail-tablist-img.active').classList.remove('active')
            }
        },

        activeTabListImage() {
            this.checkTabListImg()
            Array.from($$('.detail-tablist-img')).forEach(image => {
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