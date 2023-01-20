import validator from '../lib/validator.js'
import {showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault} from '../js/loader.js'
import { userIDStatus } from '../js/userStatus.js'
import toast from '../lib/toast.js'
import scroll from '../js/scrollToTop.js'
import header from '../js/header.js'
import product from '../js/product.js'
import miniCart from '../js/miniCart.js'
import footer from '../js/footer.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var productsAPI = await product.getProductsAPI();
var productId = window.localStorage.getItem('productId')
var MainImg = document.getElementById('main-slide');
var tabList = document.getElementsByClassName('tablist-img');
var detailHeaderTitle = $('.detail__header-title');
var detailHeaderNameProduct = $('.detail__header-name-product');
var detailTitle = $('.detail-title');
var detailPrice = $('.detail-price');
var detailScript = $('.detail__script');
var detailCategory = $('.detail-category');
var detailSlides = $('.detail__slides');
var detailSlidesTablist = $('.detail__slides-tablist');

userIDStatus()
header.start()
miniCart(productsAPI).start()
scroll()
footer.start()

function getProductById(productId) {
    fetch('https://api.escuelajs.co/api/v1/products/' + `${productId}`)
        .then(response => {
            return response.json()
        })
        .then(product => {
            detailHeaderTitle.innerText = product.title
            detailHeaderNameProduct.innerText = product.title
            detailTitle.innerText = product.title
            detailPrice.innerText = product.price
            detailScript.innerText = product.description
            detailCategory.innerText = 'Category: ' + product.category.name
            detailSlides.src = product.images[0]

            detailSlidesTablist.innerHTML = Array.from(product.images).map(img => {
                return `
                    <div class="tablist-col">
                        <img class="tablist-img" src="${img}">
                    </div>
                `
            }).join('')

            Array.from(tabList).forEach(img => {
                img.onclick = function() {
                    MainImg.src = img.src;
                }
            })

            tabList[tabList.length - 1].onload = function() {
                hideLoaderPage()
            }
        })
}

getProductById(productId)