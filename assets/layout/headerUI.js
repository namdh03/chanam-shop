class HeaderUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="grid wide">
                <div class="row">
                    <div class="col l-3 m-4 c-0">
                        <a href="./index.html" class="header__logo-desktop">
                            <img src="./assets/img/header.png" alt="">
                        </a>
                    </div>
            
                    <div class="col l-5 m-0 c-0">
                        <ul class="header__menu-desktop">
                            <li><a href="./index.html" class="header__menu-item active">Home</a></li>
                            <li><a class="header__menu-item">Shop</a></li>
                            <li><a href="./cart.html" class="header__menu-item">Features
                                <span class="header__menu-item--features">Hot</span>
                            </a></li>
                            <li><a class="header__menu-item">Blog</a></li>
                            <li><a class="header__menu-item">About</a></li>
                            <li><a class="header__menu-item">Contact</a></li>
                        </ul>
                    </div>
            
                    <div class="col l-3 l-o-1 m-5 m-o-2 c-10">
                        <div class="header__icon-wrapper">
                            <div class="header__icon header__icon--search">
                                <span class="ti-search"></span>
                            </div>
            
                            <div class="header__icon header__icon--cart">
                                <span class="ti-shopping-cart"></span>
                                <span class="header__cart-quantity">0</span>
                            </div>
            
                            <div class="header__icon header__icon--wishlist">
                                <span class="ti-heart"></span>
                                <span class="header__cart-wishlist">0</span>
                            </div>
            
                            <div class="header__icon header__icon--user">
                                <span class="ti-user"></span>
                            </div>
                        </div>
                    </div>
            
                    <div class="col l-0 m-1 c-2">
                        <div class="header__hamburger-box">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('header-ui', HeaderUI)

class MobileMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <ul class="header__menu-mobile">
                <li><a href="./index.html" class="header__menu-item-mobile active">Home</a></li>
                <li><a href="" class="header__menu-item-mobile">Shop</a></li>
                <li><a href="./cart.html" class="header__menu-item-mobile">Features
                    <span class="header__menu-item--features header__menu-item-mobile--features">Hot</span>
                </a></li>
                <li><a href="" class="header__menu-item-mobile">Blog</a></li>
                <li><a href="" class="header__menu-item-mobile">About</a></li>
                <li><a href="" class="header__menu-item-mobile">Contact</a></li>
            </ul>
        `
    }
}

customElements.define('mobile-menu-ui', MobileMenu)