// mobile menu
export default function header() {
    const mobileMenu = document.querySelector(".mobile__menu");
    const navMenu = document.querySelector(".nav__menu");
    const navClient = document.querySelector(".nav__client");
    console.log(mobileMenu);

    mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        navMenu.classList.toggle("active")
        navClient.classList.toggle("active")

    });
    navMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        navMenu.classList.toggle("active")
        navClient.classList.toggle("active")
    });
    navClient.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        navMenu.classList.toggle("active")
        navClient.classList.toggle("active")
    });
}
