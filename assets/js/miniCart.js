import validator from '../lib/validator.js'
import product from './product.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

export default function miniCart(products = undefined) {
    let userId = window.localStorage.getItem('userId')
    let cartApi = 'https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/1/carts'
    let navClientCart = $('.header__icon--cart span')
    let productMiniCart = $('.product__mini-cart')
    let productMiniCartWrapper = $('.product__mini-cart-wrapper')
    let productMiniCartClose = $('.product__mini-cart-close')
    let productMiniCartItems = $('.product__mini-cart-items')
    let productMiniCartSubtotalNumber = $('.product__mini-cart-subtotal-number')
    let qvForm = $('#qv-form')
    let qvFormValidator = new validator('#qv-form')
    let productPopup = $('.product__popup')
    let productPopupQuantity = $('.product__popup-quantity')
    let productPopupTotal = $('.product__popup-total')
    let productPopupOverlay = $('.product__popup-overlay')
    let productPopupContinueBtn = $('.product__popup--continue-btn')
    let productPopupCartBtn = $('.product__popup--cart-btn')
    let headerCartQuantity = $('.header__cart-quantity')
    let productMiniCartThumbnailLinks = document.getElementsByClassName('product__mini-cart-thumbnail-link')
    let productMiniCartNameLinks = document.getElementsByClassName('product__mini-cart-name')

    return {
        cart: {},
        products: [],
        quantity: 1,
        amount: 0,
        subTotal: 0,

        async isElementLoaded(selectors, method) {
            if (method === 'querySelectorAll') {
                while ($$(selectors).length === 0) {
                    await new Promise(resolve => requestAnimationFrame(resolve))
                }
                return $$(selectors)
            }

            if (method === 'querySelector') {
                while ($(selectors) === null) {
                    await new Promise(resolve => requestAnimationFrame(resolve))
                }
                return $(selectors)
            }
        },

        async getCart(userId) {
            return (await fetch('https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/' + userId + '/carts')).json()
        },

        // Handle update product to api
        async updateProducts(data, id, callback) {
            let options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        
            fetch(cartApi + '/' + id, options)
                .then(function (response) {
                    response.json()
                })
                .then(callback)
        },

        // Main mini cart
        miniCart() {
            this.isElementLoaded('.product__btn--add-to-cart', 'querySelectorAll')
                .then(selectors => {
                    const _this = this
                    
                    Array.from(selectors).forEach(button => {
                        button.onclick = function () {
                            if (userId) {
                                let productItemElement = product.getParent(button, '.product__item')
                                let productIndex = productItemElement.parentElement.getAttribute('data-index')
                                _this.renderMiniCart(products, productIndex, _this.quantity)
                                _this.renderPopup()
                            } else {
                                window.location.href = './login.html'
                            }

                            _this.showEmptyText()
                        }
                    })
                    this.showEmptyText()
                })

                for (let i of this.products) {
                    for (let j of products) {
                        if (i.productID === j.id) {
                            this.createCartItem(j.images[0], j.title, i.quantity, j.price, i.productID)
                            break
                        }
                    }
                }
        },

        // Handle render popup notification
        renderPopup() {
            productPopup.classList.remove('hide')
            productPopupQuantity.innerText = this.amount
            productPopupTotal.innerText = '£' + this.subTotal
        },

        // Handle exception and add to cart
        renderMiniCart(products, productIndex, amount) {
            let productItem = products[productIndex]
            let productID = productItem.id
            let quantity = Number(amount)
            let productMiniCartItem = $$('.product__mini-cart-item')

            this.subTotal += amount * productItem.price
            productMiniCartSubtotalNumber.innerText = '£' + this.subTotal
            
            this.amount += quantity
            headerCartQuantity.innerText = this.amount

            for (let i = 0; i < this.products.length; i++) {
                if (productID === this.products[i].productID) {
                    quantity += this.products[i].quantity
                    this.products.splice(i, 1)
                    break
                }
            }

            this.products.push({ productID, quantity })
            this.cart["products"] = this.products
            this.cart["userId"] = userId
            this.updateProducts(this.cart, userId)
            
            for (let item of productMiniCartItem) {
                if (Number(item.getAttribute('data-id')) === productID) {
                    let number = item.querySelector('.product__mini-cart-quantity')
                    number.innerText = quantity + ' x'
                    return
                }
            }
            
            this.createCartItem(productItem.images[0], productItem.title, quantity, productItem.price, productID)
        },

        createCartItem(image, title, quantity, price, productID) {
            let cartItem = document.createElement('div')
            cartItem.setAttribute('class', 'product__mini-cart-item')
            cartItem.setAttribute('data-id', productID)

            cartItem.innerHTML = `
                <div class="product__mini-cart-thumbnail">
                    <a href="./detail.html" class="product__mini-cart-thumbnail-link">
                        <img src="${image}" alt="">
                    </a>
                </div>

                <div class="product__mini-cart-info">
                    <div class="product__mini-cart-name">
                        <a href="./detail.html" class="product__mini-cart-name-link">${title}</a>
                    </div>

                    <div class="product__mini-cart-price">
                        <span class="product__mini-cart-quantity">${quantity} x </span>
                        <span class="product__mini-cart-number">£${price}</span>
                    </div>
                </div>

                <div class="product__mini-cart-remove">
                    <i class="fa-regular fa-rectangle-xmark product__mini-cart-remove-icon"></i>
                </div>
            `
            productMiniCartItems.append(cartItem)
            let productMniCartRemoveBtn = $$('.product__mini-cart-remove')
            this.removeCartItem(productMniCartRemoveBtn)
        },

        removeCartItem(productMniCartRemoveBtn) {
            const _this = this
            Array.from(productMniCartRemoveBtn).forEach(button => {
                button.onclick = function () {
                    let item = product.getParent(button, '.product__mini-cart-item')
                    let quantity = Number(item.querySelector('.product__mini-cart-quantity').textContent.replace(/\D/g, ''))
                    let price = Number(item.querySelector('.product__mini-cart-number').textContent.replace(/\D/g, ''))
                    
                    item.remove()

                    for (let i = 0; i < _this.products.length; i++) {
                        if (Number(item.getAttribute('data-id')) === _this.products[i].productID) {
                            _this.products.splice(i, 1)
                            _this.cart["products"] = _this.products
                            _this.cart["userId"] = userId
                            _this.updateProducts(_this.cart, userId)
                            _this.showEmptyText()
                            break
                        }
                    }

                    _this.subTotal -= quantity * price
                    _this.amount -= quantity

                    productMiniCartSubtotalNumber.innerText = '£' + _this.subTotal
                    headerCartQuantity.innerText = _this.amount
                    _this.showEmptyText()
                }
            })
        },

        handleEvents() {
            const _this = this

            // Handle show mini cart
            navClientCart.onclick = function () {
                productMiniCart.classList.add('active')
                productMiniCartWrapper.classList.add('active')
            }

            // Handle close mini cart
            productMiniCartClose.onclick = function () {
                productMiniCart.classList.remove('active')
                productMiniCartWrapper.classList.remove('active')
            }

            // Handle close popup add to cart
            if (productPopupOverlay) {
                productPopupOverlay.onclick = function() {
                    productPopup.classList.add('hide')
                }
            }

            if (productPopupContinueBtn) {
                productPopupContinueBtn.onclick = function() {
                    productPopup.classList.add('hide')
                }
            }

            // Handle switch to cart page
            if (productPopupCartBtn) {
                productPopupCartBtn.onclick = function() {
                    window.location.href = './cart.html'
                }
            }

            // Handle close product mini cart
            productMiniCart.onclick = function(e) {
                if (e.target !== this) {
                    return
                }
                productMiniCart.classList.remove('active')
            }

            //  Handle click to image link product in mini cart
            Array.from(productMiniCartThumbnailLinks).forEach(link => {
                link.onclick = function() {
                    let productId = product.getParent(link, '.product__mini-cart-item').getAttribute('data-id')
                    window.localStorage.setItem('productId', productId)                    
                }
            })

            //  Handle click to title link product in mini cart
            Array.from(productMiniCartNameLinks).forEach(link => {
                link.onclick = function() {
                    let productId = product.getParent(link, '.product__mini-cart-item').getAttribute('data-id')
                    window.localStorage.setItem('productId', productId) 
                }
            })
        },

        showEmptyText() {
            let productMiniCartItem = $$('.product__mini-cart-item')
            let productMiniCartEmptyMsg = $('.product__mini-cart-empty-msg')
            let productMiniCartSubtotal = $('.product__mini-cart-subtotal')
            let productMiniCartBtns = $('.product__mini-cart-btns')

            if (productMiniCartItem.length === 0) {
                this.subTotal = 0
                productMiniCartEmptyMsg.classList.remove('hide')
                productMiniCartSubtotal.classList.add('hide')
                productMiniCartBtns.classList.add('hide')
            } else {
                productMiniCartEmptyMsg.classList.add('hide')
                productMiniCartSubtotal.classList.remove('hide')
                productMiniCartBtns.classList.remove('hide')
            }
        },

        loadSubtotal() {
            for (let i of this.products) {
                for (let j of products) {
                    if (i.productID === j.id) {
                        this.subTotal += i.quantity * j.price
                        break
                    }
                }
            }
            productMiniCartSubtotalNumber.innerText = '£' + this.subTotal
        },

        loadAmount() {
            for (let i of this.products) {
                for (let j of products) {
                    if (i.productID === j.id) {
                        this.amount += i.quantity
                        break
                    }
                }
            }
            headerCartQuantity.innerText = this.amount
        },
        
        async loadCurrProducts() {
            if (userId) {
                let carts = await this.getCart(userId)
                
                for (let cart of carts) {
                    if (cart.userId === userId) {
                        this.products = cart.products
                        break
                    }
                }
            }
        },

        qvSubmitForm() {
            // Handle click add to cart at quick view ui
            qvFormValidator.onSubmit = formData => {
                if (userId) {
                    let productIndex = qvForm.getAttribute('data-index')
                    this.renderMiniCart(products, productIndex, formData.quantity)

                    // Handle show popup notification when quick view add to cart button clicked
                    this.renderPopup()
                    $('.product__qv-close-btn').click()

                    this.showEmptyText()
                } else {
                    window.location.href = './login.html'
                }
            }
        },

        async start() {
            await this.loadCurrProducts()
            this.loadSubtotal()
            this.loadAmount()
            this.miniCart()
            this.handleEvents()
            this.qvSubmitForm()
            this.showEmptyText()
        }
    }
}