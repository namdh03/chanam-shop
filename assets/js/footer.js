import validator from '../lib/validator.js';
import toast from '../lib/toast.js';

export default function footer() {
    let newLetterForm = new validator('#newletter-form')
    let input = document.querySelector('.form-group input')

    newLetterForm.onSubmit = formData => {
        console.log(formData);

        toast({
            title: 'Thành công!',
            message: 'Cảm ơn bạn đã trở thành khách hàng thân thiết của chúng tôi!',
            type: 'success',
            duration: 1500
        });
        input.value = ''
    }
}