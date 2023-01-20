class FooterUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="toast"></div>
            <div class="grid wide">
                <div class="row">
                    <div class="col l-3 m-6 c-12">
                        <div class="footer__about">
                            <div class="footer__logo">
                                <a href="#">
                                    <img src="./assets/img/footer-logo.png" alt="">
                                </a>
                            </div>
                            <p>The customer is at the heart of our unique business model, which includes design.</p>
                            <a href="#">
                                <img src="./assets/img/payment.png" alt="">
                            </a>
                        </div>
                    </div>

                    <div class="col l-2 l-o-1 m-4 m-o-2 c-12">
                        <div class="footer__widget">
                            <h6>Shopping</h6>
                            <ul>
                                <li>
                                    <a href="#">Clothing Store</a>
                                </li>

                                <li>
                                    <a href="#">Trending Shoes</a>
                                </li>

                                <li>
                                    <a href="#">Accessories</a>
                                </li>

                                <li>
                                    <a href="#">Sale</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col l-2 m-6 c-12">
                        <div class="footer__widget">
                            <h6>Shopping</h6>
                            <ul>
                                <li>
                                    <a href="#">Contact Us</a>
                                </li>
                                
                                <li>
                                    <a href="#">Payment Methods</a>
                                </li>
                                
                                <li>
                                    <a href="#">Delivary</a>
                                </li>
                                
                                <li>
                                    <a href="#">Return &amp; Exchanges</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col l-3 l-o-1 m-4 m-o-2 c-12">
                        <div class="footer__widget">
                            <h6>NEWLETTER</h6>
                            <div class="footer__newslatter">
                                <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                                <form action="" method="POST" class="form" id="newletter-form">
                                    <div class="form-group">
                                        <input id="email" name="email" rules="required|email" type="text" placeholder="email@example.com"
                                        class="form-control">
                                        <span class="form-message"></span>
                                    </div>
                                    <button type="submit">
                                        <i class="fa fa-envelope"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('footer-ui', FooterUI)