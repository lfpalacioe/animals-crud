export const loginValidation = {
    nombre: {required: 'El nombre es obligatorio'},
    password: {
        required: 'El password es obligatorio'
    }
}

export const registerValidation = {
    nombre: {required: 'El nombre es obligatorio'},
    email: {
        required: 'El e-mail es obligatorio',
        pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'El email es inválido'
        }
    },
    password: {
        required: 'El password es obligatorio',
        minLength: {
            value: 8,
            message: 'El password debe tener al menos 8 caracteres'
        }
    }
}