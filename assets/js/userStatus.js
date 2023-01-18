const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userId = window.localStorage.getItem('userId')
let navClientUser = $('.nav__client-user')

export function userIDStatus() {
    if (userId) {
        navClientUser.setAttribute('href', './user.html')
    } else {
        navClientUser.setAttribute('href', './login.html')
    }
}