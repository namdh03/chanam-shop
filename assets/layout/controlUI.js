class ControlUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="toast"></div>

            <div class="loader-wrapper loader-wrapper--page">
                <div class="loader-page">
                    <div class="loader-page__box"></div>
                    <div class="loader-page__box"></div>
                </div>
            </div>
        
            <div class="loader-wrapper loader-wrapper--default loader-wrapper--bgcolor hidden">
                <div class="loader-default">
                    <svg viewBox="0 0 80 80">
                        <rect x="8" y="8" width="64" height="64"></rect>
                    </svg>
                </div>
            </div>
        
            <div class="back-to-top hide">
                <div class="progress">
                    <span class="ti-arrow-up"></span>
                </div>
            </div>
        `
    }
}

customElements.define('control-ui', ControlUI)