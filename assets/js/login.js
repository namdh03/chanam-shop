import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'
import validator from '../lib/validator.js'
import toast from '../lib/toast.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userApi = 'https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users'
let loginForm = new validator('#login-form')
let usernameInput = $('.login-form__input--username')
let passwordInput = $('.login-form__input--password')

hideLoaderPage()

async function getUsersAPI() {
    return (await fetch(userApi)).json()
}

async function createCart(data, userId, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    }

    fetch('https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/' + `${userId}` + '/carts', options)
        .then(response => {
            response.json()
        })
        .then(callback)
}

async function getCart(userId) {
    if (!userId) return
    return (await fetch('https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/' + userId + '/carts')).json()
}

loginForm.onSubmit = async formData => {
    showLoaderDefault()
    let isExistedUsername = false
    let isExistedPassword = false
    let username = formData.username
    let password = formData.password
    let users = await getUsersAPI()

    if (typeof users === 'object') {
        for (let user of users) {
            if (user.username === username) {
                isExistedUsername = true

                if (user.password === password) {
                    isExistedPassword = true
                    window.localStorage.setItem('userId', user.id)
                    
                    let userId = window.localStorage.getItem('userId')
                    let cartUser = await getCart(userId)

                    if (Object.keys(cartUser).length === 0) {
                        let cart = {
                            products: [],
                        }

                        await createCart(cart, userId, () => window.location.href = './index.html')
                    }
                }

                break
            }
        }

        if (!isExistedUsername) {
            toast({
                title: 'Error!',
                message: 'ERROR: Username or password incorrect!',
                type: 'error',
                duration: 3000
            })
            invalid()
            hideLoaderDefault()
            return
        } else if (!isExistedPassword) {
            toast({
                title: 'Error!',
                message: 'ERROR: Username or password incorrect!',
                type: 'error',
                duration: 3000
            })
            invalid()
            hideLoaderDefault()
            return
        } else {
            window.location.href = './index.html'
        }
    }
}

function invalid() {
    usernameInput.parentElement.classList.add('invalid')
    passwordInput.parentElement.classList.add('invalid')
}