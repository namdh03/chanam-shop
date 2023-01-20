const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let mobileMenu = $('#mobile-menu')
let headerHamburgerBox = $('.header__hamburger-box')
let headerMenuMobile = $('.header__menu-mobile')

export default {
    handleEvent() {
        headerHamburgerBox.onclick = function() {
            mobileMenu.classList.toggle('active')
            headerHamburgerBox.classList.toggle('active')
            headerMenuMobile.classList.toggle('active')
        }
    },

    start() {
        this.handleEvent()
    }
}