import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'
import scroll from '../js/scrollToTop.js'
import footer from '../js/footer.js'
import product from '../js/product.js'

hideLoaderPage()
scroll()
footer.start()

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var MainImg = document.getElementById('main-slide');
var tabList = document.getElementsByClassName('tablist-img');

tabList[0].onclick = function () {
    MainImg.src = tabList[0].src;
}
tabList[1].onclick = function () {
    MainImg.src = tabList[1].src;
}
tabList[2].onclick = function () {
    MainImg.src = tabList[2].src;
}