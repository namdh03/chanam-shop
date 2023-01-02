import quickViewProducts from '../js/quickView.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

export default function product() {
    let productCategoryBtn = document.getElementsByClassName('product__category-btn')
    let productItems = document.getElementsByClassName('product__item')
    let productTitle = document.getElementsByClassName('product__item-title')
    let productContainer = $('.product__container')
    let productCategory = $('.product__category')
    let productSearchInput = $('#product__search-input')
    let productSearchBtn = $('.product__search-btn')
    let emptyText = $('.product__empty-text')
    let viewMoreButton = $('.product__view-more-btn')

    return {
        products: [],
        categories: [],
        curIndex: 0,

        async getProductsAPI() {
            let productApi = 'https://dummyjson.com/products'
            return (await fetch(productApi)).json()
        },

        async getCategoriesAPI() {
            let categoryApi = 'https://api.escuelajs.co/api/v1/categories'
            return (await fetch(categoryApi)).json()
        },

        // Handle get parent of element based on selector 
        getParent(element, selector) {
            while (element.parentElement) {
                if (element.parentElement.matches(selector)) {
                    return element.parentElement;
                } else {
                    element = element.parentElement;
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
            let data = await this.getProductsAPI()
            this.products = data.products

            if (this.products) {
                productContainer.innerHTML = this.products.map((product, index) => {
                    return `
                    <div class="col l-4 l-o-0 m-12 m-o-0 c-10 c-o-1" data-index="${index}">
                        <div class="product__item" data-category="${product.category.name}">
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
                                            <span><i class="fa-solid fa-right-left"></i></span>
                                        </div>
                                    </div>
                                    
                                    <div class="product__item-btn product__btn--add-to-cart">
                                        <div class="product__item-btn-tooltip">Add To Cart</div>
                                        <div href="" class="product__item-btn-link">
                                            <span><i class="fa-solid fa-cart-flatbed"></i></span>
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
        },

        handleEvents() {
            const _this = this

            // Handle filter categories of products
            Array.from(productCategoryBtn).forEach(button => {
                button.onclick = function (e) {
                    if ($('.product__category-btn.active')) {
                        $('.product__category-btn.active').classList.remove('active')
                    }
                    e.target.classList.add('active')

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

            // Handle search for product names
            productSearchBtn.onclick = function () {
                Array.from(productTitle).forEach((title, index) => {
                    let product = _this.getParent(title, '.product__item')
                    if (productSearchInput.value) {
                        if (title.innerText.toLowerCase().includes(productSearchInput.value.toLowerCase())) {
                            product.parentElement.classList.remove('hide')
                            product.parentElement.setAttribute('data-index', `${index}`)
                        } else {
                            product.parentElement.classList.add('hide')
                            product.parentElement.removeAttribute('data-index')
                        }
                    }
                })
                _this.loadCurProducts()
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
            if (productContainer.offsetHeight === 0) {
                emptyText.classList.remove('hide')
                viewMoreButton.classList.add('hide')
            } else {
                emptyText.classList.add('hide')
                viewMoreButton.classList.remove('hide')
            }
        },

        async start() {
            await this.renderProducts()
            await this.renderCategories()
            this.loadCurProducts()
            this.handleEvents()
            quickViewProducts(this.products).start()
        },
    }
}