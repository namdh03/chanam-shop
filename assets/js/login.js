import validator from '../lib/validator.js'
import toast from '../lib/toast.js'
import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'

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