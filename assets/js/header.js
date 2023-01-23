const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let mobileMenu = $('#mobile-menu')
let headerMenuItem = $$('.header__menu-item')
let headerHamburgerBox = $('.header__hamburger-box')
let headerMenuMobile = $('.header__menu-mobile')
let currLocation = window.location.href

export default {
    handleEvent() {
        headerHamburgerBox.onclick = function() {
            mobileMenu.classList.toggle('active')
            headerHamburgerBox.classList.toggle('active')
            headerMenuMobile.classList.toggle('active')
        }
        
        // Handle add class active for navigation item when page is redirected
        Array.from(headerMenuItem).forEach(item => {
            if (item.href === currLocation) {
                if ($('.header__menu-item.active')) {
                    $('.header__menu-item.active').classList.remove('active')
                }
                item.classList.add('active')
            }
        })
    },

    start() {
        this.handleEvent()
    }
}