import scroll from '../js/scrollToTop.js'
import header from '../js/header.js'
import hero from '../js/hero.js'
import product from '../js/product.js'
import footer from '../js/footer.js'

window.onload = function() {
    scroll()
    header()
    hero()
    product().start()
    footer()
}