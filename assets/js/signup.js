import validator from '../lib/validator.js'
import toast from '../lib/toast.js'
import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userApi = 'https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users'
let signUpForm = new validator('#sign-up-form')
let emailInput = $('.sign-up-form__input--email')
let usernameInput = $('.sign-up-form__input--username')

hideLoaderPage()

async function getUsersAPI() {
    return (await fetch(userApi)).json()
}

function createUser(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(userApi, options)
        .then(response => {
            response.json()
        })
        .then(callback)
}

function createCart(data, userId, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/' + `${userId}` + '/carts', options)
        .then(response => {
            response.json()
        })
        .then(callback)
}

signUpForm.onSubmit = async formData => {
    showLoaderPage()
    let isExistedEmail = false
    let isExistedUsername = false
    let email = formData.email
    let username = formData.username
    let password = formData.password
    let users = await getUsersAPI()
    let userId = users.length + 1

    if (typeof users === 'object') {
        for (let user of users) {
            if (user.email === email) {
                isExistedEmail = true
                break
            } else if (user.username === username) {
                isExistedUsername = true
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
            invalid(emailInput)
            hideLoaderPage()
        } else if (isExistedUsername) {
            toast({
                title: 'Error!',
                message: 'Username already taken!',
                type: 'error',
                duration: 3000
            })
            invalid(usernameInput)
            hideLoaderPage()
        } else {
            let user = {
                email: email,
                username: username,
                password: password,
                firstname: '',
                lastname: '',
                country: '',
                streetAddress: '',
                city: '',
                state: '',
                postcode: '',
                phone: '',
                company: '',
                apartment: '',
            }

            let cart = {
                products: [],
            }

            createUser(user)

            users = await getUsersAPI()
            userId = users.length + 1
            createCart(cart, userId, () => window.location.href = './login.html')
        }
    }
}

function invalid(input) {
    input.parentElement.classList.add('invalid')
}