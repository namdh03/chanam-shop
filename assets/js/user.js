import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'
import { userIDStatus } from '../js/userStatus.js'
import validator from '../lib/validator.js'
import toast from '../lib/toast.js'
import scroll from '../js/scrollToTop.js'
import header from '../js/header.js'
import product from '../js/product.js'
import miniCart from '../js/miniCart.js'
import footer from '../js/footer.js'
import { createCountryOption } from '../js/countryOption.js'
import { createFormData } from '../js/formData.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userApi = 'https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users'
let productsAPI = await product.getProductsAPI()
let userId = window.localStorage.getItem('userId')
let userAccNavItems = $$('.user__account-nav-item')
let userAccNavIcons = $$('.user__account-nav-icon')
let userAccContent = $$('.user__acc-content')
let userAccContentAddress = $('.user__acc-content--address')
let userAccContentAccDetails = $('.user__acc-content--account-details')
let userAccContentNotify = $('.user__acc-content--notify')
let userAccContentLinkAddresses = $('.user__acc-content-link--addresses')
let userAccContentLinkAccDetails = $('.user__acc-content-link--acc-details')
let userAccountNavAddresses = $('.user__account-nav--addresses')
let userAccountNavAccountDetails = $('.user__account-nav--account-details')
let userLogout = $$('.user__logout')
let countrySelect = $('#country')
let userData = $$('.user-data')
let userNameApi = $$('.user__name--api')
let addressesForm = new validator('#addresses-form')
let userForm = new validator('#user-form')

userIDStatus()
header.start()
await miniCart(productsAPI).start()
scroll()
footer.start()
createCountryOption(countrySelect)

const user = {
    user: {},
    users: [],

    async getUsersAPI() {
        return (await fetch(userApi)).json()
    },

    async getUserAPI(userId) {
        return (await fetch('https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/' + `${userId}`)).json()
    },

    updateUser(data, userId, callback) {
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/' + `${userId}`, options)
            .then(function (response) {
                response.json();
            })
            .then(callback);
    },

    async render() {
        this.user = await this.getUserAPI(userId)

        Array.from(userNameApi).forEach(name => {
            name.innerText = this.user.username
        })
    },

    handleEvents() {
        const _this = this

        // Handle add class active when user nav item clicked
        Array.from(userAccNavItems).forEach((item, index) => {
            item.onclick = function () {
                _this.activeNavContent()
                _this.activeNavIcons()
                userAccNavIcons[index].classList.add('active')

                // Handle switching to user address editing tab
                if (item.classList.contains('user__account-nav--addresses')) {
                    userAccContentAddress.classList.remove('hide')
                }

                // Handle switching to user account details editing tab
                if (item.classList.contains('user__account-nav--account-details')) {
                    userAccContentAccDetails.classList.remove('hide')
                }

                // Handle switching to user default tab
                if (item.classList.contains('user__account-nav--dashboard')) {
                    userAccContentNotify.classList.remove('hide')
                }
            }
        })

        // Handle switching to user address editing tab
        userAccContentLinkAddresses.onclick = function () {
            let icon = userAccountNavAddresses.querySelector('.user__account-nav-icon')

            _this.activeNavContent()
            _this.activeNavIcons()
            userAccContentAddress.classList.remove('hide')
            icon.classList.add('active')
        }

        // Handle switching to user account details editing tab
        userAccContentLinkAccDetails.onclick = function () {
            let icon = userAccountNavAccountDetails.querySelector('.user__account-nav-icon')

            _this.activeNavContent()
            _this.activeNavIcons()
            userAccContentAccDetails.classList.remove('hide')
            icon.classList.add('active')
        }

        // Handle logout and back to home
        Array.from(userLogout).forEach(button => {
            button.onclick = function () {
                window.localStorage.removeItem('userId')
                window.location.href = './index.html'
            }
        })

        // Handle submit form edit addresses user
        addressesForm.onSubmit = async formData => {
            showLoaderDefault()
            _this.users = await _this.getUsersAPI()

            let isExistedEmail = false
            let firstname = formData.firstname
            let lastname = formData.lastname
            let country = formData.country
            let streetAddress = formData.streetAddress
            let city = formData.city
            let state = formData.state
            let postcode = formData.postcode
            let phone = formData.phone
            let company = formData.company
            let apartment = formData.apartment
            let email = formData.email

            for (let user of _this.users) {
                if (user.email === email) {
                    isExistedEmail = true

                    if (_this.user.email === email) {
                        isExistedEmail = false
                    }

                    break
                }
            }

            if (isExistedEmail) {
                toast({
                    title: 'Error!',
                    message: 'Email address already taken!',
                    type: 'error',
                    duration: 3000
                })
                hideLoaderDefault()
                return
            } else {
                let user = {
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    country: country,
                    streetAddress: streetAddress,
                    city: city,
                    state: state,
                    postcode: postcode,
                    phone: phone,
                    company: company,
                    apartment: apartment,
                }

                _this.updateUser(user, userId, () => {
                    window.location.reload()
                })
            }
        }

        // Handle submit form edit user account details
        userForm.onSubmit = async formData => {
            showLoaderDefault()
            _this.users = await _this.getUsersAPI()
            let isExistedEmail = false
            let isExistedUsername = false
            let isExistedPassword = false
            let email = formData.email
            let username = formData.username
            let oldPassword = formData.oldPassword
            let password = formData.password
            let firstname = formData.firstname
            let lastname = formData.lastname

            for (let user of _this.users) {
                if (user.email === email) {
                    isExistedEmail = true

                    if (_this.user.email === email) {
                        isExistedEmail = false
                    }
                } else if (user.username === username) {
                    isExistedUsername = true

                    if (_this.user.username === username) {
                        isExistedUsername = false
                    }
                }
                if (user.password === oldPassword) {
                    isExistedPassword = true
                }
            }

            if (isExistedEmail) {
                toast({
                    title: 'Error!',
                    message: 'Email address already taken!',
                    type: 'error',
                    duration: 3000
                })
                hideLoaderDefault()
                return
            } else if (isExistedUsername) {
                toast({
                    title: 'Error!',
                    message: 'Username already taken!',
                    type: 'error',
                    duration: 3000
                })
                hideLoaderDefault()
                return
            } else if (!isExistedPassword) {
                toast({
                    title: 'Error!',
                    message: 'ERROR: Password not found!',
                    type: 'error',
                    duration: 3000
                })
                hideLoaderDefault()
                return
            } else {
                let user = {
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: password,
                }

                _this.updateUser(user, userId, () => {
                    window.location.reload()
                })
            }
        }
    },

    activeNavContent() {
        Array.from(userAccContent).forEach(item => {
            if (!item.classList.contains('hide')) {
                item.classList.add('hide')
            }
        })
    },

    activeNavIcons() {
        Array.from(userAccNavIcons).forEach(icon => {
            if (icon.classList.contains('active')) {
                icon.classList.remove('active')
            }
        })
    },

    start() {
        this.render()
        this.handleEvents()
        createFormData(userData, userId, hideLoaderPage)
    }
}

if (userId) {
    user.start()
} else {
    window.location.href = './login.html'
}