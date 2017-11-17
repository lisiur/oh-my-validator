const target = {
    name: 'Billy Bob',
    age: 15
}

const handler = {
    get(target, key, proxy) {
        const today = new Date()
        console.log(`Get request made for ${key} at ${today}`)

        return Reflect.get(target, key, proxy)
    }
}

const proxy = new Proxy(target, handler)
proxy.name

let numericDataStore = {
    count: 0,
    amount: 1234,
    total: 14
}

numericDataStore = new Proxy(numericDataStore, {
    set(target, key, value, proxy) {
        if (typeof value !== 'number') {
            throw Error("properties in numericDataStore can only be numbers")
        }
        return Reflect.set(target, key, value, proxy)
    }
})

function createValidator(target, validator) {
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
            if (target.hasOwnProperty(key)) {
                let validator = this._validator[key]
                if (!!validator(value)) {
                    return Reflect.set(target, key, value, proxy)
                } else {
                    throw Error(`Cannot set ${key} to ${value}. Invalid.`)
                }
            } else {
                throw Error(`${key} is not a valid property`)
            }
        }
    })
}

const personValidator = {
    name(val) {
        return typeof val === 'string'
    },
    age(val) {
        return typeof age === 'number' && age > 18
    }
}

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
        return createValidator(this, personValidator)
    }
}

const bill = new Person('Bill', 25)

bill.name = 0