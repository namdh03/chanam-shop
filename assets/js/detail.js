import validator from '../lib/validator.js'
import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from './loader.js'
import { userIDStatus } from './userStatus.js'
import toast from '../lib/toast.js'
import scroll from './scrollToTop.js'
import header from './header.js'
import product from './product.js'
import miniCart from './miniCart.js'
import footer from './footer.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let userId = window.localStorage.getItem('userId')
let productsAPI = await product.getProductsAPI()
let productId = window.localStorage.getItem('productId')
let MainImg = document.getElementById('main-slide')
let tabList = document.getElementsByClassName('tablist-img')
let detailHeaderTitle = $('.detail__header-title')
let detailHeaderNameProduct = $('.detail__header-name-product')
let detailTitle = $('.detail-title')
let detailPrice = $('.detail-price')
let detailScript = $('.detail-script')
let detailCategory = $('.detail-category-type')
let detailSlides = $('.detail__slides')
let detailSlidesTablist = $('.detail__slides-tablist')
let tabs = $$('.tab-item')
let panes = $$('.tab-pane')
let tabActive = $('.tab-item.active')
let line = $('.tabs .line')
let allStars = document.querySelectorAll('.star')
let detailAddToWishlist = $('.detail-add-to-wishlist')
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')
let num = document.querySelector('.num')
let quantity = 1
let detailReturnHome = $('.redirect__return-to-home')
let detailWrapper = $('.detail__wrapper')

userIDStatus()
header.start()
miniCart(productsAPI).start()
scroll()
footer.start()

if (!userId) {
    detailReturnHome.classList.remove('hide')
    detailWrapper.classList.add('hide')
    hideLoaderPage()
}

function getProductById(productId) {
    if (productId) {
        fetch('https://63cd48090f1d5967f02d485e.mockapi.io/products/' + `${productId}`)
            .then(response => {
                return response.json()
            })
            .then(product => {
                detailHeaderTitle.innerText = product.title
                detailHeaderNameProduct.innerText = product.title
                detailTitle.innerText = product.title
                detailPrice.innerText = '$' + product.price
                detailScript.innerText = product.description
                detailCategory.innerText = product.category.name
                detailSlides.src = product.images[0]

                detailSlidesTablist.innerHTML = Array.from(product.images).map(img => {
                    return `
                    <div class='tablist-col'>
                        <img class='tablist-img' src='${img}'>
                    </div>
                `
                }).join('')

                Array.from(tabList).forEach(img => {
                    img.onclick = function () {
                        MainImg.src = img.src
                    }
                })

                tabList[tabList.length - 1].onload = function () {
                    hideLoaderPage()
                }
            })
    }
}

getProductById(productId)

requestIdleCallback(function () {
    line.style.left = tabActive.offsetLeft + 'px'
    line.style.width = tabActive.offsetWidth + 'px'
})
tabs.forEach((tab, index) => {
    const pane = panes[index]

    tab.onclick = function () {
        $('.tab-item.active').classList.remove('active')
        $('.tab-pane.active').classList.remove('active')

        line.style.left = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'

        this.classList.add('active')
        pane.classList.add('active')
    }
})

allStars.forEach((star, i) => {
    star.onclick = function () {
        let current_star_level = i + 1
        console.log(current_star_level)


        allStars.forEach((star, j) => {
            if (current_star_level >= j + 1) {
                star.innerHTML = '&#9733'
            } else {
                star.innerHTML = '&#9734'
            }
        })
    }
})

plus.addEventListener('click', () => {
    quantity++
    num.innerText = quantity
})

minus.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--
        num.innerText = quantity
    }
})

detailAddToWishlist.onclick = function () {
    detailAddToWishlist.classList.toggle('active')
}