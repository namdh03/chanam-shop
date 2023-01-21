import validator from '../lib/validator.js'
import toast from '../lib/toast.js'

let newLetterForm = new validator('#newletter-form')
let input = document.querySelector('#newletter-form .form-group input')

export default {
    handleEvent() {
        newLetterForm.onSubmit = formData => {
            toast({
                title: 'Successful!',
                message: 'Thank you for being our valued customer. We are grateful for the pleasure of serving you and meeting your needs!',
                type: 'success',
                duration: 5000
            })
            input.value = ''
        }
    },

    start() {
        this.handleEvent()
    }
}