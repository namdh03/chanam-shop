class UserUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="grid">
                <div class="row no-gutters">
                    <div class="col l-12 m-12 c-12">
                        <div class="redirect__page">
                            <h1 class="redirect__page-title">My Account</h1>
                            <div class="redirect__page-navigation">
                                <a href="index.html">Home</a>
                                <span>My Account</span>
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

            <div class="grid wide user__wrraper">
                <div class="row row-mobile">
                    <div class="col l-3 m-12 c-12">
                        <div class="user__profile">
                            <div class="user__img">
                                <img src="./assets/img/user.png" alt="">
                            </div>
                            <div class="user__info">
                                <p class="user__name user__name--api"></p>
                                <span class="user__logout">Logout</span>
                            </div>
                        </div>

                        <div class="user__account-nav">
                            <div class="user__account-nav-item user__account-nav--dashboard">
                                <p class="user__account-nav-text">Dashboard</p>
                                <div class="user__account-nav-icon active">
                                    <span class="ti-dashboard"></span>
                                </div>
                            </div>

                            <div class="user__account-nav-item user__account-nav--orders">
                                <p class="user__account-nav-text">Orders</p>
                                <div class="user__account-nav-icon">
                                    <span class="ti-shopping-cart"></span>
                                </div>
                            </div>

                            <div class="user__account-nav-item user__account-nav--downloads">
                                <p class="user__account-nav-text">Downloads</p>
                                <div class="user__account-nav-icon">
                                    <span class="ti-download"></span>
                                </div>
                            </div>

                            <div class="user__account-nav-item user__account-nav--addresses">
                                <p class="user__account-nav-text">Addresses</p>
                                <div class="user__account-nav-icon">
                                    <span class="ti-home"></span>
                                </div>
                            </div>

                            <div class="user__account-nav-item user__account-nav--account-details">
                                <p class="user__account-nav-text">Account details</p>
                                <div class="user__account-nav-icon">
                                    <span class="ti-user"></span>
                                </div>
                            </div>

                            <div class="user__account-nav-item user__account-nav--wishlist">
                                <p class="user__account-nav-text">Wishlist</p>
                                <div class="user__account-nav-icon">
                                    <span class="ti-file"></span>
                                </div>
                            </div>

                            <div class="user__account-nav-item user__account-nav--logout user__logout">
                                <p class="user__account-nav-text">Logout</p>
                                <div class="user__account-nav-icon">
                                    <span class="ti-power-off"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col l-8 l-o-1 m-12 c-12">
                        <div class="user__acc-content user__acc-content--notify">
                            <p class="user__acc-content-text">
                                Hello 
                                <strong class="user__name--api"></strong>
                                (not 
                                <strong class="user__name--api"></strong>? 
                                <span class="user__acc-content-link user__logout">Log out</span>
                                ) 
                            </p>
                            <p class="user__acc-content-text">
                                From your account dashboard you can view your
                                <span class="user__acc-content-link">recent orders</span>
                                , manage your 
                                <span class="user__acc-content-link user__acc-content-link--addresses">shipping and billing addresses</span>
                                , and 
                                <span class="user__acc-content-link user__acc-content-link--acc-details">edit your password and account details</span>
                                .
                            </p>
                        </div>

                        <div class="user__acc-content user__acc-content--address hide">
                            <h3 class="user__form-title">Billing address</h3>
                            <form action="" method="POST" class="form form--modifier" id="addresses-form">
                                <div class="grid">
                                    <div class="row">
                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="firstname" class="form-label user__font-text form__label--modifier">First name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="given-name" id="firstname" name="firstname"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="lastname" class="form-label user__font-text form__label--modifier">Last name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="family-name" id="lastname" name="lastname"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="company" class="form-label user__font-text form__label--modifier">Company name (optional)</div>
                                                <input autocomplete="organization" id="company" name="company" type="text"
                                                    class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information form__information--modifier">
                                                <div for="country" class="form-label user__font-text form__label--modifier">Country / Region
                                                    <span>*</span>
                                                </div>
                                                <div class="form-user__country-wrapper">
                                                    <select id="country" name="country" rules="required" class="form-control user-data"></select>
                                                    <span class="form-checkout__show-country"><i class="fa-solid fa-caret-down"></i></span>
                                                </div>
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="streetAddress" class="form-label user__font-text form__label--modifier">Street address
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-line1" id="streetAddress" name="streetAddress"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="apartment" class="form-label user__font-text form__label--modifier form-label user__font-text form__label--modifier--modifier">Apartment,
                                                    suite, unit, etc. (optional)</div>
                                                <input autocomplete="address-line2" id="apartment" name="apartment"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="city" class="form-label user__font-text form__label--modifier">Town / City
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-level2" id="city" name="city" rules="required"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="state" class="form-label user__font-text form__label--modifier">State / County
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="address-level2" id="state" name="state"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="postcode" class="form-label user__font-text form__label--modifier">Postcode / ZIP
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="postal-code" id="postcode" name="postcode"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="phone" class="form-label user__font-text form__label--modifier">Phone
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="tel" id="phone" name="phone" rules="required|tel"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="email" class="form-label user__font-text form__label--modifier">Email
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="email" id="email" name="email" rules="required|email"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="user__save">Save Address</button>
                            </form>
                        </div>

                        <div class="user__acc-content user__acc-content--account-details hide">
                            <form action="" method="POST" class="form form--modifier" id="user-form">
                                <div class="grid">
                                    <div class="row">
                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="firstname" class="form-label user__font-text form__label--modifier">First name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="given-name" id="firstname" name="firstname"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="lastname" class="form-label user__font-text form__label--modifier">Last name
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="family-name" id="lastname" name="lastname"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="username" class="form-label user__font-text form__label--modifier">Display name
                                                    <span>*</span>
                                                    <span>
                                                        <em>This will be how your name will be displayed in the account section and in reviews</em>
                                                    </span>
                                                </div>
                                                <input id="username" name="username"
                                                    rules="required" type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="email" class="form-label user__font-text form__label--modifier">Email
                                                    <span>*</span>
                                                </div>
                                                <input autocomplete="email" id="email" name="email" rules="required|email"
                                                    type="text" class="form-control user-data">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <p class="user__password-change-title">Password change</p>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="oldPassword" class="form-label user__font-text form__label--modifier">Current password (leave blank to leave unchanged)</div>
                                                <input id="oldPassword" name="oldPassword" type="text"
                                                    class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="password" class="form-label user__font-text form__label--modifier">New password (leave blank to leave unchanged)</div>
                                                <input id="password" name="password" rules="required|blank|min:6" type="text"
                                                    class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>

                                        <div class="col l-12 m-12 c-12">
                                            <div class="form-group form__information">
                                                <div for="confirmPassword" class="form-label user__font-text form__label--modifier">Confirm new password</div>
                                                <input id="confirmPassword" name="confirmPassword" rules="confirm" type="text"
                                                    class="form-control">
                                                <span class="form-message form-message--modifier"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="user__save">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('user-ui', UserUI)