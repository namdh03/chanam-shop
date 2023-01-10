import validator from '../lib/validator.js'
import {showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault} from '../js/loader.js'
import scroll from '../js/scrollToTop.js'
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
        hideLoaderPage()
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