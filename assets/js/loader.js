const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let loaderPage = $('.loader-wrapper')

export function showLoaderPage() {
    loaderPage.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
}

export function hideLoaderPage() {
    loaderPage.classList.add('hidden')
    document.body.style.overflow = 'visible'
}