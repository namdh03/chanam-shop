import scroll from '../js/scrollToTop.js'
import header from '../js/header.js'
import hero from '../js/hero.js'
import product from '../js/product.js'
import footer from '../js/footer.js'
import { userIDStatus } from '../js/userStatus.js'

window.onload = function() {
    scroll()
    header()
    hero()
    userIDStatus()
    product.start()
    footer.start()
}