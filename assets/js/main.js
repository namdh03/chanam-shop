import scroll from '../js/scrollToTop.js'
import product from '../js/product.js'
import footer from '../js/footer.js'

window.onload = function() {
    scroll()
    product().start()
    footer()
}