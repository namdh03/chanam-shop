class CartUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="grid">
                <div class="row no-gutters">
                    <div class="col l-12 m-12 c-12">
                        <div class="redirect__page">
                            <h1 class="redirect__page-title">Cart</h1>
                            <div class="redirect__page-navigation">
                                <a href="index.html">Home</a>
                                <span>Cart</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="redirect__return-to-home hide">
                    <div class="grid wide">
                        <div class="row no-gutters">
                            <div class="col l-12 m-12 c-12">
                                <a href="./index.html" class="redirect__return-to-home-btn">
                                    <span class="ti-angle-left"></span>
                                    Return to home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid wide cart__wrapper">
                <div class="row row-mobile">
                    <div class="col l-8 m-12 c-12">
                        <div class="cart__info">
                            <div class="grid cart__header">
                                <div class="row no-gutters">
                                    <div class="col l-3 l-o-2 m-3 m-o-2 c-3 c-o-2">
                                        <div class="cart__header-title">Product</div>
                                    </div>

                                    <div class="col l-2 m-2 c-2">
                                        <div class="cart__header-title">Price</div>
                                    </div>

                                    <div class="col l-3 m-3 c-3">
                                        <div class="cart__header-title">Quantity</div>
                                    </div>

                                    <div class="col l-2 m-2 c-2">
                                        <div class="cart__header-title">Subtotal</div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid cart__body"></div>

                            <div class="grid cart__footer">
                                <div class="row">
                                    <div class="col l-8 m-12 c-12">
                                        <div class="cart-coupon__form cart__pad">
                                            <span><input type="text" placeholder="Coupon code" class="cart-coupon__code"></span>
                                            <button class="cart-coupon__submit">APPLY COUPON</button>
                                        </div>
                                    </div>

                                    <div class="col l-4 m-12 c-12">
                                        <div class="cart__update">
                                            <button class="cart__update-btn">Update Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col l-4 m-12 c-12">
                        <div class="cart__process">
                            <div class="grid cart__totals-header">
                                <div class="row">
                                    <div class="col l-12 m-12 c-12">
                                        <div class="cart__totals-header-title">Cart totals</div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid cart__totals-body">
                                <div class="row no-gutters cart__totals-row">
                                    <div class="col l-5 m-5 c-5">
                                        <div class="cart__totals-body-title">Subtotal</div>
                                    </div>

                                    <div class="col l-7 m-7 c-7">
                                        <div class="cart__totals-body-value cart__totals-body-value--subtotal">$95.00</div>
                                    </div>
                                </div>

                                <div class="row no-gutters cart__totals-row">
                                    <div class="col l-5 m-5 c-5">
                                        <div class="cart__totals-body-title">Shipping</div>
                                    </div>

                                    <div class="col l-7 m-7 c-7">
                                        <div class="cart__totals-body-value">Enter Your Address To View Shipping Options.</div>
                                        <div class="cart__totals-calculate-shipping">CALCULATE SHIPPING</div>
                                    </div>
                                </div>

                                <div class="row no-gutters cart__totals-row">
                                    <div class="col l-5 m-5 c-5">
                                        <div class="cart__totals-body-title">Total</div>
                                    </div>

                                    <div class="col l-7 m-7 c-7">
                                        <div class="cart__totals-body-value cart__totals-body-value--total">$95.00</div>
                                    </div>
                                </div>

                                <div class="row no-gutters">
                                    <div class="col l-12 m-12 c-12">
                                        <a href="./checkout.html" class="cart__totals-process-checkout">Proceed to checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('cart-ui', CartUI)