class CheckoutUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="grid">
                <div class="row no-gutters">
                    <div class="col l-12 m-12 c-12">
                        <div class="redirect__page">
                            <h1 class="redirect__page-title">Checkout</h1>
                            <div class="redirect__page-navigation">
                                <a href="index.html">Home</a>
                                <span>Checkout</span>
                            </div>
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

            <div class="grid wide checkout__wrapper">
                <div class="row row-mobile">
                    <div class="col l-12 m-12 c-12">
                        <div id="checkout-coupon" class="checkout-coupon hide">
                            <p>If you have a coupon code, please apply it below.</p>
                            <div class="checkout-coupon__form">
                                <span><input type="text" placeholder="Coupon code" class="checkout-coupon__code"></span>
                                <button class="checkout-coupon__submit">APPLY COUPON</button>
                            </div>
                        </div>
                    </div>

                    <div class="col l-6 m-12 c-12">
                        <div class="checkout-bill">
                            <h3 class="form-bill__title">BILLING DETAILS</h3>
                            <form action="" method="POST" class="form form--modifier" id="checkout-form">
                                <div class="grid">
                                    <div class="row">
                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="firstname" class="form-label form__label--modifier">First name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="given-name" id="firstname" name="firstname"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="lastname" class="form-label form__label--modifier">Last name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="family-name" id="lastname" name="lastname"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="company" class="form-label form__label--modifier">Company name (optional)</div>
                                                <input autocomplete="organization" id="company" name="company" type="text"
                                                    class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information form__information--modifier">
                                                <div for="country" class="form-label form__label--modifier">Country / Region
                                                    <span>*</span>
                                                </div>
                                                <div class="form-checkout__country-wrapper">
                                                    <select id="country" name="country" rules="required" class="form-control user-data"></select>
                                                    <span class="form-checkout__show-country"><i class="fa-solid fa-caret-down"></i></span>
                                                </div>
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="streetAddress" class="form-label form__label--modifier">Street address
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-line1" id="streetAddress" name="streetAddress"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="apartment" class="form-label form__label--modifier form-label form__label--modifier--modifier">Apartment,
                                                    suite, unit, etc. (optional)</div>
                                                <input autocomplete="address-line2" id="apartment" name="apartment"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="city" class="form-label form__label--modifier">Town / City
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-level2" id="city" name="city" rules="required"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="state" class="form-label form__label--modifier">State / County
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-level2" id="state" name="state"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="postcode" class="form-label form__label--modifier">Postcode / ZIP
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="postal-code" id="postcode" name="postcode"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="phone" class="form-label form__label--modifier">Phone
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="tel" id="phone" name="phone" rules="required|tel"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="email" class="form-label form__label--modifier">Email
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="email" id="email" name="email" rules="required|email"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <h3 class="form-bill__title">SHIP TO A DIFFERENT ADDRESS?
                                <input type="checkbox" class="show-form-differ-btn">
                            </h3>
                            <form action="" method="POST" class="form hide" id="checkout-form-differ">
                                <div class="grid">
                                    <div class="row">
                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="firstname" class="form-label form__label--modifier">First name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="given-name" id="firstname" name="firstname"
                                                    rules="required" type="text" class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="email" class="form-label form__label--modifier">Last name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="family-name" id="lastname" name="lastname"
                                                    rules="required" type="text" class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="company" class="form-label form__label--modifier">Company name (optional)</div>
                                                <input autocomplete="organization" id="company" name="company" type="text"
                                                    class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information form__information--modifier">
                                                <div for="country" class="form-label form__label--modifier">Country / Region
                                                    <span>*</span>
                                                </div>
                                                <div class="form-checkout__country-wrapper">
                                                    <select id="country-differ" name="country" rules="required" class="form-control"></select>
                                                    <span class="form-checkout__show-country"><i class="fa-solid fa-caret-down"></i></span>
                                                </div>
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="address" class="form-label form__label--modifier">Street address
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-line1" id="address" name="address"
                                                    rules="required" type="text" class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="apartment" class="form-label form__label--modifier form-label form__label--modifier--modifier">Apartment,
                                                    suite, unit, etc. (optional)</div>
                                                <input autocomplete="address-line2" id="apartment" name="apartment"
                                                    type="text" class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="city" class="form-label form__label--modifier">Town / City
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-level2" id="city" name="city" rules="required"
                                                    type="text" class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="state" class="form-label form__label--modifier">State / County
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-level2" id="state" name="state"
                                                    rules="required" type="text" class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="postcode" class="form-label form__label--modifier">Postcode / ZIP
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="postal-code" id="postcode" name="postcode"
                                                    rules="required" type="text" class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                            <div class="grid">
                                <div class="row">
                                    <div class="col l-12 m-12 c-12">
                                        <div class="form__information">
                                            <div for="postcode" class="form-label form__label--modifier">Order notes (optional)</div>
                                            <textarea name="order" id="order"
                                                placeholder="Notes about your order, e.g. special notes for delivery."
                                                cols="5" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col l-6 m-12 c-12">
                        <div class="checkout-bill">
                            <h3 class="form-bill__title">
                                YOUR ORDER
                                <span class="checkout-coupon__toggle">
                                    Have a coupon?
                                    <span class="checkout-coupon__show-coupon">Click here to enter your code</span>
                                </span>
                            </h3>
                            
                            <div class="checkout__order-header">
                                <div class="grid">
                                    <div class="row no-gutters">
                                        <div class="col l-6 m-6 c-6">
                                            <div class="product__order-title product__order--frames">Product</div>
                                        </div>
                                        <div class="col l-6 m-6 c-6">
                                            <div class="product__order-title product__order--frames">Subtotal</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid checkout__order-body"></div>

                            <div class="checkout__order-footer">
                                <div class="grid">
                                    <div class="row no-gutters">
                                        <div class="col l-6 m-6 c-6">
                                            <div class="checkout__order-footer-title product__order--frames">
                                                <p>Subtotal</p>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-6 c-6">
                                            <div class="checkout__order-footer-value product__order--frames">£0</div>
                                        </div>
                                    </div>

                                    <div class="row no-gutters">
                                        <div class="col l-6 m-6 c-6">
                                            <div class="checkout__order-footer-title product__order--frames">
                                                <p>Shipping</p>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-6 c-6">
                                            <div class="checkout__order-footer-value product__order--frames">Enter Your Address To View Shipping Options.</div>
                                        </div>
                                    </div>

                                    <div class="row no-gutters">
                                        <div class="col l-6 m-6 c-6">
                                            <div class="checkout__order-footer-title product__order--frames">
                                                <p>Total</p>
                                            </div>
                                        </div>

                                        <div class="col l-6 m-6 c-6">
                                            <div class="checkout__order-footer-value checkout__order-footer-value--total product__order--frames">£0</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="checkout__order-payment">
                                <div class="grid">
                                    <div class="row no-gutters">
                                        <div class="col l-12 m-12 c-12">
                                            <div class="checkout__order-payment-cod">
                                                <div class="checkout__order-payment-method">
                                                    <input name="radio" type="radio" id="radio-cod" checked>
                                                    <div class="checkout__order-label">
                                                        <label for="radio-cod"></label>
                                                    </div>
                                                    <span>Cash on delivery</span>
                                                </div>
                                                <div class="checkout__order-payment-box">Pay with cash upon delivery.</div>
                                            </div>

                                            <div class="checkout__order-payment-paypal">
                                                <div class="checkout__order-payment-method">
                                                    <input name="radio" type="radio" id="radio-paypal">
                                                    <div class="checkout__order-label"><label for="radio-paypal"></label></div>
                                                    <span>
                                                        PayPal
                                                        <a href="https://www.paypal.com/uk/webapps/mpp/paypal-popup">What is PayPal?</a>
                                                    </span>
                                                    <div class="checkout__order-payment-img">
                                                        <img src="./assets/img/checkout-payment.png" alt="">
                                                    </div>
                                                </div>
                                                <div class="checkout__order-payment-box hide">Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="checkout__order-place-order">
                                <div class="gird">
                                    <div class="row no-gutters">
                                        <div class="col l-12 m-12 c-12">
                                            <p class="checkout__order-policy-text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="https://github.com/dnghngnm/chanam-shop" target="_blank">privacy policy</a>.</p>
                                        </div>
                                        <div class="col l-12 m-12 c-12">
                                            <button form="checkout-form" class="checkout__order-submit" type="submit">Place Order</button>
                                        </div>
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

customElements.define('checkout-ui', CheckoutUI)