export function createFormData(userData, userId, callback) {
    fetch('https://63b1106f6a74151a1bca76f7.mockapi.io/api/v1/users/' + `${userId}`)
        .then(response => {
            return response.json()
        })
        .then(user => {
            Array.from(userData).forEach(input => {
                let inputId = input.getAttribute('id')
                if (Object.keys(user).includes(inputId)) {
                    input.value = user[`${inputId}`]
                }
            })
        })
        .then(callback)
}