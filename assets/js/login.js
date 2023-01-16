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
    showLoaderPage()
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
                title: 'Thất bại!',
                message: 'Tên người dùng không tồn tại!',
                type: 'error',
                duration: 3000
            })
            invalid(usernameInput)
            return
        } else if (!isExistedPassword) {
            toast({
                title: 'Thất bại!',
                message: 'Mật khẩu không chính xác',
                type: 'error',
                duration: 3000
            })
            invalid(passwordInput)
            return
        } else {
            window.location.href = './index.html'
        }
    }
}

function invalid(input) {
    input.parentElement.classList.add('invalid')
}