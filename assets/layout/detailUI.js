class DetailUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="grid">
                <div class="row no-gutters">
                    <div class="col l-12 m-12 c-12">
                        <div class="redirect__page">
                            <h1 class="redirect__page-title detail__header-title">Products</h1>
                            <div class="redirect__page-navigation">
                                <a href="index.html">Home</a>
                                <span>Products</span>
                                <span class="detail__header-name-product">Products</span>
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

            <div class="detail__wrapper">
                <div class="grid wide">
                    <div class="row">
                        <div class="col l-5 m-12 c-12">
                            <div class="detail__slides-main-img">
                                <img class="detail__slides" id="main-slide" src="">
                            </div>
                            <div class="detail__slides-tablist"></div>
                        </div>

                        <div class="col l-7 m-12 c-12">
                            <div class="detail__content">
                                <div class="detail-title"></div>
                                <div class="detail-price"></div>
                                <div class="detail-script"><span></span></div>
                                <!-- <div class="detail-category"></div> -->
                                <div class="detail-category">
                                    <span>Category:</span>
                                    <div class="detail-category-type"></div>
                                </div>

                                <form action="" method="" class="form" id="detail-form">
                                    <div class="grid">
                                        <div class="row no-gutters">
                                            <div class="col l-5 m-5 c-10">
                                                <div class="form-group detail-select-form">
                                                    <label for="size" class="detail-form-label">Size</label>
                                                    <select name="size" id="size" rules="required" class="">
                                                        <option value="" disabled selected>Choose an option</option>
                                                        <option value="s">Size S</option>
                                                        <option value="m">Size M</option>
                                                        <option value="l">Size L</option>
                                                        <option value="xl">Size XL</option>
                                                    </select>
                                                    <span class="form-message form-message--size"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid">
                                        <div class="row no-gutters">
                                            <div class="col l-5 m-5 c-10">
                                                <div class="form-group detail-select-form">
                                                    <label for="color" class="detail-form-label">Color</label>
                                                    <select name="color" id="color" rules="required" class="">
                                                        <option value="" disabled selected>Choose an option</option>
                                                        <option value="red">Red</option>
                                                        <option value="blue">Blue</option>
                                                        <option value="white">White</option>
                                                        <option value="grey">Grey</option>
                                                    </select>
                                                    <span class="form-message form-message--color"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="quantity-wishlist__group">
                                        <div class="quantity-btn">
                                            <span class="ti-minus minus"></span>
                                            <span class="num">1</span>
                                            <span class="ti-plus plus"></span>
                                        </div>

                                        <button type="button" class="detail-add-to-wishlist">
                                            <i class="fa-regular fa-heart"></i>
                                        </button>
                                    </div>

                                    <button class="detail-add-to-cart-btn" type="submit">ADD TO CART</button>
                                </form>
                            </div>
                        </div>

                        <div class="col l-12 m-12 c-12">
                            <div class="tab__wrapper">
                                <div class="tabs">
                                    <div class="tab-item active">Additional information</div>
                                    <div class="tab-item">Reviews (0)</div>
                                    <div class="tab-item">Shipping & delivery</div>
                                    <div class="line"></div>
                                </div>

                                <!-- Tab content -->
                                <div class="tab-content">
                                    <div class="tab-pane active">
                                        <h2>Additional information</h2>
                                        <table>
                                            <tr>
                                                <th>Color</th>
                                                <td>Red, Blue, White, Grey</td>
                                            </tr>
                                            <tr>
                                                <th>Brand</th>
                                                <td>Fendi, Gucci, Nike, Prada, Versace</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="tab-pane">
                                        <h2>Review</h2>
                                        <div class="grid">
                                            <div class="row">
                                                <div class="col l-12 m-12 c-12">
                                                    <div class="review__group">
                                                        <div class="review__content">Your rating
                                                            <span>*</span>
                                                        </div>
                                                        <p class="review__stars">
                                                            <span>
                                                                <button class="star">&#9734</button>
                                                                <button class="star">&#9734</button>
                                                                <button class="star">&#9734</button>
                                                                <button class="star">&#9734</button>
                                                                <button class="star">&#9734</button>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="col l-12 m-12 c-12">
                                                    <div class="review__group">
                                                        <div class="review__content">Your review
                                                            <span>*</span>
                                                        </div>
                                                        <textarea id="comment" name="comment" cols="45" rows="8"
                                                            required></textarea>
                                                    </div>
                                                </div>

                                                <div class="col l-6 m-6 c-12">
                                                    <div class="review__group">
                                                        <div class="review__content">Name
                                                            <span>*</span>
                                                        </div>
                                                        <input id="name" type="text" size="30" required>
                                                    </div>
                                                </div>

                                                <div class="col l-6 m-6 c-12">
                                                    <div class="review__group">
                                                        <div class="review__content">Email
                                                            <span>*</span>
                                                        </div>
                                                        <input id="email" type="email" size="30" required>
                                                    </div>
                                                </div>

                                                <div class="col l-12 m-12 c-12">
                                                    <button class="review__submit">SUBMIT</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane">
                                        <div class="ship__wrapper">
                                            <h2>Shipping & delivery</h2>
                                            <h4>Shipping Rates & Times</h4>
                                            <p>Aliquam a tortor vel ligula auctor laoreet. Nullam dignissim, arcu a
                                                tristique dictum, felis diam convallis nunc, nec gravida tortor erat non
                                                lectus. Fusce odio erat, dapibus sit amet suscipit quis, ultricies nec
                                                lectus. Nulla a nunc posuere, facilisis metus ac, pulvinar urna. Curabitur
                                                iaculis mi imperdiet, pellentesque odio ac, vehicula lacus.</p>
                                            <h4>International Shipping</h4>
                                            <p>Aenean finibus nunc vitae lacus mollis tincidunt. In vitae rhoncus felis.
                                                Fusce convallis erat eget orci placerat, vitae porta odio faucibus. Mauris
                                                lorem felis, lobortis ac condimentum finibus, luctus eget ligula. Sed
                                                placerat dui nulla, in condimentum dui mollis pretium. Suspendisse semper
                                                turpis nec tempus gravida. Aenean a erat orci. Aliquam semper diam nec
                                                maximus cursus.</p>
                                            <h4>General Shipping Policies</h4>
                                            <p>Pellentesque ut purus ullamcorper, porttitor lectus vitae, vehicula nulla.
                                                Aenean vestibulum efficitur neque eu fermentum. Vestibulum ante ipsum primis
                                                in faucibus orci luctus et ultrices posuere cubilia Curae; Integer placerat
                                                ultrices odio sed tempus. In scelerisque mattis neque, ac porttitor magna
                                                egestas eu. Nulla massa augue, placerat non egestas sit amet, faucibus ac
                                                est. Curabitur id urna lacus. Ut suscipit non nisl sit amet suscipit.</p>
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

customElements.define('detail-ui', DetailUI)