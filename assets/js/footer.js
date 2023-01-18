import validator from '../lib/validator.js'
import toast from '../lib/toast.js'

let newLetterForm = new validator('#newletter-form')
let input = document.querySelector('#newletter-form .form-group input')

export default {
    handleEvent() {
        newLetterForm.onSubmit = formData => {
            toast({
                title: 'Thành công!',
                message: 'Cảm ơn bạn đã trở thành khách hàng thân thiết của chúng tôi!',
                type: 'success',
                duration: 1500
            })
            input.value = ''
        }
    },

    start() {
        this.handleEvent()
    }
}