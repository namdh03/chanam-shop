const countryApi = 'https://restcountries.com/v3.1/all'

export function createCountryOption(...selectors) {
    fetch(countryApi)
        .then((response) => {
            return response.json()
        })
        .then((countries) => {
            const option = Array.from(countries).map(country => {
                if (country.name.common === 'United Kingdom') {
                    return `
                        <option value="${country.name.common}" selected="selected">${country.name.common}</option>
                    `
                } else {
                    return `
                        <option value="${country.name.common}">${country.name.common}</option>
                    `
                }
            }).join('')

            for (let selector of selectors) {
                selector.innerHTML = option
            }
        })
}