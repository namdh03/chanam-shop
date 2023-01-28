import validator from '../lib/validator.js'
import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'
import { userIDStatus } from '../js/userStatus.js'
import toast from '../lib/toast.js'
import scroll from '../js/scrollToTop.js'
import header from '../js/header.js'
import product from '../js/product.js'
import miniCart from '../js/miniCart.js'
import footer from '../js/footer.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userId = window.localStorage.getItem('userId')
let productsAPI = await product.getProductsAPI()
let carts = await miniCart().getCart(userId)
let cartBody = $('.cart__body')
let cartSubtotal = $('.cart__totals-body-value--subtotal')
let cartTotal = $('.cart__totals-body-value--total')
let cartRemoveBtn = document.getElementsByClassName('cart__product-remove-btn-icon')
let cartQuantityInput = document.getElementsByClassName('cart__quantity-input')
let cartQuantityPlusBtn = document.getElementsByClassName('cart__product-quantity-plus-btn')
let cartQuantityMinusBtn = document.getElementsByClassName('cart__product-quantity-minus-btn')
let cartItem = document.getElementsByClassName('cart__item')
let cartUpdateBtn = $('.cart__update-btn')
let cartWrapper = $('.cart__wrapper')
let cartReturnHome = $('.redirect__return-to-home')
let productMiniCartClose = $('.product__mini-cart-close')
let cartCouponSubmit = $('.cart-coupon__submit')
let cartCouponCode = $('.cart-coupon__code')
let cartProductImgLinks = document.getElementsByClassName('cart__product-img')
let cartProductTitleLinks = document.getElementsByClassName('cart__product-title')

userIDStatus()
header.start()
miniCart(productsAPI).start()
scroll()
footer.start()

const cart = {
    html: '',
    cart: {},
    products: [],
    subTotal: 0,
    amount: 0,
    isChanged: false,

    renderCart() {
        if (userId) {
            for (let cart of carts) {
                if (cart.userId === userId) {
                    this.products = cart.products
                    break
                }
            }

            for (let i of this.products) {
                for (let j of productsAPI) {
                    if (i.productID === j.id) {
                        this.html += `
                            <div class="row no-gutters cart__item" data-id="${i.productID}">
                                <div class="col l-1 m-1 c-12 cart__product-full-w">
                                    <div class="cart__product-remove-btn">
                                        <span class="ti-close cart__product-remove-btn-icon"></span>
                                    </div>
                                </div>
    
                                <div class="col l-1 m-1 c-12 cart__product-full-w">
                                    <div class="cart__product-wrapper-img">
                                        <a href="./detail.html" class="cart__product-img">
                                            <img src="${j.images[0]}" alt="">
                                        </a>
                                    </div>
                                </div>
    
                                <div class="col l-3 m-3 c-12 cart__product-full-w">
                                    <a href="./detail.html" class="cart__product-title cart__pad">
                                        <span>${j.title}</span>
                                    </a>
                                </div>
    
                                <div class="col l-2 m-2 c-12">
                                    <div class="cart__product-price cart__pad">£${j.price}</div>
                                </div>
    
                                <div class="col l-3 m-3 c-12 cart__product-full-w">
                                    <div class="form-group">
                                        <div class="cart__product-quantity cart__pad">
                                            <div class="cart__product-quantity-btn cart__product-quantity-minus-btn">
                                                <i class="fa-solid fa-minus"></i>
                                            </div>
                                            <input id="quantity" name="quantity" rules="required|number|quantity:1" type="number"
                                                step="1" min="0" max="99999" value="${i.quantity}" inputmode="numeric" autocomplete="off"
                                                class="form-control cart__quantity-input">
                                            <div class="cart__product-quantity-btn cart__product-quantity-plus-btn">
                                                <i class="fa-solid fa-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="col l-2 m-2 c-12 cart__product-full-w">
                                    <div class="cart__product-subtotal cart__pad">£${j.price * i.quantity}</div>
                                </div>
                            </div>
                        `
                        break
                    }
                }
            }

            for (let i of this.products) {
                for (let j of productsAPI) {
                    if (i.productID === j.id) {
                        this.amount += i.quantity
                        this.subTotal += i.quantity * j.price
                        break
                    }
                }
            }

            cartBody.innerHTML = this.html
            cartSubtotal.innerText = '£' + this.subTotal
            cartTotal.innerText = '£' + this.subTotal

            let cartListImg = $$('.cart__product-img img')
            Array.from(cartListImg).forEach((img, index) => {
                if (index === cartListImg.length - 1) {
                    img.onload = function () {
                        hideLoaderPage()
                    }
                }
            })
        }
    },

    handleEvents() {
        const _this = this

        // Handle delete cart items
        Array.from(cartRemoveBtn).forEach(button => {
            button.onclick = function () {
                showLoaderDefault()
                let cartItem = product.getParent(button, '.cart__item')
                let cartItemID = cartItem.getAttribute('data-id')
                let productMiniCartItem = $$('.product__mini-cart-item')

                for (let i = 0; i < productMiniCartItem.length; i++) {
                    if (productMiniCartItem[i].getAttribute('data-id') === cartItemID) {
                        productMiniCartItem[i].remove()
                        break
                    }
                }

                for (let i = 0; i < _this.products.length; i++) {
                    if (cartItemID === _this.products[i].productID) {
                        _this.products.splice(i, 1)
                        _this.cart["products"] = _this.products
                        _this.cart["userId"] = userId

                        if (_this.products.length === 0) {
                            _this.showReturnHomeBtn()
                        }

                        miniCart().updateProducts(_this.cart, userId, () => {
                            window.location.reload()
                        })
                        miniCart().showEmptyText()
                        break
                    }
                }

                cartItem.remove()
            }
        })

        // Handle increase quantity products
        Array.from(cartQuantityPlusBtn).forEach(button => {
            button.onclick = function () {
                _this.activeCartUpdateBtn()
                let input = button.previousElementSibling
                input.value++
                _this.isChanged = true
            }
        })

        // Handle decrease quantity products
        Array.from(cartQuantityMinusBtn).forEach(button => {
            button.onclick = function () {
                _this.activeCartUpdateBtn()
                let input = button.nextElementSibling

                if (Number(input.value) === 0) {
                    return
                } else {
                    input.value--
                }
                _this.isChanged = true
            }
        })

        // Handle onchange input quantity
        Array.from(cartQuantityInput).forEach(input => {
            input.onkeypress = function (e) {
                let ASCIICode = (e.which) ? e.which : e.keyCode

                if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
                    input.classList.add('active')
                    return false
                }

                _this.isChanged = true
                input.classList.remove('active')
                _this.activeCartUpdateBtn()
                return true
            }

            input.onblur = function () {
                input.classList.remove('active')
            }
        })

        // Handle update cart
        cartUpdateBtn.onclick = function () {
            if (cartUpdateBtn.classList.contains('active') && _this.isChanged === true) {
                showLoaderDefault()

                setTimeout(() => {
                    let cart = {}
                    let products = []
                    Array.from(cartItem).forEach(item => {
                        let quantity = Number(item.querySelector('.cart__quantity-input').value)
                        let productID = item.getAttribute('data-id')

                        if (quantity !== 0) {
                            products.push({ productID, quantity })
                        }
                    })

                    cart['products'] = products
                    miniCart().updateProducts(cart, userId, () => {
                        window.location.reload()
                    })
                }, 1000)
            }
        }

        // Handle remove mini cart item
        miniCart().isElementLoaded('.product__mini-cart-remove-icon', 'querySelectorAll')
            .then(selectors => {
                Array.from(selectors).forEach(selector => {
                    let productMiniCartItem = product.getParent(selector, '.product__mini-cart-item')
                    let miniCartItemID = productMiniCartItem.getAttribute('data-id')

                    selector.onclick = function () {
                        Array.from(cartItem).forEach(item => {
                            if (item.getAttribute('data-id') === miniCartItemID) {
                                item.remove()
                                return
                            }
                        })

                        for (let i = 0; i < _this.products.length; i++) {
                            if (miniCartItemID === _this.products[i].productID) {
                                _this.products.splice(i, 1)

                                if (_this.products.length === 0) {
                                    showLoaderPage()

                                    setTimeout(() => {
                                        _this.showReturnHomeBtn()
                                    }, 1000)
                                }

                                break
                            }
                        }
                    }
                })
            })

        // Handle submit coupon code
        cartCouponSubmit.onclick = function () {
            if (typeof cartCouponCode.value !== 'string' || cartCouponCode.value.trim().length !== 0) {
                toast({
                    title: 'Error!',
                    message: `Coupon "${cartCouponCode.value}" does not exist!`,
                    type: 'error',
                    duration: 3000
                })
                cartCouponCode.value = ''
            }
        }

        //  Handle click to image link product in cart
        Array.from(cartProductImgLinks).forEach(link => {
            link.onclick = function () {
                let productId = product.getParent(link, '.cart__item').getAttribute('data-id')
                window.localStorage.setItem('productId', productId)
            }
        })

        Array.from(cartProductTitleLinks).forEach(link => {
            link.onclick = function () {
                let productId = product.getParent(link, '.cart__item').getAttribute('data-id')
                window.localStorage.setItem('productId', productId)
            }
        })
    },

    activeCartUpdateBtn() {
        cartUpdateBtn.classList.add('active')
    },

    showReturnHomeBtn() {
        if (this.products.length === 0) {
            cartWrapper.remove()
            cartReturnHome.classList.remove('hide')
            productMiniCartClose.click()
            hideLoaderPage()
        }
    },

    start() {
        this.renderCart()
        this.showReturnHomeBtn()
        this.handleEvents()
    },
}

cart.start()