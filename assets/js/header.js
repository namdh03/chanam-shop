// mobile menu
export default function header() {
    const mobileMenu = document.querySelector(".mobile__menu");
    // const sidMenu = document.querySelector(".sid-right");
    // const navClient = document.querySelector(".nav__client");

    const cart = document.querySelector(".nav__client-cart")
    const cartList = document.querySelector(".cart__list");
    const noProduct = document.querySelector(".cart__list-no-cart");

    // mobileMenu.addEventListener("click", () => {
    //     mobileMenu.classList.toggle("active")
    //     sidMenu.classList.toggle("active")
    //     navClient.classList.toggle("active")
    // });
    // sidMenu.addEventListener("click", () => {
    //     mobileMenu.classList.remove("active")
    //     sidMenu.classList.toggle("active")
    //     navClient.classList.toggle("active")
    // });
    // navClient.addEventListener("click", () => {
    //     mobileMenu.classList.remove("active")
    //     navMenu.classList.toggle("active")
    //     navClient.classList.toggle("active")
    // });

    cart.addEventListener("click", () => {
        cartList.classList.toggle("active")
    });

    // MENU MOBILE
    // let section = document.querySelectorAll('.sid-right');
    // let navLinks = document.querySelectorAll('.navbar__menu-items')

    // window.onscroll = () => {
    //     section.forEach(sec => {
    //         let top = window.scrollY;
    //         let offset = sec.offsetTop;
    //         let height = sec.offsetHeight;
    //         let id = sec.getAttribute('id');

    //         if (top >= offset && top < offset + height) {
    //             navLinks.forEach(links => {
    //                 links.classList.remove("active")
    //                 document.querySelector('.navbar__menu--items[href*=' + id + ']').classList.add("active");
    //             });
    //         }
    //     });
    // }
}
