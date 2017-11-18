const OhMyValidator = require('./src/validator')

let model = {
    name: 'w',
    version: '0.0.1',
    address: 'China',
    email: 'lisiurday@gmail.com'
}

let validator = new OhMyValidator({
    validate() {
        return true
    }
})

let rules = {
    name(value, model) {
        let errors = []
        if (value.trim() === '') {
            errors.push('姓名不能为空')
        }
        return errors
    },
}


model = validator.proxy(model, rules)

let result = validator.validate()

console.log(result)
