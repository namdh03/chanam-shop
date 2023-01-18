import validator from '../lib/validator.js'
import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'
import { userIDStatus } from '../js/userStatus.js'
import toast from '../lib/toast.js'
import scroll from '../js/scrollToTop.js'
import product from '../js/product.js'
import miniCart from '../js/miniCart.js'
import footer from '../js/footer.js'
import { createCountryOption } from '../js/countryOption.js'
import { createFormData } from '../js/formData.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userId = window.localStorage.getItem('userId')
let cartApi = 'https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/1/carts'
let productMiniCartClose = $('.product__mini-cart-close')
let checkoutWrapper = $('.checkout__wrapper')
let checkoutReturnHome = $('.redirect__return-to-home')
let countrySelect = $('#country')
let countrySelectDiffer = $('#country-differ')
let checkoutCoupon = $('.checkout-coupon')
let checkoutShowCoupon = $('.checkout-coupon__show-coupon')
let showFormDifferBtn = $('.show-form-differ-btn')
let checkoutFormDiffer = $('#checkout-form-differ')
let checkoutOrderPayment = $('.checkout__order-payment')
let checkoutOrderPaymentMethod = $$('.checkout__order-payment-method')
let checkoutOrderPaymentBox = $$('.checkout__order-payment-box')
let checkoutOrderSubmit = $('.checkout__order-submit')
let formGroup = $$('.form-group')
let formMsg = $$('.form-message')
let formCheckout = new validator('#checkout-form')
let formCheckoutDiffer = new validator('#checkout-form-differ')
let checkoutOrderBody = $('.checkout__order-body')
let checkoutOrderSubtotal = $('.checkout__order-footer-value')
let checkoutOrderTotal = $('.checkout__order-footer-value--total')
let checkoutCouponSubmit = $('.checkout-coupon__submit')
let checkoutCouponCode = $('.checkout-coupon__code')
let productMniCartRemoveBtn = document.getElementsByClassName('product__mini-cart-remove-icon')
let userData = $$('.user-data')
let productsAPI = await product.getProductsAPI()

userIDStatus()
await miniCart(productsAPI).start()
await renderOrderCheckout(productsAPI)
scroll()
footer.start()

createCountryOption(countrySelect, countrySelectDiffer)

checkoutShowCoupon.onclick = function () {
    checkoutCoupon.classList.toggle('hide')
}

checkoutCouponSubmit.onclick = function () {
    if (typeof checkoutCouponCode.value !== 'string' || checkoutCouponCode.value.trim().length !== 0) {
        toast({
            title: 'Error!',
            message: `Coupon "${checkoutCouponCode.value}" does not exist!`,
            type: 'error',
            duration: 3000
        })
        checkoutCouponCode.value = ''
    }
}

showFormDifferBtn.onclick = function () {
    checkoutFormDiffer.classList.toggle('hide')

    Array.from(formGroup).forEach((form, index) => {
        form.classList.remove('invalid')
        formMsg[index].innerText = ''
    })

    if (checkoutFormDiffer.getAttribute('class').includes('hide')) {
        checkoutOrderSubmit.setAttribute('form', 'checkout-form')
    } else {
        checkoutOrderSubmit.setAttribute('form', 'checkout-form-differ')
    }
}

Array.from(checkoutOrderPaymentMethod).forEach(method => {
    let input = method.querySelector('input')
    let label = method.querySelector('label')

    method.onclick = function () {
        input.checked = true

        if (input.getAttribute('id') === 'radio-paypal') {
            checkoutOrderSubmit.innerText = 'Process To Paypal'.toUpperCase()
        } else {
            checkoutOrderSubmit.innerText = 'Place Order'.toUpperCase()
        }

        filterInputNotChecked()
    }
})

function filterInputNotChecked() {
    let inputs = checkoutOrderPayment.querySelectorAll('input')

    Array.from(inputs).forEach((input, index) => {
        if (input.checked === true) {
            checkoutOrderPaymentBox[index].classList.remove('hide')
        } else {
            checkoutOrderPaymentBox[index].classList.add('hide')
        }
    })
}

function updateProducts(data, id, callback) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(cartApi + '/' + id, options)
        .then(function (response) {
            response.json()
        })
        .then(callback)
}

function handleCheckout() {
    let data = {
        products: [],
        userId: userId,
    }

    updateProducts(data, userId)
}

formCheckout.onSubmit = formData => {
    console.log(formData)
    handleCheckout()
}

formCheckoutDiffer.onSubmit = formData => {
    console.log(formData)
    handleCheckout()
}

async function renderOrderCheckout(productsAPI) {
    let html = ''
    let products = []
    let subTotal = 0
    let carts = await miniCart().getCart(userId)

    for (let cart of carts) {
        if (cart.userId === userId) {
            products = cart.products
            break
        }
    }

    if (products.length === 0) {
        checkoutWrapper.remove()
        checkoutReturnHome.classList.remove('hide')
        productMiniCartClose.click()
    }

    for (let i of products) {
        for (let j of productsAPI) {
            if (i.productID === j.id) {
                html += `
                    <div class="row no-gutters">
                        <div class="col l-6 m-6 c-6">
                            <div class="checkout__order-title-product product__order--frames">
                                <div class="checkout__order-name-product">${j.title}</div>
                                <div class="checkout__order-quantity-product"> x ${i.quantity}</div>
                            </div>
                        </div>
                    
                        <div class="col l-6 m-6 c-6">
                            <div class="checkout__order-price-product product__order--frames">£${j.price}</div>
                        </div>
                    </div>
                `
                break
            }
        }
    }

    for (let i of products) {
        for (let j of productsAPI) {
            if (i.productID === j.id) {
                subTotal += i.quantity * j.price
                break
            }
        }
    }

    checkoutOrderBody.innerHTML = html
    checkoutOrderSubtotal.innerText = '£' + subTotal
    checkoutOrderTotal.innerText = '£' + subTotal
}

Array.from(productMniCartRemoveBtn).forEach(button => {
    button.onclick = async function() {
        let productsAPI = await product.getProductsAPI()
        await renderOrderCheckout(productsAPI)
    }
})

createFormData(userData, userId, hideLoaderPage)