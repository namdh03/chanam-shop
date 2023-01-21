class BannerUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="grid wide">
                <div class="row">
                    <div class="col l-7 l-o-4 m-12 m-o-0 c-10 c-o-1">
                        <div class="banner__item">
                            <div class="banner__item-img">
                                <img src="./assets/img/banner-1.jpg" alt="">
                            </div>
                            <div class="banner__item-text">
                                <h2>Clothing Collections 2030</h2>
                                <a href="">Shop now</a>
                            </div>
                        </div>
                    </div>
            
                    <div class="col l-5 m-12 m-o-0 c-10 c-o-1">
                        <div class="banner__item banner__item--middle">
                            <div class="banner__item-img">
                                <img src="./assets/img/banner-2.jpg" alt="">
                            </div>
                            <div class="banner__item-text">
                                <h2>Accessories</h2>
                                <a href="">Shop now</a>
                            </div>
                        </div>
                    </div>
            
                    <div class="col l-7 m-12 m-o-0 c-10 c-o-1">
                        <div class="banner__item banner__item--last">
                            <div class="banner__item-img">
                                <img src="./assets/img/banner-3.jpg" alt="">
                            </div>
                            <div class="banner__item-text">
                                <h2>Shoes Spring 2030</h2>
                                <a href="">Shop now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('banner-ui', BannerUI)