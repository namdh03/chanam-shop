import quickViewProducts from '../js/quickView.js'
import miniCart from '../js/miniCart.js'
import { showLoaderPage, hideLoaderPage, showLoaderDefault, hideLoaderDefault } from '../js/loader.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let productCategoryBtn = document.getElementsByClassName('product__category-btn')
let productItems = document.getElementsByClassName('product__item')
let productTitle = document.getElementsByClassName('product__item-title')
let productContainer = $('.product__container')
let productCategory = $('.product__category')
let productSearchInput = $('#product__search-input')
let productSearchBtn = $('.product__search-btn')
let emptyText = $('.product__empty-text')
let viewMoreButton = $('.product__view-more-btn')


export default  {
    products: [],
    categories: [],
    curIndex: 0,

    async getProductsAPI() {
        showLoaderPage()
        let productApi = 'https://api.escuelajs.co/api/v1/products'
        return (await fetch(productApi)).json()
    },

    async getCategoriesAPI() {
        showLoaderPage()
        let categoryApi = 'https://api.escuelajs.co/api/v1/categories'
        return (await fetch(categoryApi)).json()
    },

    // Handle get parent of element based on selector 
    getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            } else {
                element = element.parentElement
            }
        }
    },

    // Get length all non-hidden data index elements
    getLengthOfDataIndexEs() {
        let cnt = 0
        Array.from(productItems).forEach(item => {
            if (item.parentElement.hasAttribute('data-index')) {
                cnt++
            }
        })
        return cnt
    },

    // Handle render products
    async renderProducts() {
        this.products = await this.getProductsAPI()

        if (this.products) {
            productContainer.innerHTML = this.products.map((product, index) => {
                return `
                <div class="col l-4 l-o-0 m-6 m-o-0 c-10 c-o-1" data-index="${index}">
                    <div class="product__item" data-id="${product.id}" data-category="${product.category.name}">
                        <div class="product__item-img-wrapper">
                            <a href="" class="product__item-link">
                                <img src="${product.images[0]}" alt="" class="product__item-img">
                            </a>

                            <div class="product__item-btn-wrapper">
                                <div class="product__item-btn product__btn--quick-view">
                                    <div class="product__item-btn-tooltip">Quick View</div>
                                    <div href="" class="product__item-btn-link">
                                        <span><i class="fa-regular fa-eye"></i></span>
                                    </div>
                                </div>
                                
                                <div class="product__item-btn product__btn--wishlist">
                                    <div class="product__item-btn-tooltip">Wishlist</div>
                                    <div href="" class="product__item-btn-link">
                                        <span><i class="fa-regular fa-heart"></i></span>
                                    </div>
                                </div>

                                <div class="product__item-btn product__btn--compare">
                                    <div class="product__item-btn-tooltip">Compare</div>
                                    <div href="" class="product__item-btn-link">
                                        <span><i class="ti-arrows-corner"></i></span>
                                    </div>
                                </div>
                                
                                <div class="product__item-btn product__btn--add-to-cart">
                                    <div class="product__item-btn-tooltip">Add To Cart</div>
                                    <div href="" class="product__item-btn-link">
                                        <span><i class="fa-brands fa-opencart"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="product__item-info">
                            <div class="product__item-title">
                                <a href="" class="product__item-info-link">${product.title}</a>
                            </div>
                            <div class="product__item-category">
                                <a href="" class="product__item-info-link">${product.category.name}</a>
                            </div>
                            <div class="product__item-price">£${product.price}</div>
                        </div>
                    </div>
                </div>
                `
            }).join('')
        }
        hideLoaderPage()
    },

    // Handle render category button
    async renderCategories() {
        this.categories = await this.getCategoriesAPI()
        this.categories.forEach(category => {
            let button = document.createElement('button')
            button.setAttribute('class', 'product__category-btn')
            button.innerText = `${category.name}`
            productCategory.appendChild(button)
        })
        hideLoaderPage()
    },

    handleEvents() {
        const _this = this

        // Handle filter categories of products
        this.filterProducts()

        // Handle search for product names
        productSearchBtn.onclick = function () {
            _this.searchProducts()
        }

        // Handle click enter to search products
        productSearchInput.onkeypress = function (e) {
            if (e.keyCode === 13) {
                _this.searchProducts()
            }
        }

        // Handle displaying more products when clicking the view more button
        viewMoreButton.onclick = function () {
            let cnt = 0
            let length = _this.getLengthOfDataIndexEs()

            Array.from(productItems).forEach(item => {
                if (item.parentElement.hasAttribute('data-index')) {
                    if (item.parentElement.classList.contains('hide') && cnt < 9) {
                        item.parentElement.classList.remove('hide')
                        cnt++
                        _this.curIndex++
                    }
                }
            })

            if (_this.curIndex + 9 >= length) {
                viewMoreButton.classList.add('hide')
            }
        }
    },

    // Handle showing only 9 product items per category
    loadCurProducts() {
        let cnt = 0
        this.curIndex = 0
        this.showEmptyText()
        this.autoHideViewMoreBtn()
        Array.from(productItems).forEach(product => {
            if (!product.parentElement.classList.contains('hide')) {
                if (cnt < 9) {
                    product.parentElement.classList.remove('hide')
                    cnt++
                } else {
                    product.parentElement.classList.add('hide')
                }
            }
        })
    },

    // Handle if there are only < 9 products, automatically hide the see more button
    autoHideViewMoreBtn() {
        let cnt = 0

        Array.from(productItems).forEach(item => {
            if (item.parentElement.hasAttribute('data-index')) {
                cnt++
            }
        })

        if (cnt < 9 && cnt !== 0) {
            viewMoreButton.classList.add('hide')
        }
    },

    // Handle if there is no product
    showEmptyText() {
        let productContainerCS = getComputedStyle(productContainer)
        let productContainerHeight = productContainer.clientHeight
        productContainerHeight = productContainer.clientHeight
            - (parseFloat(productContainerCS.paddingTop)
                + parseFloat(productContainerCS.paddingBottom))
        if (productContainerHeight === 0) {
            emptyText.classList.remove('hide')
            viewMoreButton.classList.add('hide')
        } else {
            emptyText.classList.add('hide')
            viewMoreButton.classList.remove('hide')
        }
    },

    searchProducts() {
        if (typeof productSearchInput.value !== 'string' || productSearchInput.value.trim().length !== 0) {
            // productContainer.scrollIntoView()
            this.scrollElement(productContainer)
            let categoryBtn = $('.product__category-btn.active')
            Array.from(productTitle).forEach((title, index) => {

                let product = this.getParent(title, '.product__item')

                if (categoryBtn.innerText.toLowerCase() === 'all products') {
                    if (title.innerText.toLowerCase().includes(productSearchInput.value.toLowerCase())) {
                        product.parentElement.classList.remove('hide')
                        product.parentElement.setAttribute('data-index', `${index}`)
                    } else {
                        product.parentElement.classList.add('hide')
                        product.parentElement.removeAttribute('data-index')
                    }
                } else {
                    if (categoryBtn.innerText.toLowerCase() === title.nextElementSibling.textContent.trim().toLocaleLowerCase()) {
                        if (title.innerText.toLowerCase().includes(productSearchInput.value.toLowerCase())) {
                            product.parentElement.classList.remove('hide')
                            product.parentElement.setAttribute('data-index', `${index}`)
                        } else {
                            product.parentElement.classList.add('hide')
                            product.parentElement.removeAttribute('data-index')
                        }
                    }
                }
            })
            this.loadCurProducts()
        }
    },

    filterProducts() {
        const _this = this
        Array.from(productCategoryBtn).forEach(button => {
            button.onclick = function (e) {
                if ($('.product__category-btn.active')) {
                    $('.product__category-btn.active').classList.remove('active')
                }
                e.target.classList.add('active')

                // productContainer.scrollIntoView()

                Array.from(productItems).filter((product, index) => {
                    if (e.target.innerText.toLowerCase() === 'all products') {
                        product.parentNode.classList.remove('hide')
                        product.parentElement.setAttribute('data-index', `${index}`)
                    } else {
                        if ((product.getAttribute('data-category').toLowerCase() === e.target.innerText.toLowerCase())) {
                            product.parentNode.classList.remove('hide')
                            product.parentElement.setAttribute('data-index', `${index}`)
                        } else {
                            product.parentNode.classList.add('hide')
                            product.parentElement.removeAttribute('data-index')
                        }
                    }
                })
                productSearchInput.value = ''
                _this.loadCurProducts()
            }
        })
    },

    scrollElement(element) {
        window.scroll(0, this.position(element))
    },

    position(obj) {
        var currentTop = -100
        if (obj.offsetParent) {
            do {
                currentTop += obj.offsetTop
            } while ((obj = obj.offsetParent))
            return [currentTop]
        }
    },

    async start() {
        await this.renderProducts()
        await this.renderCategories()
        this.loadCurProducts()
        this.handleEvents()
        quickViewProducts(this.products).start()
        miniCart(this.products).start()
    }
}