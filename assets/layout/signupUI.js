class SignUpUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="user__page">
                <div class="container">
                    <h1>Create Account</h1>
                    <p>To keep connected with us please login with your personal info.</p>
                    <form action="" method="POST" class="form" id="sign-up-form">
                        <div class="form-group sign-up-form__group">
                            <input id="username" name="username" rules="required|blank" type="text"
                                placeholder="Username" class="form-control sign-up-form__input sign-up-form__input--username">
                            <span class="form-message sign-up-form__msg"></span>
                        </div>

                        <div class="form-group sign-up-form__group">
                            <input id="email" name="email" rules="required|email" type="text"
                                placeholder="Email" class="form-control sign-up-form__input sign-up-form__input--email">
                            <span class="form-message sign-up-form__msg"></span>
                        </div>

                        <div class="form-group sign-up-form__group">
                            <input id="password" name="password" rules="required|blank|min:6" type="password"
                                placeholder="Password" class="form-control sign-up-form__input sign-up-form__input--password">
                            <span class="form-message sign-up-form__msg"></span>
                        </div>

                        <div class="form-group sign-up-form__group">
                            <input id="password_confirmation" name="password_confirmation" rules="confirm"
                                placeholder="Confirm your password" type="password" class="form-control sign-up-form__input sign-up-form__input--confirm-password">
                            <span class="form-message sign-up-form__msg"></span>
                        </div>

                        <button class="signup__signInButton">SIGN UP</button>
                        <p>Already registered? <a href="./login.html" class="signup__registerButton">Sign In</a></p>
                    </form>
                </div>
            </div>
        `
    }
}

customElements.define('sign-up-ui', SignUpUI)