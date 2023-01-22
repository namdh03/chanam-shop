import validator from '../lib/validator.js'
import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'
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
var detailScript = $('.detail-script');
var detailCategory = $('.detail-category-type');
var detailSlides = $('.detail__slides');
var detailSlidesTablist = $('.detail__slides-tablist');
var tabs = $$(".tab-item");
var panes = $$(".tab-pane");
var tabActive = $(".tab-item.active");
var line = $(".tabs .line");
var allStars = document.querySelectorAll('.star');
var plus = document.querySelector(".plus");
var minus = document.querySelector(".minus");
var num = document.querySelector(".num");
let quantity = 1;

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
            detailPrice.innerText = '$' + product.price
            detailScript.innerText = product.description
            detailCategory.innerText = product.category.name
            detailSlides.src = product.images[0]

            detailSlidesTablist.innerHTML = Array.from(product.images).map(img => {
                return `
                    <div class="tablist-col">
                        <img class="tablist-img" src="${img}">
                    </div>
                `
            }).join('')

            Array.from(tabList).forEach(img => {
                img.onclick = function () {
                    MainImg.src = img.src;
                }
            })

            tabList[tabList.length - 1].onload = function () {
                hideLoaderPage()
            }
        })
}

getProductById(productId)


requestIdleCallback(function () {
    line.style.left = tabActive.offsetLeft + "px";
    line.style.width = tabActive.offsetWidth + "px";
});
tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
        pane.classList.add("active");
    };
});


allStars.forEach((star, i) => {
    star.onclick = function () {
        let current_star_level = i + 1;
        console.log(current_star_level);


        allStars.forEach((star, j) => {
            if (current_star_level >= j + 1) {
                star.innerHTML = '&#9733';
            } else {
                star.innerHTML = '&#9734';
            }
        })
    }
});


plus.addEventListener("click", () => {
    quantity++;
    quantity = (quantity < 10) ? "0" + quantity : quantity;
    num.innerText = quantity;
});

minus.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantity = (quantity < 10) ? "0" + quantity : quantity;
        num.innerText = quantity;
    }
});