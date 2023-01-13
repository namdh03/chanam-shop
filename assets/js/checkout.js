import validator from '../lib/validator.js'
import {showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault} from '../js/loader.js'
import scroll from '../js/scrollToTop.js'
import product from '../js/product.js'
import miniCart from '../js/miniCart.js'
import footer from '../js/footer.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

scroll()
footer()

let countryApi = 'https://restcountries.com/v3.1/all'
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

fetch(countryApi)
    .then((response) => {
        return response.json();
    })
    .then((countries) => {
        let option = Array.from(countries).map(country => {
            if (country.name.common === 'United Kingdom') {
                return `
                    <option value="${country.name.common}" selected="selected">${country.name.common}</option>
                `
            } else {
                return `
                    <option value="${country.name.common}">${country.name.common}</option>
                `
            }
        }).join('')
        countrySelect.innerHTML = option
        countrySelectDiffer.innerHTML = option
    })

checkoutShowCoupon.onclick = function() {
    checkoutCoupon.classList.toggle('hide')
}

showFormDifferBtn.onclick = function() {
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

    method.onclick = function() {
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

formCheckout.onSubmit = formData => {
    console.log(formData);
}

formCheckoutDiffer.onSubmit = formData => {
    console.log(formData);
}

async function renderCheckoutUI() {
    let html = ''
    let productsLS = miniCart().getConfig('Carts').products
    let subtotalLS = miniCart().getConfig('Subtotal').subtotal
    let productsAPI = await product().getProductsAPI()
    hideLoaderPage()

    if (!productsLS) return
    if (!subtotalLS) return 

    for (let i of productsLS) {
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
            }
        }
    }

    checkoutOrderBody.innerHTML = html
    checkoutOrderSubtotal.innerText = '£' + subtotalLS
}
renderCheckoutUI()

