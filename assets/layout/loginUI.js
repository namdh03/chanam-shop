class LogInUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="user__page">
                <div class="container">
                    <h1>Hello Friend!</h1>
                    <p>Enter your personal details and start journey with us.</p>
                    <form action="" method="POST" class="form" id="login-form">
                        <div class="form-group login-form__group">
                            <input id="username" name="username" rules="required" type="text"
                                placeholder="Username" class="form-control login-form__input login-form__input--username">
                            <span class="form-message login-form__msg"></span>
                        </div>

                        <div class="form-group login-form__group">
                            <input id="password" name="password" rules="required|min:6" type="password"
                                placeholder="Password" class="form-control login-form__input login-form__input--password">
                            <span class="form-message login-form__msg"></span>
                        </div>

                        <button type="submit" class="login__signInButton">SIGN IN</button>
                        <p>Not registered? <a href="./signup.html" class="login__registerButton">Create an account</a></p>
                    </form>
                </div>
            </div>
        `
    }
}

customElements.define('log-in-ui', LogInUI)