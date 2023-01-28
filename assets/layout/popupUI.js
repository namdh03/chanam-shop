class PopupUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="product__popup hide">
                <div class="product__popup-overlay"></div>
                <div class="product__popup-inner">
                    <div class="product__popup-checkmark">
                        <div class="product__popup-circle">
                            <span></span>
                        </div>
                    </div>
                    <h3 class="product__popup-title">Item added to your cart</h3>
                    <div class="product__popup-content">
                        <span class="product__popup-quantity"></span>
                        items in the cart (<span class="product__popup-total"></span>)
                    </div>
                    <div class="product__popup-button-wrapper">
                        <button class="product__popup-btn product__popup--continue-btn">Continue Shopping</button>
                        <button class="product__popup-btn product__popup--cart-btn">Go To The Cart</button>
                    </div>
                    <p class="product__popup-thank-you-text">Thank you for your business</p>
                </div>
            </div>
        `
    }
}

customElements.define('popup-ui', PopupUI)