const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userId = window.localStorage.getItem('userId')
let navClientUser = $('.header__icon--user span')

export function userIDStatus() {
    navClientUser.onclick = function() {
        if (userId) {
            window.location.href = './user.html'
        } else {
            window.location.href = './login.html'
        }
    }
}